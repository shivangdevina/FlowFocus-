import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/lib/store";
import authIllustration from "@/assets/auth-illustration.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setIsLoggedIn(true);
    if (store.getIsOnboarded()) {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-background p-12">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground mb-4">
            FocusFlow
          </h1>
          <p className="font-heading text-xl text-muted-foreground italic">
            Short courses, bespoke to you
          </p>
          <img
            src={authIllustration}
            alt="Student reading with rabbit companion"
            className="mt-12 w-80 mx-auto opacity-90"
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-background lg:bg-transparent p-6">
        <div className="w-full max-w-md bg-surface rounded-3xl p-10 shadow-sm">
          <h2 className="font-heading text-3xl font-semibold text-center text-surface-foreground mb-8">
            {isSignUp ? "Create Account" : "Welcome back!"}
          </h2>

          {/* Google button */}
          <button className="w-full flex items-center justify-center gap-3 rounded-2xl border border-border bg-surface py-3.5 px-6 text-sm font-medium text-surface-foreground hover:bg-muted transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="dotted-divider">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">or</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                Username / Email
              </label>
              <input
                type="text"
                placeholder="Username / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4 hover:underline cursor-pointer">
            Reset password
          </p>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-foreground underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
