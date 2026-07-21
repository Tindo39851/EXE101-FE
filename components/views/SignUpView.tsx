import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignUpView() {
  const {
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,
    signupAccountName,
    setSignupAccountName,
    signupFullName,
    setSignupFullName,
    signupPhone,
    setSignupPhone,
    signupCaptchaChecked,
    setSignupCaptchaChecked,
    signupAgreePolicy,
    setSignupAgreePolicy,
    signupAgreeNews,
    setSignupAgreeNews,
    updateState,
    setIsLoggedIn,
    setView,
    notify,
  } = useAppState();

  const handleSignUp = () => {
    if (signupEmail.trim() === "" || signupPassword.trim() === "" || signupAccountName.trim() === "" || signupFullName.trim() === "") {
      notify("Error: All fields marked with label are required.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      notify("Error: Passwords do not match.");
      return;
    }
    if (!signupCaptchaChecked) {
      notify("Error: Please verify that you are not a robot.");
      return;
    }
    if (!signupAgreePolicy) {
      notify("Error: You must accept GameTrust's Privacy Policy.");
      return;
    }

    const currentRegTime = Date.now();
    updateState((draft) => {
      draft.users.push({
        id: `u_${currentRegTime}`,
        name: signupAccountName,
        role: "gamer",
        game: "Valorant",
        rank: "Platinum",
        goal: "Compete",
        premium: false,
        trustScore: 85,
      });
      draft.currentUserId = `u_${currentRegTime}`;
    });

    setIsLoggedIn(true);
    setView("overview");
    notify(`Account ${signupAccountName} registered successfully!`);
  };

  return (
    <section className="flex justify-center items-center py-16 font-mono select-none">
      <div className="w-full max-w-lg bg-slate-950/95 border border-cyan-400/30 p-10 flex flex-col items-center relative hover:shadow-[0_0_24px_rgba(0,246,255,0.15)] transition-all duration-300">
        {/* Top cyan bar */}
        <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.6)]" />

        <span className="text-cyan-400 text-[8px] font-black tracking-widest uppercase mb-2">
          CREATE REGISTERED NODE // PORT_443
        </span>

        <h3 className="text-slate-100 text-2xl font-black tracking-widest mb-8 uppercase text-center">
          SIGN UP GATEWAY
        </h3>

        {/* Form container */}
        <div className="w-full flex flex-col gap-4">
          <Input
            label="EMAIL ADDRESS"
            type="email"
            placeholder="Enter your email address..."
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />

          <Input
            label="CHOOSE PASSWORD"
            type="password"
            placeholder="••••••••••••"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          <Input
            label="CONFIRM PASSWORD"
            type="password"
            placeholder="••••••••••••"
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
          />

          <Input
            label="ACCOUNT CHOSEN USERNAME"
            placeholder="e.g. ghost_operator"
            value={signupAccountName}
            onChange={(e) => setSignupAccountName(e.target.value)}
          />

          <Input
            label="YOUR FULL NAME"
            placeholder="Enter your full name..."
            value={signupFullName}
            onChange={(e) => setSignupFullName(e.target.value)}
          />

          <Input
            label="PHONE NUMBER (OPTIONAL)"
            placeholder="+84 90 123 4567"
            value={signupPhone}
            onChange={(e) => setSignupPhone(e.target.value)}
          />

          {/* Mock reCAPTCHA Widget */}
          <div className="w-[300px] h-[78px] mx-auto bg-zinc-950 border border-zinc-800 flex items-center justify-between px-3.5 select-none mt-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recaptcha-signup"
                checked={signupCaptchaChecked}
                onChange={(e) => setSignupCaptchaChecked(e.target.checked)}
                className="size-6 border border-zinc-700 bg-zinc-950 focus:ring-0 focus:outline-none accent-cyan-400 cursor-pointer"
              />
              <label htmlFor="recaptcha-signup" className="text-white text-xs font-sans cursor-pointer">
                I'm not a robot
              </label>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] text-slate-500 font-sans mt-0.5">reCAPTCHA</span>
              <span className="text-[6px] text-slate-400 font-sans">Privacy - Terms</span>
            </div>
          </div>

          {/* Agreements checkboxes */}
          <div className="flex flex-col gap-2 mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="agree-policy"
                checked={signupAgreePolicy}
                onChange={(e) => setSignupAgreePolicy(e.target.checked)}
                className="size-4 mt-0.5 accent-cyan-400 bg-slate-950 border border-cyan-400/20 rounded-sm cursor-pointer"
              />
              <label htmlFor="agree-policy" className="cursor-pointer select-none">
                I agree to{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    notify("Displaying Privacy Policy rules.");
                  }}
                  className="text-cyan-400 hover:underline cursor-pointer border-none bg-transparent inline-block p-0 font-bold"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="agree-news"
                checked={signupAgreeNews}
                onChange={(e) => setSignupAgreeNews(e.target.checked)}
                className="size-4 mt-0.5 accent-cyan-400 bg-slate-950 border border-cyan-400/20 rounded-sm cursor-pointer"
              />
              <label htmlFor="agree-news" className="cursor-pointer select-none">
                I agree to receive verification node newsletters
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <Button
            variant="default"
            onClick={handleSignUp}
            className="w-full text-[10px] font-black tracking-widest h-11 mt-4"
          >
            CREATE NEW ACCOUNT
          </Button>

          {/* Sign In Link */}
          <div className="text-center text-[10px] text-slate-500 font-bold uppercase mt-2">
            Already have GameTrust node?{" "}
            <button
              onClick={() => setView("signin")}
              className="text-cyan-400 hover:underline cursor-pointer border-none bg-transparent text-[10px] font-bold p-0 ml-1"
            >
              Sign In Node
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpView;
