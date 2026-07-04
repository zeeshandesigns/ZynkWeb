import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
// @ts-ignore
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API = `https://${projectId}.supabase.co/functions/v1/make-server-e1000fad`;

// ─── Data ────────────────────────────────────────────────────────────────────

const SESSION_TYPES = [
  {
    id: "discovery",
    label: "Discovery Call",
    duration: "30 min",
    icon: MessageSquare,
    description: "First conversation. Let's see if we're a good fit and how I can help with your project.",
  },
  {
    id: "brief",
    label: "Project Brief",
    duration: "60 min",
    icon: CalendarDays,
    description: "You know what you want. Let's map it out properly and agree on scope and approach.",
  },
  {
    id: "advisory",
    label: "Advisory Session",
    duration: "30 min",
    icon: Zap,
    description: "Pick my brain on design, engineering, or product strategy. No agenda needed.",
  },
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00",
];

const WEEK_START = { weekStartsOn: 1 as const };
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.68rem",
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: "var(--primary)",
        opacity: 0.75,
      }}
      className="mb-4"
    >
      {children}
    </p>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = ["Session", "Date", "Time", "Details"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: done || active ? "var(--primary)" : "var(--muted)",
                  color: done || active ? "white" : "var(--muted-foreground)",
                }}
              >
                {done ? (
                  <Check style={{ width: "0.8rem", height: "0.8rem" }} />
                ) : (
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem" }}>
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "-0.005em",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 mx-2 mb-5"
                style={{
                  height: "1px",
                  width: "clamp(1.5rem, 5vw, 3.5rem)",
                  background: i < current ? "var(--primary)" : "var(--border)",
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 0 — Session type ────────────────────────────────────────────────────

function StepSession({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <SLabel>Choose a session type</SLabel>
      <div className="flex flex-col gap-3">
        {SESSION_TYPES.map(({ id, label, duration, icon: Icon, description }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="w-full text-left p-4 rounded-xl border transition-all"
              style={{
                background: active ? "color-mix(in oklch, var(--primary) 6%, var(--card))" : "var(--card)",
                borderColor: active ? "var(--primary)" : "var(--border)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: active ? "color-mix(in oklch, var(--primary) 15%, transparent)" : "var(--muted)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        letterSpacing: "-0.025em",
                        color: active ? "var(--primary)" : "var(--foreground)",
                      }}
                    >
                      {label}
                    </span>
                    <Badge
                      variant={active ? "default" : "outline"}
                      style={{ fontSize: "0.62rem", letterSpacing: "-0.01em" }}
                    >
                      {duration}
                    </Badge>
                  </div>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.8rem", letterSpacing: "-0.015em", lineHeight: 1.5 }}
                  >
                    {description}
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all"
                  style={{
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active ? "var(--primary)" : "transparent",
                  }}
                >
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1 — Calendar ────────────────────────────────────────────────────────

function StepDate({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(today);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), WEEK_START),
    end: endOfWeek(endOfMonth(month), WEEK_START),
  });

  const canGoPrev = !isSameMonth(month, today);

  const isDisabled = (day: Date) =>
    isBefore(day, today) || isWeekend(day) || !isSameMonth(day, month);

  return (
    <div>
      <SLabel>Select a date</SLabel>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonth((m) => subMonths(m, 1))}
          disabled={!canGoPrev}
          className="p-1.5 rounded-lg hover:bg-accent/60 transition-colors disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "0.9375rem",
            letterSpacing: "-0.03em",
          }}
        >
          {format(month, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="p-1.5 rounded-lg hover:bg-accent/60 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center"
            style={{ fontSize: "0.68rem", letterSpacing: "0.02em", color: "var(--muted-foreground)", fontWeight: 600, padding: "0.25rem 0" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => {
          const disabled = isDisabled(day);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const inMonth = isSameMonth(day, month);
          const today_ = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onSelect(day)}
              disabled={disabled}
              className="aspect-square flex items-center justify-center rounded-lg transition-all"
              style={{
                fontSize: "0.8125rem",
                fontWeight: isSelected || today_ ? 700 : 400,
                letterSpacing: "-0.01em",
                background: isSelected
                  ? "var(--primary)"
                  : today_ && !isSelected
                  ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                  : "transparent",
                color: isSelected
                  ? "white"
                  : disabled
                  ? "var(--border)"
                  : !inMonth
                  ? "var(--muted-foreground)"
                  : "var(--foreground)",
                cursor: disabled ? "not-allowed" : "pointer",
                outline: today_ && !isSelected ? "1.5px solid var(--primary)" : "none",
              }}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      <p
        className="mt-3 text-muted-foreground"
        style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}
      >
        Weekdays only · All times in UK time (GMT/BST)
      </p>
    </div>
  );
}

// ─── Step 2 — Time slots ──────────────────────────────────────────────────────

function StepTime({
  selectedDate,
  selectedTime,
  bookedTimes,
  loading,
  onSelect,
}: {
  selectedDate: Date;
  selectedTime: string;
  bookedTimes: string[];
  loading: boolean;
  onSelect: (t: string) => void;
}) {
  return (
    <div>
      <SLabel>Pick a time</SLabel>
      <div className="flex items-center gap-2 mb-5 p-3 rounded-lg" style={{ background: "var(--secondary)" }}>
        <CalendarDays className="w-4 h-4 text-primary shrink-0" />
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.02em" }}>
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>Checking availability…</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const booked = bookedTimes.includes(slot);
            const selected = selectedTime === slot;
            return (
              <button
                key={slot}
                onClick={() => !booked && onSelect(slot)}
                disabled={booked}
                className="py-2.5 px-3 rounded-lg border text-center transition-all"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: selected ? 700 : 500,
                  fontSize: "0.8125rem",
                  letterSpacing: "-0.015em",
                  background: selected
                    ? "var(--primary)"
                    : booked
                    ? "var(--muted)"
                    : "var(--card)",
                  color: selected
                    ? "white"
                    : booked
                    ? "var(--muted-foreground)"
                    : "var(--foreground)",
                  borderColor: selected ? "var(--primary)" : "var(--border)",
                  cursor: booked ? "not-allowed" : "pointer",
                  textDecoration: booked ? "line-through" : "none",
                  opacity: booked ? 0.5 : 1,
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border" style={{ background: "var(--card)", borderColor: "var(--border)" }} />
          <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "var(--primary)" }} />
          <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "var(--muted)", opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>Booked</span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 — Details form ────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  company?: string;
  message?: string;
};

function StepDetails({
  onSubmit,
  submitting,
  error,
}: {
  onSubmit: (data: FormData) => void;
  submitting: boolean;
  error: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SLabel>Your details</SLabel>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>
              Full name <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Zeeshan Haider"
              {...register("name", { required: "Name is required" })}
              style={{ fontSize: "0.875rem" }}
            />
            {errors.name && (
              <p style={{ fontSize: "0.72rem", color: "var(--destructive)", letterSpacing: "-0.01em" }}>
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              placeholder="you@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
              })}
              style={{ fontSize: "0.875rem" }}
            />
            {errors.email && (
              <p style={{ fontSize: "0.72rem", color: "var(--destructive)", letterSpacing: "-0.01em" }}>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            placeholder="Acme Inc."
            {...register("company")}
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        <div className="space-y-1.5">
          <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>
            What would you like to cover? <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            placeholder="Briefly describe your project, challenge, or what you'd like to discuss…"
            rows={3}
            {...register("message")}
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        {error && (
          <div
            className="p-3 rounded-lg border"
            style={{ background: "color-mix(in oklch, var(--destructive) 8%, transparent)", borderColor: "color-mix(in oklch, var(--destructive) 30%, transparent)" }}
          >
            <p style={{ fontSize: "0.8rem", color: "var(--destructive)", letterSpacing: "-0.015em" }}>{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
          style={{ letterSpacing: "-0.02em" }}
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Confirming booking…
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </form>
  );
}

// ─── Confirmation ─────────────────────────────────────────────────────────────

function Confirmation({
  booking,
  onReset,
}: {
  booking: { sessionType: string; date: string; time: string; name: string };
  onReset: () => void;
}) {
  const session = SESSION_TYPES.find((s) => s.id === booking.sessionType);
  const dateObj = new Date(booking.date + "T" + booking.time);

  const gcalUrl = new URL("https://calendar.google.com/calendar/render");
  gcalUrl.searchParams.set("action", "TEMPLATE");
  gcalUrl.searchParams.set("text", `${session?.label} with Zeeshan Haider`);
  gcalUrl.searchParams.set("dates", format(dateObj, "yyyyMMdd'T'HHmm00") + "/" + format(dateObj, "yyyyMMdd'T'HHmm00"));
  gcalUrl.searchParams.set("details", "Booked via zynk.studio");

  return (
    <div className="text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: "color-mix(in oklch, oklch(0.65 0.20 145) 15%, transparent)" }}
      >
        <Check className="w-8 h-8" style={{ color: "oklch(0.40 0.15 145)" }} />
      </div>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "1.375rem",
          letterSpacing: "-0.04em",
        }}
        className="mb-1"
      >
        You're booked in!
      </p>
      <p
        className="text-muted-foreground mb-6"
        style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}
      >
        A confirmation will be sent to your email.
      </p>

      <div
        className="rounded-xl border p-4 mb-6 text-left space-y-3"
        style={{ background: "var(--secondary)" }}
      >
        {[
          { icon: session?.icon && <session.icon className="w-4 h-4 text-primary" />, label: "Session", value: `${session?.label} · ${session?.duration}` },
          { icon: <CalendarDays className="w-4 h-4 text-primary" />, label: "Date", value: format(new Date(booking.date), "EEEE, MMMM d, yyyy") },
          { icon: <Clock className="w-4 h-4 text-primary" />, label: "Time", value: `${booking.time} UK time` },
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}>
              {icon}
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>{label}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.02em" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={gcalUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="outline" className="w-full" style={{ letterSpacing: "-0.02em" }}>
            <CalendarDays className="w-4 h-4" /> Add to Google Calendar
          </Button>
        </a>
        <button
          onClick={onReset}
          className="text-muted-foreground hover:text-primary transition-colors"
          style={{ fontSize: "0.8rem", letterSpacing: "-0.015em" }}
        >
          Book another call
        </button>
      </div>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export function BookingWidget() {
  const [step, setStep] = useState(0);
  const [sessionType, setSessionType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<Record<string, string> | null>(null);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    setSlotsLoading(true);
    setBookedTimes([]);
    fetch(`${API}/bookings/slots?date=${dateStr}`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    })
      .then((r) => r.json())
      .then((data) => setBookedTimes(data.bookedTimes ?? []))
      .catch((err) => console.error("Failed to fetch slots:", err))
      .finally(() => setSlotsLoading(false));
  }, [selectedDate]);

  const handleSubmit = async (formData: FormData) => {
    if (!selectedDate || !selectedTime || !sessionType) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...formData,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          sessionType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setConfirmedBooking(data.booking);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(0);
    setSessionType("");
    setSelectedDate(null);
    setSelectedTime("");
    setBookedTimes([]);
    setSubmitError("");
    setConfirmedBooking(null);
  };

  const canNext = () => {
    if (step === 0) return !!sessionType;
    if (step === 1) return !!selectedDate;
    if (step === 2) return !!selectedTime;
    return false;
  };

  if (confirmedBooking) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <Confirmation booking={confirmedBooking as any} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Widget header */}
      <div
        className="px-6 md:px-8 py-5 border-b border-border"
        style={{ background: "color-mix(in oklch, var(--primary) 4%, var(--card))" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-4 h-4 text-primary" />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "-0.025em",
            }}
          >
            Book a Call
          </span>
        </div>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}
        >
          Free · No commitment · UK time slots
        </p>
      </div>

      <div className="px-6 md:px-8 py-6">
        <StepIndicator current={step} />

        {/* Step content */}
        {step === 0 && (
          <StepSession selected={sessionType} onSelect={setSessionType} />
        )}
        {step === 1 && (
          <StepDate
            selected={selectedDate}
            onSelect={(d) => {
              setSelectedDate(d);
              setSelectedTime("");
            }}
          />
        )}
        {step === 2 && selectedDate && (
          <StepTime
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            bookedTimes={bookedTimes}
            loading={slotsLoading}
            onSelect={setSelectedTime}
          />
        )}
        {step === 3 && (
          <StepDetails
            onSubmit={handleSubmit}
            submitting={submitting}
            error={submitError}
          />
        )}

        {/* Navigation — not shown on details step (form has its own submit) */}
        {step < 3 && (
          <div className="flex items-center justify-between mt-7 pt-5 border-t border-border">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
              style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}
            >
              ← Back
            </button>
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              style={{ letterSpacing: "-0.02em" }}
            >
              {step === 2 ? "Add details →" : "Continue →"}
            </Button>
          </div>
        )}

        {step === 3 && (
          <button
            onClick={() => setStep(2)}
            className="mt-4 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
