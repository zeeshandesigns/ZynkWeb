import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-e1000fad/health", (c) => {
  return c.json({ status: "ok" });
});

// ── Booking routes ────────────────────────────────────────────────────────────

// GET /bookings/slots?date=YYYY-MM-DD  →  { date, bookedTimes: string[] }
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

// POST /bookings  →  { success: true, booking }
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
    // Check slot availability
    const raw = await kv.get(`slots:${date}`);
    const bookedTimes: string[] = raw ? JSON.parse(raw as string) : [];
    if (bookedTimes.includes(time)) {
      return c.json({ error: "This time slot has just been booked. Please choose another." }, 409);
    }

    // Save booking
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

Deno.serve(app.fetch);
