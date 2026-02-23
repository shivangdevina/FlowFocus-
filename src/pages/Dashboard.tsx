import { store } from "@/lib/store";
import { Target } from "lucide-react";

const goalColors = [
  "from-accent/60 to-accent/30",
  "from-secondary to-muted",
  "from-muted to-card",
];
const progressValues = [65, 40, 80];

const weeklyData = [
  { label: "Study", hours: 12, color: "bg-primary" },
  { label: "Work", hours: 8, color: "bg-accent" },
  { label: "Health", hours: 5, color: "bg-muted-foreground/40" },
  { label: "Growth", hours: 4, color: "bg-secondary" },
];
const maxHours = 14;

const Dashboard = () => {
  const profile = store.getProfile();
  const goals = profile.goals.filter(Boolean).length > 0
    ? profile.goals
    : ["Ace final exams", "Build a side project", "Exercise 4x/week"];

  return (
    <div className="w-full px-6 md:px-10 pt-10">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">Your executive summary</p>

      {/* Big 3 Goals */}
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">My Big 3 Goals</h2>
      <div className="grid gap-4 mb-10">
        {goals.map((goal, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${goalColors[i]} rounded-2xl p-6 py-8 animate-fade-in`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-foreground/70" />
              <span className="font-semibold text-sm text-foreground">{goal || `Goal ${i + 1}`}</span>
            </div>
            {/* Progress ring (simple bar) */}
            <div className="w-full h-2 bg-background/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/70 rounded-full transition-all duration-700"
                style={{ width: `${progressValues[i]}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{progressValues[i]}% complete</p>
          </div>
        ))}
      </div>

      {/* Weekly Status */}
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Weekly Status</h2>
      <div className="bg-card rounded-2xl p-6 py-8">
        <div className="space-y-5">
          {weeklyData.map((d) => (
            <div key={d.label} className="flex items-center gap-4">
              <span className="text-xs font-medium text-muted-foreground w-14">{d.label}</span>
              <div className="flex-1 h-4 bg-background rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${d.color} transition-all duration-700`}
                  style={{ width: `${(d.hours / maxHours) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground w-10 text-right">{d.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
