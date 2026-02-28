import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/lib/store";
import onboardingIllustration from "@/assets/onboarding-illustration.png";
import { Upload, ImageIcon } from "lucide-react";

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
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-background p-16">
        <div className="max-w-xl text-center">
          <h1 className="font-heading text-6xl font-bold text-foreground leading-snug">
            {step === 1
              ? "Let's Get to Know You!"
              : "What Are Your Big 3 Goals?"}
          </h1>
          <p className="text-muted-foreground mt-4 text-xl">
            {step === 1
              ? "We use the information you share to personalize your experience. It remains private and secure."
              : "Set your top priorities so we can help you stay on track."}
          </p>
          <img
            src={onboardingIllustration}
            alt="Onboarding illustration"
            className="mt-16 w-[450px] mx-auto opacity-90"
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-xl bg-surface rounded-[40px] p-12 lg:p-14 shadow-md animate-fade-in">
          {step === 1 ? (
            <>
              <h2 className="font-heading text-4xl font-semibold text-center text-surface-foreground mb-4">
                Tell Us About You
              </h2>
              <p className="text-center text-base text-muted-foreground mb-10">
                Help us personalize your journey.
              </p>

              {/* CV Upload zone */}
              <div className="border-[3px] border-dashed border-border rounded-3xl p-10 text-center mb-4 hover:border-muted-foreground/40 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
                <p className="font-semibold text-lg text-surface-foreground">Extract from my CV</p>
                <p className="text-sm text-muted-foreground mt-2 tracking-wide uppercase">
                  Drag & drop or click to upload (PDF only, up to 20 MB)
                </p>
              </div>

              <div className="dotted-divider my-8">
                <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase px-4 bg-surface relative z-10">
                  or enter your details manually
                </span>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold tracking-widest text-muted-foreground uppercase mb-3">
                    Education*
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Your educational background..."
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full rounded-2xl border-2 border-border bg-card px-6 py-5 text-xl text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-widest text-muted-foreground uppercase mb-3">
                    Work Experience*
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Your work experience..."
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="w-full rounded-2xl border-2 border-border bg-card px-6 py-5 text-xl text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-widest text-muted-foreground uppercase mb-3">
                    Current Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student, Software Engineer..."
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full rounded-2xl border-2 border-border bg-card px-6 py-5 text-xl text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-12 rounded-[24px] bg-primary py-5 text-xl font-bold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <h2 className="font-heading text-4xl font-semibold text-center text-surface-foreground mb-4">
                Your Big 3 Goals
              </h2>
              <p className="text-center text-base text-muted-foreground mb-10">
                What matters most to you right now?
              </p>

              <div className="space-y-8">
                {goals.map((goal, i) => (
                  <div key={i}>
                    <label className="block text-sm font-bold tracking-widest text-muted-foreground uppercase mb-3">
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
                      className="w-full rounded-2xl border-2 border-border bg-card px-6 py-5 text-xl text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 border-[3px] border-dashed border-border rounded-3xl p-8 text-center hover:border-muted-foreground/40 transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                <p className="font-semibold text-lg text-surface-foreground">Upload existing timetable (Optional)</p>
                <p className="text-sm text-muted-foreground mt-2 tracking-wide uppercase">
                  Extract tasks from Image or PDF
                </p>
              </div>

              <div className="flex gap-5 mt-12">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-[24px] border-2 border-border py-4 text-xl font-bold text-foreground hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 rounded-[24px] bg-primary py-4 text-xl font-bold text-primary-foreground hover:opacity-90 transition-opacity"
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
