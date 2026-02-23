import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/lib/store";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(store.getProfile());

  const update = (key: string, value: string | number) => {
    const updated = { ...profile, [key]: value };
    setProfile(updated as typeof profile);
    store.setProfile(updated as typeof profile);
  };

  const handleLogout = () => {
    store.logout();
    navigate("/");
  };

  return (
    <div className="w-full px-6 md:px-10 pt-10">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Profile</h1>
      <p className="text-sm text-muted-foreground mb-8">Manage your settings & constraints</p>

      <div className="bg-surface rounded-2xl p-6 py-8 space-y-6 mb-6">
        <h2 className="font-heading text-lg font-semibold text-surface-foreground">Personal Info</h2>
        <div className="grid gap-5">
          <div>
            <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={profile.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              value={profile.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
              Occupation
            </label>
            <input
              type="text"
              placeholder="Your occupation"
              value={profile.occupation}
              onChange={(e) => update("occupation", e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 py-8 space-y-6 mb-6">
        <h2 className="font-heading text-lg font-semibold text-surface-foreground">Baseline Constraints</h2>
        <div className="grid gap-5">
          <div>
            <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
              Sleep Hours
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={4}
                max={12}
                value={profile.sleepHours}
                onChange={(e) => update("sleepHours", parseInt(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-semibold text-foreground w-12 text-center bg-card rounded-lg py-1.5">
                {profile.sleepHours}h
              </span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
              Non-Negotiable Classes / Commitments
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Monday 9-11am Lecture, Thursday 2-4pm Lab..."
              value={profile.nonNegotiableClasses}
              onChange={(e) => update("nonNegotiableClasses", e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 py-5 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
