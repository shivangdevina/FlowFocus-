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
    <div className="w-full px-6 md:px-12 pt-12 pb-16">
      <h1 className="font-heading text-6xl font-bold text-foreground mb-4">Profile</h1>
      <p className="text-base text-muted-foreground mb-10">Manage your settings & constraints</p>

      <div className="bg-surface rounded-3xl p-8 py-10 space-y-8 mb-8 shadow-sm">
        <h2 className="font-heading text-xl font-semibold text-surface-foreground">Personal Info</h2>
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={profile.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-base text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              value={profile.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-base text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Occupation
            </label>
            <input
              type="text"
              placeholder="Your occupation"
              value={profile.occupation}
              onChange={(e) => update("occupation", e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-base text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-3xl p-8 py-10 space-y-8 mb-8 shadow-sm">
        <h2 className="font-heading text-xl font-semibold text-surface-foreground">Baseline Constraints</h2>
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Sleep Hours
            </label>
            <div className="flex items-center gap-5">
              <input
                type="range"
                min={4}
                max={12}
                value={profile.sleepHours}
                onChange={(e) => update("sleepHours", parseInt(e.target.value))}
                className="flex-1 accent-primary h-2"
              />
              <span className="text-base font-semibold text-foreground w-16 text-center bg-card rounded-xl py-2">
                {profile.sleepHours}h
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Non-Negotiable Classes / Commitments
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Monday 9-11am Lecture, Thursday 2-4pm Lab..."
              value={profile.nonNegotiableClasses}
              onChange={(e) => update("nonNegotiableClasses", e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-base text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 rounded-[24px] border-2 border-destructive/30 py-5 text-lg font-semibold text-destructive hover:bg-destructive/10 transition-colors mt-4"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
