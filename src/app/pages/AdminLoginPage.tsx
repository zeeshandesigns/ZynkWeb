import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, Lock, Mail, Zap } from "lucide-react";
import { supabase } from "../../utils/supabase";

type Mode = "password" | "magic";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); return; }
      navigate("/admin");
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (err) { setError(err.message); return; }
      setMagicSent(true);
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--secondary)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-white/80" />
          </div>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontSize: "1.1rem",
            }}
          >
            Zynk
          </span>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
          >
            / Admin
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <div
            className="px-6 py-5 border-b border-border"
            style={{ background: "color-mix(in oklch, var(--primary) 4%, var(--card))" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-primary" />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.025em",
                }}
              >
                Admin Login
              </p>
            </div>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}
            >
              Restricted access · zynkit.tech
            </p>
          </div>

          <div className="p-6">
            {/* Mode toggle */}
            <div className="flex gap-1 p-1 rounded-lg mb-6" style={{ background: "var(--muted)" }}>
              {([
                { key: "password", label: "Password", icon: Lock },
                { key: "magic", label: "Magic Link", icon: Zap },
              ] as { key: Mode; label: string; icon: any }[]).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setMode(key); setError(""); setMagicSent(false); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.775rem",
                    letterSpacing: "-0.015em",
                    background: mode === key ? "var(--card)" : "transparent",
                    color: mode === key ? "var(--foreground)" : "var(--muted-foreground)",
                    boxShadow: mode === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  <Icon className="w-3 h-3" /> {label}
                </button>
              ))}
            </div>

            {/* Password form */}
            {mode === "password" && (
              <form onSubmit={handlePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
                {error && (
                  <p style={{ fontSize: "0.775rem", color: "var(--destructive)", letterSpacing: "-0.01em" }}>
                    {error}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={loading} style={{ letterSpacing: "-0.02em" }}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
                </Button>
              </form>
            )}

            {/* Magic link form */}
            {mode === "magic" && (
              <>
                {magicSent ? (
                  <div className="text-center py-4">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        letterSpacing: "-0.025em",
                      }}
                      className="mb-1"
                    >
                      Check your inbox
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8rem", letterSpacing: "-0.015em", lineHeight: 1.5 }}
                    >
                      Magic link sent to <strong>{email}</strong>. Click it to sign in.
                    </p>
                    <button
                      onClick={() => setMagicSent(false)}
                      className="mt-4 text-primary hover:opacity-70 transition-opacity"
                      style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}
                    >
                      Send again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMagicLink} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>Email</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        style={{ fontSize: "0.875rem" }}
                      />
                    </div>
                    {error && (
                      <p style={{ fontSize: "0.775rem", color: "var(--destructive)", letterSpacing: "-0.01em" }}>
                        {error}
                      </p>
                    )}
                    <Button type="submit" className="w-full" disabled={loading} style={{ letterSpacing: "-0.02em" }}>
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Zap className="w-4 h-4" /> Send Magic Link</>}
                    </Button>
                    <p
                      className="text-center text-muted-foreground"
                      style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}
                    >
                      A one-time link will be sent to your email.
                    </p>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
