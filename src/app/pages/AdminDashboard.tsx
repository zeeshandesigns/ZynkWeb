import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit3,
  Loader2,
  LogOut,
  Mail,
  RefreshCw,
  Trash2,
  User,
  X,
} from "lucide-react";
import { supabase, API, authHeaders } from "../../utils/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  time: string;
  sessionType: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
};

type NowContent = {
  building: string;
  learning: string;
  reading: string;
  based: string;
};

type AvailabilityContent = {
  available: boolean;
  statusText: string;
  workTypes: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_LABELS: Record<string, { label: string; duration: string }> = {
  discovery: { label: "Discovery Call", duration: "30 min" },
  brief: { label: "Project Brief", duration: "60 min" },
  advisory: { label: "Advisory", duration: "30 min" },
};

const STATUS_STYLES: Record<BookingStatus, { bg: string; color: string; border: string; label: string }> = {
  pending: {
    bg: "color-mix(in oklch, oklch(0.75 0.18 85) 12%, transparent)",
    color: "oklch(0.48 0.14 85)",
    border: "color-mix(in oklch, oklch(0.75 0.18 85) 28%, transparent)",
    label: "Pending",
  },
  confirmed: {
    bg: "color-mix(in oklch, oklch(0.65 0.20 145) 12%, transparent)",
    color: "oklch(0.40 0.15 145)",
    border: "color-mix(in oklch, oklch(0.65 0.20 145) 28%, transparent)",
    label: "Confirmed",
  },
  cancelled: {
    bg: "color-mix(in oklch, var(--destructive) 10%, transparent)",
    color: "var(--destructive)",
    border: "color-mix(in oklch, var(--destructive) 25%, transparent)",
    label: "Cancelled",
  },
};

const PJB = "'Plus Jakarta Sans', sans-serif";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: BookingStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      style={{
        fontFamily: PJB,
        fontWeight: 600,
        fontSize: "0.65rem",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        padding: "2px 8px",
        borderRadius: "999px",
      }}
    >
      {s.label}
    </span>
  );
}

function BookingCard({
  booking,
  token,
  onUpdate,
  onDelete,
}: {
  booking: Booking;
  token: string;
  onUpdate: (id: string, status: BookingStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const session = SESSION_LABELS[booking.sessionType] ?? { label: booking.sessionType, duration: "" };

  const updateStatus = async (status: BookingStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`${API}/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: authHeaders(token),
        body: JSON.stringify({ status }),
      });
      if (res.ok) onUpdate(booking.id, status);
    } finally {
      setUpdating(false);
    }
  };

  const deleteBooking = async () => {
    if (!confirm(`Delete booking for ${booking.name} on ${booking.date}?`)) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API}/admin/bookings/${booking.id}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });
      if (res.ok) onDelete(booking.id);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden"
      style={{ opacity: updating ? 0.6 : 1, transition: "opacity 0.15s" }}
    >
      {/* Main row */}
      <div className="flex items-start gap-4 p-4">
        {/* Status + session */}
        <div className="shrink-0 flex flex-col gap-1.5 items-start pt-0.5">
          <StatusPill status={booking.status} />
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.7rem", letterSpacing: "-0.01em" }}
          >
            {session.label}
            {session.duration && ` · ${session.duration}`}
          </span>
        </div>

        {/* Name + date */}
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.025em" }}>
            {booking.name}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "0.775rem", letterSpacing: "-0.015em" }}>
            {booking.email}
            {booking.company && <span style={{ opacity: 0.7 }}> · {booking.company}</span>}
          </p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span
              className="flex items-center gap-1 text-muted-foreground"
              style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}
            >
              <CalendarDays className="w-3 h-3" /> {booking.date}
            </span>
            <span
              className="flex items-center gap-1 text-muted-foreground"
              style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}
            >
              <Clock className="w-3 h-3" /> {booking.time} UK
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {booking.status !== "confirmed" && booking.status !== "cancelled" && (
            <button
              onClick={() => updateStatus("confirmed")}
              disabled={updating}
              className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
              title="Confirm"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          {booking.status !== "cancelled" && (
            <button
              onClick={() => updateStatus("cancelled")}
              disabled={updating}
              className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-destructive transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {booking.status === "cancelled" && (
            <button
              onClick={() => updateStatus("pending")}
              disabled={updating}
              className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
              title="Restore to pending"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={deleteBooking}
            disabled={updating}
            className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-destructive transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {booking.message && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground transition-colors"
              title="Toggle message"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Message expand */}
      {expanded && booking.message && (
        <div className="px-4 pb-4 border-t border-border pt-3">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: PJB, fontWeight: 600 }} className="mb-1.5">
            Message
          </p>
          <p style={{ fontSize: "0.825rem", letterSpacing: "-0.015em", lineHeight: 1.65, color: "var(--muted-foreground)" }}>
            {booking.message}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tab, setTab] = useState<"bookings" | "content">("bookings");

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");

  // Content state
  const [nowContent, setNowContent] = useState<NowContent>({
    building: "",
    learning: "",
    reading: "",
    based: "",
  });
  const [availability, setAvailability] = useState<AvailabilityContent>({
    available: true,
    statusText: "Open to Work",
    workTypes: "Freelance · Advisory · Full-time",
  });
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);
  const [availSaved, setAvailSaved] = useState(false);

  // ── Auth check ──────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setToken(session.access_token);
      setUserEmail(session.user.email ?? "");
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin/login");
      else {
        setToken(session.access_token);
        setUserEmail(session.user.email ?? "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // ── Fetch bookings ──────────────────────────────────────────────────────────

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setBookingsLoading(true);
    setBookingsError("");
    try {
      const res = await fetch(`${API}/admin/bookings`, { headers: authHeaders(token) });
      const data = await res.json();
      if (!res.ok) { setBookingsError(data.error ?? "Failed to load bookings"); return; }
      setBookings(data.bookings);
    } catch {
      setBookingsError("Network error loading bookings.");
    } finally {
      setBookingsLoading(false);
    }
  }, [token]);

  // ── Fetch content ───────────────────────────────────────────────────────────

  const fetchContent = useCallback(async () => {
    if (!token) return;
    try {
      const [nowRes, availRes] = await Promise.all([
        fetch(`${API}/content/now`, { headers: authHeaders(token) }),
        fetch(`${API}/content/availability`, { headers: authHeaders(token) }),
      ]);
      const nowData = await nowRes.json();
      const availData = await availRes.json();
      if (nowData.value) setNowContent(nowData.value);
      if (availData.value) setAvailability(availData.value);
    } catch {
      // Silently fall back to defaults
    }
  }, [token]);

  useEffect(() => {
    if (!authLoading && token) {
      fetchBookings();
      fetchContent();
    }
  }, [authLoading, token, fetchBookings, fetchContent]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const saveNowContent = async () => {
    setContentLoading(true);
    try {
      await fetch(`${API}/admin/content/now`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify({ ...nowContent, updatedAt: new Date().toISOString() }),
      });
      setContentSaved(true);
      setTimeout(() => setContentSaved(false), 2500);
    } finally {
      setContentLoading(false);
    }
  };

  const saveAvailability = async () => {
    setContentLoading(true);
    try {
      await fetch(`${API}/admin/content/availability`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(availability),
      });
      setAvailSaved(true);
      setTimeout(() => setAvailSaved(false), 2500);
    } finally {
      setContentLoading(false);
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────────────

  const filtered = statusFilter === "all" ? bookings : bookings.filter((b) => b.status === statusFilter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings.filter(
    (b) => b.date >= today && b.status !== "cancelled"
  ).length;

  // ── Loading / guard ─────────────────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--secondary)" }}>
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
              </div>
              <span style={{ fontFamily: PJB, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "0.9rem" }}>
                Zynk
              </span>
            </div>
            <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>/</span>
            <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "-0.02em", color: "var(--muted-foreground)" }}>
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
              <User className="w-3.5 h-3.5" />
              <span style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}>{userEmail}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "0.775rem", letterSpacing: "-0.015em" }}
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1
            style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.04em" }}
            className="mb-1"
          >
            Dashboard
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}>
            Manage bookings and site content for zynkit.tech
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Bookings", value: stats.total },
            { label: "Upcoming", value: upcoming, highlight: true },
            { label: "Pending Review", value: stats.pending },
            { label: "Cancelled", value: stats.cancelled },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-4 text-center"
              style={highlight ? { borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)", background: "color-mix(in oklch, var(--primary) 5%, var(--card))" } : {}}
            >
              <p
                style={{
                  fontFamily: PJB,
                  fontWeight: 800,
                  fontSize: "1.75rem",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: highlight ? "var(--primary)" : "var(--foreground)",
                }}
                className="mb-1"
              >
                {value}
              </p>
              <p style={{ fontSize: "0.72rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl border border-border bg-muted mb-8 w-fit">
          {(["bookings", "content"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg capitalize transition-all"
              style={{
                fontFamily: PJB,
                fontWeight: 600,
                fontSize: "0.825rem",
                letterSpacing: "-0.015em",
                background: tab === t ? "var(--card)" : "transparent",
                color: tab === t ? "var(--foreground)" : "var(--muted-foreground)",
                boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Bookings tab ── */}
        {tab === "bookings" && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              {/* Status filter */}
              <div className="flex gap-2 flex-wrap">
                {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className="px-3 py-1.5 rounded-lg border transition-all capitalize"
                    style={{
                      fontFamily: PJB,
                      fontWeight: 500,
                      fontSize: "0.775rem",
                      letterSpacing: "-0.01em",
                      background: statusFilter === f ? "var(--primary)" : "var(--card)",
                      color: statusFilter === f ? "white" : "var(--foreground)",
                      borderColor: statusFilter === f ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {f}
                    {f !== "all" && (
                      <span style={{ marginLeft: "5px", opacity: 0.7, fontSize: "0.68rem" }}>
                        {stats[f as BookingStatus]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchBookings}
                disabled={bookingsLoading}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/60"
                style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${bookingsLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {bookingsError && (
              <div
                className="p-3 rounded-lg border mb-4"
                style={{ background: "color-mix(in oklch, var(--destructive) 8%, transparent)", borderColor: "color-mix(in oklch, var(--destructive) 25%, transparent)" }}
              >
                <p style={{ fontSize: "0.8rem", color: "var(--destructive)", letterSpacing: "-0.015em" }}>{bookingsError}</p>
              </div>
            )}

            {bookingsLoading && bookings.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>Loading bookings…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-border text-muted-foreground"
              >
                <CalendarDays className="w-8 h-8 mb-3 opacity-40" />
                <p style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>
                  {statusFilter === "all" ? "No bookings yet." : `No ${statusFilter} bookings.`}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    token={token}
                    onUpdate={updateBookingStatus}
                    onDelete={deleteBooking}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Content tab ── */}
        {tab === "content" && (
          <div className="space-y-8">

            {/* Availability */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.025em" }} className="mb-1">
                    Availability Status
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}>
                    Shown in the hero badge and at-a-glance bar.
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer select-none transition-all"
                  style={{
                    background: availability.available ? "color-mix(in oklch, oklch(0.65 0.20 145) 10%, transparent)" : "var(--muted)",
                    borderColor: availability.available ? "color-mix(in oklch, oklch(0.65 0.20 145) 30%, transparent)" : "var(--border)",
                  }}
                  onClick={() => setAvailability((v) => ({ ...v, available: !v.available }))}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: availability.available ? "oklch(0.65 0.20 145)" : "var(--muted-foreground)" }}
                  />
                  <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.775rem", letterSpacing: "-0.01em", color: availability.available ? "oklch(0.40 0.15 145)" : "var(--muted-foreground)" }}>
                    {availability.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-1.5">
                  <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>Status text</Label>
                  <Input
                    value={availability.statusText}
                    onChange={(e) => setAvailability((v) => ({ ...v, statusText: e.target.value }))}
                    placeholder="Open to Work"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>Work types</Label>
                  <Input
                    value={availability.workTypes}
                    onChange={(e) => setAvailability((v) => ({ ...v, workTypes: e.target.value }))}
                    placeholder="Freelance · Advisory · Full-time"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={saveAvailability} disabled={contentLoading} size="sm" style={{ letterSpacing: "-0.02em" }}>
                  {contentLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : <><Edit3 className="w-3.5 h-3.5" /> Save Availability</>}
                </Button>
                {availSaved && (
                  <span className="flex items-center gap-1" style={{ fontSize: "0.775rem", color: "oklch(0.40 0.15 145)", letterSpacing: "-0.01em" }}>
                    <Check className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Now section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.025em" }} className="mb-1">
                "Now" Section
              </p>
              <p className="text-muted-foreground mb-5" style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}>
                Displayed at the bottom of the homepage. Keep it brief and current.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {([
                  { key: "building", label: "Building" },
                  { key: "learning", label: "Learning" },
                  { key: "reading", label: "Reading" },
                  { key: "based", label: "Based" },
                ] as { key: keyof NowContent; label: string }[]).map(({ key, label }) => (
                  <div key={key} className="space-y-1.5">
                    <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>{label}</Label>
                    <Textarea
                      value={nowContent[key]}
                      onChange={(e) => setNowContent((v) => ({ ...v, [key]: e.target.value }))}
                      placeholder={`What you're ${label.toLowerCase()}…`}
                      rows={3}
                      style={{ fontSize: "0.825rem" }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={saveNowContent} disabled={contentLoading} size="sm" style={{ letterSpacing: "-0.02em" }}>
                  {contentLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : <><Edit3 className="w-3.5 h-3.5" /> Save Now Section</>}
                </Button>
                {contentSaved && (
                  <span className="flex items-center gap-1" style={{ fontSize: "0.775rem", color: "oklch(0.40 0.15 145)", letterSpacing: "-0.01em" }}>
                    <Check className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
