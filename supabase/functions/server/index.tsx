import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

async function requireAuth(c: any, next: any) {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const { data: { user }, error } = await getSupabase().auth.getUser(token);
  if (error || !user) return c.json({ error: "Unauthorized" }, 401);

  c.set("user", user);
  await next();
}

// ── Health ────────────────────────────────────────────────────────────────────

app.get("/make-server-e1000fad/health", (c) => c.json({ status: "ok" }));

// ── Public: booking slots ─────────────────────────────────────────────────────

app.get("/make-server-e1000fad/bookings/slots", async (c) => {
  const date = c.req.query("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json({ error: "Valid date query param required (YYYY-MM-DD)" }, 400);
  }
  try {
    const raw = await kv.get(`slots:${date}`);
    const bookedTimes: string[] = raw ? JSON.parse(raw as string) : [];
    return c.json({ date, bookedTimes });
  } catch (err) {
    console.log("Error fetching slots:", err);
    return c.json({ error: "Failed to fetch slots" }, 500);
  }
});

// ── Public: create booking ────────────────────────────────────────────────────

app.post("/make-server-e1000fad/bookings", async (c) => {
  let body: Record<string, string>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { name, email, company, message, date, time, sessionType } = body;
  if (!name?.trim() || !email?.trim() || !date || !time || !sessionType) {
    return c.json({ error: "Missing required fields: name, email, date, time, sessionType" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: "Invalid email address" }, 400);
  }

  try {
    const raw = await kv.get(`slots:${date}`);
    const bookedTimes: string[] = raw ? JSON.parse(raw as string) : [];
    if (bookedTimes.includes(time)) {
      return c.json({ error: "This time slot has just been booked. Please choose another." }, 409);
    }

    const id = crypto.randomUUID();
    const booking = {
      id,
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() ?? "",
      message: message?.trim() ?? "",
      date,
      time,
      sessionType,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await kv.set(`booking:${id}`, JSON.stringify(booking));
    bookedTimes.push(time);
    await kv.set(`slots:${date}`, JSON.stringify(bookedTimes));

    console.log(`Booking created: ${id} — ${sessionType} on ${date} at ${time} for ${email}`);
    return c.json({ success: true, booking });
  } catch (err) {
    console.log("Error creating booking:", err);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// ── Public: content ───────────────────────────────────────────────────────────

app.get("/make-server-e1000fad/content/:key", async (c) => {
  const key = c.req.param("key");
  try {
    const raw = await kv.get(`content:${key}`);
    return c.json({ value: raw ? JSON.parse(raw as string) : null });
  } catch (err) {
    console.log(`Error fetching content:${key}:`, err);
    return c.json({ error: "Failed to fetch content" }, 500);
  }
});

// ── Admin: get all bookings ───────────────────────────────────────────────────

app.get("/make-server-e1000fad/admin/bookings", requireAuth, async (c) => {
  try {
    const all = await kv.getByPrefix("booking:");
    const bookings = all
      .map((b: string) => {
        try { return JSON.parse(b); } catch { return null; }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return c.json({ bookings });
  } catch (err) {
    console.log("Error listing bookings:", err);
    return c.json({ error: "Failed to list bookings" }, 500);
  }
});

// ── Admin: update booking status ──────────────────────────────────────────────

app.patch("/make-server-e1000fad/admin/bookings/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  let body: { status: string };
  try { body = await c.req.json(); } catch { return c.json({ error: "Invalid JSON" }, 400); }

  const validStatuses = ["pending", "confirmed", "cancelled"];
  if (!validStatuses.includes(body.status)) {
    return c.json({ error: `Status must be one of: ${validStatuses.join(", ")}` }, 400);
  }

  try {
    const raw = await kv.get(`booking:${id}`);
    if (!raw) return c.json({ error: "Booking not found" }, 404);

    const booking = JSON.parse(raw as string);
    const prevStatus = booking.status;
    booking.status = body.status;
    booking.updatedAt = new Date().toISOString();

    await kv.set(`booking:${id}`, JSON.stringify(booking));

    // Free up the slot when cancelling a confirmed/pending booking
    if (body.status === "cancelled" && prevStatus !== "cancelled") {
      const slotsRaw = await kv.get(`slots:${booking.date}`);
      if (slotsRaw) {
        const slots = JSON.parse(slotsRaw as string) as string[];
        await kv.set(`slots:${booking.date}`, JSON.stringify(slots.filter((t) => t !== booking.time)));
      }
    }

    // Re-block the slot if restoring from cancelled
    if (prevStatus === "cancelled" && body.status !== "cancelled") {
      const slotsRaw = await kv.get(`slots:${booking.date}`);
      const slots: string[] = slotsRaw ? JSON.parse(slotsRaw as string) : [];
      if (!slots.includes(booking.time)) {
        slots.push(booking.time);
        await kv.set(`slots:${booking.date}`, JSON.stringify(slots));
      }
    }

    console.log(`Booking ${id} status: ${prevStatus} → ${body.status}`);
    return c.json({ success: true, booking });
  } catch (err) {
    console.log("Error updating booking:", err);
    return c.json({ error: "Failed to update booking" }, 500);
  }
});

// ── Admin: delete booking ─────────────────────────────────────────────────────

app.delete("/make-server-e1000fad/admin/bookings/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  try {
    const raw = await kv.get(`booking:${id}`);
    if (!raw) return c.json({ error: "Booking not found" }, 404);

    const booking = JSON.parse(raw as string);
    await kv.del(`booking:${id}`);

    // Remove from slots
    const slotsRaw = await kv.get(`slots:${booking.date}`);
    if (slotsRaw) {
      const slots = JSON.parse(slotsRaw as string) as string[];
      await kv.set(`slots:${booking.date}`, JSON.stringify(slots.filter((t) => t !== booking.time)));
    }

    console.log(`Booking ${id} deleted`);
    return c.json({ success: true });
  } catch (err) {
    console.log("Error deleting booking:", err);
    return c.json({ error: "Failed to delete booking" }, 500);
  }
});

// ── Admin: update content ─────────────────────────────────────────────────────

app.put("/make-server-e1000fad/admin/content/:key", requireAuth, async (c) => {
  const key = c.req.param("key");
  let body: unknown;
  try { body = await c.req.json(); } catch { return c.json({ error: "Invalid JSON" }, 400); }

  try {
    await kv.set(`content:${key}`, JSON.stringify(body));
    console.log(`Content updated: ${key}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error updating content:${key}:`, err);
    return c.json({ error: "Failed to update content" }, 500);
  }
});

Deno.serve(app.fetch);
