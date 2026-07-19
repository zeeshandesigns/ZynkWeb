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
  Copy,
  Edit3,
  ExternalLink,
  FileText,
  Loader2,
  LogOut,
  Mail,
  Plus,
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

type ProposalStatus = "draft" | "sent" | "accepted" | "expired";

type ProposalMeta = {
  id: string;
  client: string;
  project: string;
  ref: string;
  url: string;
  status: ProposalStatus;
  date: string;
  notes?: string;
};

type OnboardingStatus = "draft" | "active" | "archived";

type OnboardingMeta = {
  id: string;
  client: string;
  contact: string;
  slug: string;
  status: OnboardingStatus;
  createdAt: string;
};

type OnboardingKit = {
  client: string;
  contact: string;
  welcome: string;
  projectOverview: string;
  expectationsText: string;
  contentBriefFormat: string;
  toolsNeeded: string[];
  faqs: { q: string; a: string }[];
  contactEmail: string;
  createdAt: string;
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

const PROPOSAL_STATUS_COLORS: Record<ProposalStatus, { bg: string; color: string }> = {
  draft: { bg: "color-mix(in oklch, var(--muted-foreground) 12%, transparent)", color: "var(--muted-foreground)" },
  sent: { bg: "color-mix(in oklch, oklch(0.65 0.18 220) 14%, transparent)", color: "oklch(0.38 0.15 220)" },
  accepted: { bg: "color-mix(in oklch, oklch(0.65 0.20 145) 14%, transparent)", color: "oklch(0.40 0.15 145)" },
  expired: { bg: "color-mix(in oklch, var(--destructive) 10%, transparent)", color: "var(--destructive)" },
};

const ONBOARDING_STATUS_COLORS: Record<OnboardingStatus, { bg: string; color: string }> = {
  draft: { bg: "color-mix(in oklch, var(--muted-foreground) 12%, transparent)", color: "var(--muted-foreground)" },
  active: { bg: "color-mix(in oklch, oklch(0.65 0.20 145) 14%, transparent)", color: "oklch(0.40 0.15 145)" },
  archived: { bg: "color-mix(in oklch, var(--destructive) 10%, transparent)", color: "var(--destructive)" },
};

const PJB = "'Plus Jakarta Sans', sans-serif";

const SEED_PROPOSALS: ProposalMeta[] = [
  {
    id: "prop-sa-global",
    client: "SA Global Education",
    project: "Design & Video Editing Retainer",
    ref: "ZYK-2026-001",
    url: "/proposal/sa-global",
    status: "sent",
    date: new Date().toISOString().split("T")[0],
    notes: "Monthly retainer — 35k PKR/mo",
  },
  {
    id: "prop-generic",
    client: "Generic Template",
    project: "Service Proposal",
    ref: "ZYK-TEMPLATE",
    url: "/proposal",
    status: "draft",
    date: new Date().toISOString().split("T")[0],
    notes: "Generic proposal template",
  },
];

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
      <div className="flex items-start gap-4 p-4">
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
              <Clock className="w-3 h-3" /> {booking.time} PKT
            </span>
          </div>
        </div>

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

// ─── Documents Tab ────────────────────────────────────────────────────────────

function ProposalPill({ status }: { status: ProposalStatus }) {
  const s = PROPOSAL_STATUS_COLORS[status];
  return (
    <span
      style={{
        fontFamily: PJB, fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.04em",
        textTransform: "uppercase", background: s.bg, color: s.color,
        padding: "2px 8px", borderRadius: 999,
      }}
    >
      {status}
    </span>
  );
}

function OnboardingPill({ status }: { status: OnboardingStatus }) {
  const s = ONBOARDING_STATUS_COLORS[status];
  return (
    <span
      style={{
        fontFamily: PJB, fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.04em",
        textTransform: "uppercase", background: s.bg, color: s.color,
        padding: "2px 8px", borderRadius: 999,
      }}
    >
      {status}
    </span>
  );
}

function ProposalsTab({ token }: { token: string }) {
  const [proposals, setProposals] = useState<ProposalMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [newProposal, setNewProposal] = useState({
    client: "", project: "", ref: "", notes: "",
  });

  const saveProposals = async (updated: ProposalMeta[]) => {
    setSaving(true);
    try {
      await fetch(`${API}/admin/content/doc-proposals`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(updated),
      });
      setProposals(updated);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetch(`${API}/content/doc-proposals`, { headers: authHeaders(token) })
      .then((r) => r.json())
      .then((res) => {
        setProposals(res.value ?? SEED_PROPOSALS);
      })
      .catch(() => setProposals(SEED_PROPOSALS))
      .finally(() => setLoading(false));
  }, [token]);

  const updateStatus = async (id: string, status: ProposalStatus) => {
    const updated = proposals.map((p) => p.id === id ? { ...p, status } : p);
    await saveProposals(updated);
  };

  const copyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const addProposal = async () => {
    if (!newProposal.client.trim()) return;
    const slug = newProposal.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const id = `prop-${slug}-${Date.now()}`;
    const entry: ProposalMeta = {
      id,
      client: newProposal.client.trim(),
      project: newProposal.project.trim() || "Service Proposal",
      ref: newProposal.ref.trim() || `ZYK-${new Date().getFullYear()}-${String(proposals.length + 1).padStart(3, "0")}`,
      url: `/proposal?client=${encodeURIComponent(newProposal.client.trim())}`,
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      notes: newProposal.notes.trim(),
    };
    const updated = [...proposals, entry];
    await saveProposals(updated);
    setNewProposal({ client: "", project: "", ref: "", notes: "" });
    setShowForm(false);
  };

  const deleteProposal = async (id: string) => {
    if (!confirm("Remove this proposal from the list?")) return;
    await saveProposals(proposals.filter((p) => p.id !== id));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span style={{ fontSize: "0.875rem" }}>Loading proposals…</span>
    </div>
  );

  return (
    <div>
      {/* New proposal form */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-muted-foreground" style={{ fontSize: "0.8rem", letterSpacing: "-0.015em" }}>
          {proposals.length} proposal{proposals.length !== 1 ? "s" : ""}
          {saving && <span className="ml-2 text-primary">Saving…</span>}
        </p>
        <Button size="sm" onClick={() => setShowForm((v) => !v)} style={{ letterSpacing: "-0.02em" }}>
          <Plus className="w-3.5 h-3.5" /> New Proposal
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-5 mb-5 space-y-4">
          <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.025em" }}>Add Proposal Entry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Client Name *</Label>
              <Input value={newProposal.client} onChange={(e) => setNewProposal((v) => ({ ...v, client: e.target.value }))} placeholder="Acme Corp" style={{ fontSize: "0.85rem" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Project / Scope</Label>
              <Input value={newProposal.project} onChange={(e) => setNewProposal((v) => ({ ...v, project: e.target.value }))} placeholder="Brand Identity + Web" style={{ fontSize: "0.85rem" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Ref</Label>
              <Input value={newProposal.ref} onChange={(e) => setNewProposal((v) => ({ ...v, ref: e.target.value }))} placeholder="ZYK-2026-003" style={{ fontSize: "0.85rem" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Notes</Label>
              <Input value={newProposal.notes} onChange={(e) => setNewProposal((v) => ({ ...v, notes: e.target.value }))} placeholder="Budget, duration, etc." style={{ fontSize: "0.85rem" }} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={addProposal} disabled={saving || !newProposal.client.trim()} style={{ letterSpacing: "-0.02em" }}>
              {saving ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving…</> : "Add Entry"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Proposal cards */}
      <div className="space-y-3">
        {proposals.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.025em" }}>
                    {p.client}
                  </p>
                  <ProposalPill status={p.status} />
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "0.775rem", letterSpacing: "-0.015em" }}>
                  {p.project} · <span style={{ fontFamily: PJB, fontWeight: 600 }}>{p.ref}</span> · {p.date}
                </p>
                {p.notes && (
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}>
                    {p.notes}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <select
                  value={p.status}
                  onChange={(e) => updateStatus(p.id, e.target.value as ProposalStatus)}
                  style={{
                    fontFamily: PJB, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "-0.01em",
                    background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8,
                    padding: "4px 8px", color: "var(--foreground)", cursor: "pointer",
                  }}
                >
                  {(["draft", "sent", "accepted", "expired"] as ProposalStatus[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => window.open(p.url, "_blank")}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
                  title="Preview"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyLink(p.url, p.id)}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
                  title={copied === p.id ? "Copied!" : "Copy link"}
                >
                  {copied === p.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => deleteProposal(p.id)}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {proposals.length === 0 && (
          <div className="flex items-center justify-center py-14 rounded-xl border border-dashed border-border text-muted-foreground">
            <p style={{ fontSize: "0.875rem" }}>No proposals yet. Add one above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OnboardingTab({ token }: { token: string }) {
  const [index, setIndex] = useState<OnboardingMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [kitData, setKitData] = useState<Record<string, OnboardingKit>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const [newKit, setNewKit] = useState({ client: "", contact: "", slug: "" });
  const [editKit, setEditKit] = useState<OnboardingKit | null>(null);

  useEffect(() => {
    fetch(`${API}/content/doc-onboarding-index`, { headers: authHeaders(token) })
      .then((r) => r.json())
      .then((res) => setIndex(res.value ?? []))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [token]);

  const saveIndex = async (updated: OnboardingMeta[]) => {
    await fetch(`${API}/admin/content/doc-onboarding-index`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(updated),
    });
    setIndex(updated);
  };

  const openEdit = async (meta: OnboardingMeta) => {
    if (editingSlug === meta.slug) { setEditingSlug(null); return; }
    if (!kitData[meta.slug]) {
      const res = await fetch(`${API}/content/onboard-${meta.slug}`, { headers: authHeaders(token) });
      const data = await res.json();
      setKitData((prev) => ({ ...prev, [meta.slug]: data.value ?? blankKit(meta.client, meta.contact) }));
    }
    setEditKit(kitData[meta.slug] ?? blankKit(meta.client, meta.contact));
    setEditingSlug(meta.slug);
  };

  const blankKit = (client: string, contact: string): OnboardingKit => ({
    client,
    contact,
    welcome: "",
    projectOverview: "",
    expectationsText: "",
    contentBriefFormat: "",
    toolsNeeded: [],
    faqs: [],
    contactEmail: "hello@zynkit.tech",
    createdAt: new Date().toISOString(),
  });

  const saveKit = async (slug: string) => {
    if (!editKit) return;
    setSaving(slug);
    try {
      await fetch(`${API}/admin/content/onboard-${slug}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(editKit),
      });
      setKitData((prev) => ({ ...prev, [slug]: editKit }));
      setEditingSlug(null);
    } finally {
      setSaving(null);
    }
  };

  const createKit = async () => {
    if (!newKit.client.trim() || !newKit.slug.trim()) return;
    const id = `onboard-${Date.now()}`;
    const meta: OnboardingMeta = {
      id,
      client: newKit.client.trim(),
      contact: newKit.contact.trim(),
      slug: newKit.slug.trim(),
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    const kit = blankKit(meta.client, meta.contact);
    setSaving("new");
    try {
      await fetch(`${API}/admin/content/onboard-${meta.slug}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(kit),
      });
      const updated = [...index, meta];
      await saveIndex(updated);
      setKitData((prev) => ({ ...prev, [meta.slug]: kit }));
      setNewKit({ client: "", contact: "", slug: "" });
      setShowNewForm(false);
    } finally {
      setSaving(null);
    }
  };

  const deleteKit = async (meta: OnboardingMeta) => {
    if (!confirm(`Delete onboarding kit for ${meta.client}?`)) return;
    await saveIndex(index.filter((m) => m.slug !== meta.slug));
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(window.location.origin + `/onboard/${slug}`);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  const updateStatus = async (slug: string, status: OnboardingStatus) => {
    const updated = index.map((m) => m.slug === slug ? { ...m, status } : m);
    await saveIndex(updated);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span style={{ fontSize: "0.875rem" }}>Loading kits…</span>
    </div>
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-muted-foreground" style={{ fontSize: "0.8rem", letterSpacing: "-0.015em" }}>
          {index.length} kit{index.length !== 1 ? "s" : ""}
        </p>
        <Button size="sm" onClick={() => setShowNewForm((v) => !v)} style={{ letterSpacing: "-0.02em" }}>
          <Plus className="w-3.5 h-3.5" /> New Kit
        </Button>
      </div>

      {showNewForm && (
        <div className="rounded-xl border border-border bg-card p-5 mb-5 space-y-4">
          <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.025em" }}>New Onboarding Kit</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Client Name *</Label>
              <Input
                value={newKit.client}
                onChange={(e) => {
                  const client = e.target.value;
                  const slug = client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  setNewKit((v) => ({ ...v, client, slug }));
                }}
                placeholder="Acme Corp"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Contact Person</Label>
              <Input value={newKit.contact} onChange={(e) => setNewKit((v) => ({ ...v, contact: e.target.value }))} placeholder="Mr. John Smith" style={{ fontSize: "0.85rem" }} />
            </div>
            <div className="space-y-1.5">
              <Label style={{ fontSize: "0.78rem" }}>Slug * (URL)</Label>
              <Input value={newKit.slug} onChange={(e) => setNewKit((v) => ({ ...v, slug: e.target.value }))} placeholder="acme-corp" style={{ fontSize: "0.85rem" }} />
            </div>
          </div>
          <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
            Kit will be at: <span style={{ fontFamily: "monospace" }}>/onboard/{newKit.slug || "slug"}</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={createKit} disabled={saving === "new" || !newKit.client.trim() || !newKit.slug.trim()} style={{ letterSpacing: "-0.02em" }}>
              {saving === "new" ? <><Loader2 className="w-3 h-3 animate-spin" /> Creating…</> : "Create Kit"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {index.map((meta) => (
          <div key={meta.slug} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-start gap-3 p-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.025em" }}>{meta.client}</p>
                  <OnboardingPill status={meta.status} />
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "0.775rem", letterSpacing: "-0.015em" }}>
                  {meta.contact && `${meta.contact} · `}<span style={{ fontFamily: "monospace", fontSize: "0.72rem" }}>/onboard/{meta.slug}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <select
                  value={meta.status}
                  onChange={(e) => updateStatus(meta.slug, e.target.value as OnboardingStatus)}
                  style={{
                    fontFamily: PJB, fontWeight: 600, fontSize: "0.75rem",
                    background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8,
                    padding: "4px 8px", color: "var(--foreground)", cursor: "pointer",
                  }}
                >
                  {(["draft", "active", "archived"] as OnboardingStatus[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => window.open(`/onboard/${meta.slug}`, "_blank")}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
                  title="Preview"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyLink(meta.slug)}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
                  title={copied === meta.slug ? "Copied!" : "Copy link"}
                >
                  {copied === meta.slug ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => openEdit(meta)}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-primary transition-colors"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteKit(meta)}
                  className="p-1.5 rounded-lg hover:bg-accent/60 text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {editingSlug === meta.slug && editKit && (
              <div className="border-t border-border p-4 space-y-4 bg-muted/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([
                    { key: "welcome", label: "Welcome Message" },
                    { key: "projectOverview", label: "Project Overview" },
                    { key: "expectationsText", label: "What to Expect" },
                    { key: "contentBriefFormat", label: "How to Send Brief" },
                  ] as { key: keyof OnboardingKit; label: string }[]).map(({ key, label }) => (
                    <div key={key} className="space-y-1.5">
                      <Label style={{ fontSize: "0.78rem" }}>{label}</Label>
                      <Textarea
                        value={editKit[key] as string}
                        onChange={(e) => setEditKit((v) => v ? { ...v, [key]: e.target.value } : v)}
                        rows={3}
                        style={{ fontSize: "0.82rem" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <Label style={{ fontSize: "0.78rem" }}>Tools Needed (comma-separated)</Label>
                  <Input
                    value={editKit.toolsNeeded.join(", ")}
                    onChange={(e) => setEditKit((v) => v ? { ...v, toolsNeeded: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) } : v)}
                    placeholder="Google Drive access, WhatsApp group, Notion access"
                    style={{ fontSize: "0.82rem" }}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label style={{ fontSize: "0.78rem" }}>FAQs</Label>
                    <button
                      onClick={() => setEditKit((v) => v ? { ...v, faqs: [...v.faqs, { q: "", a: "" }] } : v)}
                      className="text-primary hover:text-primary/80 transition-colors"
                      style={{ fontSize: "0.72rem", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Plus className="w-3 h-3" /> Add FAQ
                    </button>
                  </div>
                  {editKit.faqs.map((faq, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          value={faq.q}
                          onChange={(e) => {
                            const faqs = [...editKit.faqs];
                            faqs[i] = { ...faqs[i], q: e.target.value };
                            setEditKit((v) => v ? { ...v, faqs } : v);
                          }}
                          placeholder="Question"
                          style={{ fontSize: "0.78rem" }}
                        />
                        <Textarea
                          value={faq.a}
                          onChange={(e) => {
                            const faqs = [...editKit.faqs];
                            faqs[i] = { ...faqs[i], a: e.target.value };
                            setEditKit((v) => v ? { ...v, faqs } : v);
                          }}
                          placeholder="Answer"
                          rows={2}
                          style={{ fontSize: "0.78rem" }}
                        />
                      </div>
                      <button
                        onClick={() => setEditKit((v) => v ? { ...v, faqs: v.faqs.filter((_, idx) => idx !== i) } : v)}
                        className="p-1.5 mt-0.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <Label style={{ fontSize: "0.78rem" }}>Contact Email</Label>
                  <Input
                    value={editKit.contactEmail}
                    onChange={(e) => setEditKit((v) => v ? { ...v, contactEmail: e.target.value } : v)}
                    style={{ fontSize: "0.82rem" }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => saveKit(meta.slug)}
                    disabled={saving === meta.slug}
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {saving === meta.slug ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving…</> : <><Check className="w-3 h-3" /> Save Kit</>}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingSlug(null)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {index.length === 0 && (
          <div className="flex items-center justify-center py-14 rounded-xl border border-dashed border-border text-muted-foreground">
            <p style={{ fontSize: "0.875rem" }}>No onboarding kits yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DocumentsTab({ token }: { token: string }) {
  const [subTab, setSubTab] = useState<"proposals" | "onboarding">("proposals");

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["proposals", "onboarding"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className="px-4 py-2.5 capitalize transition-all"
            style={{
              fontFamily: PJB,
              fontWeight: 600,
              fontSize: "0.825rem",
              letterSpacing: "-0.015em",
              color: subTab === t ? "var(--primary)" : "var(--muted-foreground)",
              borderBottom: subTab === t ? "2px solid var(--primary)" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {t === "proposals" ? "Proposals" : "Onboarding Kits"}
          </button>
        ))}
      </div>

      {subTab === "proposals" && <ProposalsTab token={token} />}
      {subTab === "onboarding" && <OnboardingTab token={token} />}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tab, setTab] = useState<"bookings" | "content" | "documents">("bookings");

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
  const [nowLoading, setNowLoading] = useState(false);
  const [availLoading, setAvailLoading] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);
  const [availSaved, setAvailSaved] = useState(false);
  const nowSavedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const availSavedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (nowSavedTimer.current) clearTimeout(nowSavedTimer.current);
    if (availSavedTimer.current) clearTimeout(availSavedTimer.current);
  }, []);

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
    setNowLoading(true);
    try {
      await fetch(`${API}/admin/content/now`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify({ ...nowContent, updatedAt: new Date().toISOString() }),
      });
      setContentSaved(true);
      if (nowSavedTimer.current) clearTimeout(nowSavedTimer.current);
      nowSavedTimer.current = setTimeout(() => setContentSaved(false), 2500);
    } finally {
      setNowLoading(false);
    }
  };

  const saveAvailability = async () => {
    setAvailLoading(true);
    try {
      await fetch(`${API}/admin/content/availability`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(availability),
      });
      setAvailSaved(true);
      if (availSavedTimer.current) clearTimeout(availSavedTimer.current);
      availSavedTimer.current = setTimeout(() => setAvailSaved(false), 2500);
    } finally {
      setAvailLoading(false);
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

  const TAB_LABELS: Record<typeof tab, string> = {
    bookings: "Bookings",
    content: "Content",
    documents: "Documents",
  };

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
            Manage bookings, content, and client documents for zynkit.tech
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
          {(["bookings", "content", "documents"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg transition-all"
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
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* ── Bookings tab ── */}
        {tab === "bookings" && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
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
              <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-border text-muted-foreground">
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
                <Button onClick={saveAvailability} disabled={availLoading} size="sm" style={{ letterSpacing: "-0.02em" }}>
                  {availLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : <><Edit3 className="w-3.5 h-3.5" /> Save Availability</>}
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
                <Button onClick={saveNowContent} disabled={nowLoading} size="sm" style={{ letterSpacing: "-0.02em" }}>
                  {nowLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : <><Edit3 className="w-3.5 h-3.5" /> Save Now Section</>}
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

        {/* ── Documents tab ── */}
        {tab === "documents" && <DocumentsTab token={token} />}

      </div>
    </div>
  );
}
