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

// ── Email notification ────────────────────────────────────────────────────────

async function sendBookingNotification(booking: {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  time: string;
  sessionType: string;
}) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return; // key not configured — skip silently

  const { id, name, email, company, message, date, time, sessionType } = booking;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { margin: 0; padding: 0; background: #f4f6f9; font-family: -apple-system, sans-serif; }
        .wrap { max-width: 560px; margin: 32px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .header { background: oklch(0.14 0.03 258); padding: 28px 32px; }
        .header h1 { color: white; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
        .header p { color: rgba(255,255,255,0.45); margin: 4px 0 0; font-size: 13px; }
        .body { padding: 28px 32px; }
        .row { margin-bottom: 18px; }
        .label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #888; margin-bottom: 4px; }
        .value { font-size: 15px; color: #111; font-weight: 500; }
        .divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
        .footer { padding: 16px 32px; background: #f4f6f9; font-size: 12px; color: #aaa; }
        .highlight { background: oklch(0.91 0.05 220); border-radius: 6px; padding: 12px 16px; margin-bottom: 18px; }
        .highlight .value { color: oklch(0.22 0.05 258); font-size: 17px; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <h1>New booking on zynkit.tech</h1>
          <p>${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div class="body">
          <div class="highlight">
            <div class="label">Session</div>
            <div class="value">${sessionType} — ${date} at ${time}</div>
          </div>
          <div class="row">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="row">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}" style="color:oklch(0.546 0.218 258);text-decoration:none;">${email}</a></div>
          </div>
          ${company ? `<div class="row"><div class="label">Company</div><div class="value">${company}</div></div>` : ""}
          ${message ? `<hr class="divider" /><div class="row"><div class="label">Message</div><div class="value" style="line-height:1.6;white-space:pre-wrap;">${message}</div></div>` : ""}
        </div>
        <div class="footer">Booking ref: ${id} &nbsp;·&nbsp; <a href="https://zynkit.tech/admin" style="color:#888;">Open Admin Panel →</a></div>
      </div>
    </body>
    </html>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: "Zynk Bookings <bookings@zynkit.tech>",
      to: ["hello@zynkit.tech"],
      subject: `New booking: ${sessionType} — ${name} on ${date}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API error ${res.status}: ${err}`);
  }

  console.log(`Booking notification sent for ${id}`);
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

    // Fire-and-forget email notification — silently skipped if key not set
    sendBookingNotification(booking).catch((e) =>
      console.log("Email notification failed (non-fatal):", e),
    );

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
