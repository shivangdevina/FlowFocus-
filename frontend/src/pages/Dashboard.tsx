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
    <div className="w-full px-6 md:px-12 pt-12 pb-16">
      <h1 className="font-heading text-6xl font-bold text-foreground mb-4">Dashboard</h1>
      <p className="text-base text-muted-foreground mb-10">Your executive summary</p>

      {/* Big 3 Goals */}
      <h2 className="font-heading text-xl font-semibold text-foreground mb-5">My Big 3 Goals</h2>
      <div className="grid gap-5 mb-12">
        {goals.map((goal, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${goalColors[i]} rounded-3xl p-8 py-10 animate-fade-in`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-6 h-6 text-foreground/70" />
              <span className="font-semibold text-base text-foreground">{goal || `Goal ${i + 1}`}</span>
            </div>
            {/* Progress ring (simple bar) */}
            <div className="w-full h-3 bg-background/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/70 rounded-full transition-all duration-700"
                style={{ width: `${progressValues[i]}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">{progressValues[i]}% complete</p>
          </div>
        ))}
      </div>

      {/* Weekly Status */}
      <h2 className="font-heading text-xl font-semibold text-foreground mb-5">Weekly Status</h2>
      <div className="bg-card rounded-3xl p-8 py-10 shadow-sm">
        <div className="space-y-6">
          {weeklyData.map((d) => (
            <div key={d.label} className="flex items-center gap-5">
              <span className="text-sm font-medium text-muted-foreground w-16">{d.label}</span>
              <div className="flex-1 h-5 bg-background rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${d.color} transition-all duration-700`}
                  style={{ width: `${(d.hours / maxHours) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-foreground w-12 text-right">{d.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
