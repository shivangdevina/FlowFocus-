import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/lib/store";
import onboardingIllustration from "@/assets/onboarding-illustration.png";
import { Upload } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [occupation, setOccupation] = useState("");
  const [goals, setGoals] = useState(["", "", ""]);

  const handleGoalChange = (idx: number, val: string) => {
    const g = [...goals];
    g[idx] = val;
    setGoals(g);
  };

  const handleComplete = () => {
    const profile = store.getProfile();
    store.setProfile({ ...profile, education, workExperience, occupation, goals });
    store.setIsOnboarded(true);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-background p-12">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground leading-snug">
            {step === 1
              ? "Let's Get to Know You!"
              : "What Are Your Big 3 Goals?"}
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">
            {step === 1
              ? "We use the information you share to personalize your experience. It remains private and secure."
              : "Set your top priorities so we can help you stay on track."}
          </p>
          <img
            src={onboardingIllustration}
            alt="Onboarding illustration"
            className="mt-10 w-72 mx-auto opacity-90"
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-surface rounded-3xl p-10 shadow-sm animate-fade-in">
          {step === 1 ? (
            <>
              <h2 className="font-heading text-3xl font-semibold text-center text-surface-foreground mb-2">
                Tell Us About You
              </h2>
              <p className="text-center text-sm text-muted-foreground mb-8">
                Help us personalize your journey.
              </p>

              {/* CV Upload zone */}
              <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center mb-2 hover:border-muted-foreground/40 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                <p className="font-semibold text-sm text-surface-foreground">Extract from my CV</p>
                <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">
                  Drag & drop or click to upload (PDF only, up to 20 MB)
                </p>
              </div>

              <div className="dotted-divider">
                <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  or enter your details manually
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    Education*
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Your educational background..."
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    Work Experience*
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Your work experience..."
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                    Current Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student, Software Engineer..."
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-8 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <h2 className="font-heading text-3xl font-semibold text-center text-surface-foreground mb-2">
                Your Big 3 Goals
              </h2>
              <p className="text-center text-sm text-muted-foreground mb-8">
                What matters most to you right now?
              </p>

              <div className="space-y-5">
                {goals.map((goal, i) => (
                  <div key={i}>
                    <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                      Goal {i + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        i === 0 ? "e.g. Ace final exams" :
                        i === 1 ? "e.g. Build a side project" :
                        "e.g. Exercise 4x/week"
                      }
                      value={goal}
                      onChange={(e) => handleGoalChange(i, e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-2xl border border-border py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Save & Go to Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
