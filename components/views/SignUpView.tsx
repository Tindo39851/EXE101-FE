import React from "react";
import { useAppState } from "@/hooks/use-app-state";

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
    notify
  } = useAppState();

  return (
    <section className="flex justify-center items-center py-12">
      <div className="w-[1160px] bg-gray-950/90 shadow-[0px_0px_5px_1px_rgba(0,255,255,0.80)] outline outline-1 outline-cyan-400/50 p-12 flex flex-col items-center">
        
        <h3 className="text-white text-3xl font-normal font-['Orbitron'] tracking-wider mb-12 uppercase">
          Welcome to GAMETRUST
        </h3>

        {/* Form container */}
        <div className="w-[566px] flex flex-col gap-6">
          
          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium font-['Rajdhani'] uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full h-14 bg-slate-900 border border-cyan-400 text-white px-4 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 text-lg placeholder:text-slate-650"
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium font-['Rajdhani'] uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full h-14 bg-slate-900 border border-cyan-400 text-white px-4 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 text-lg placeholder:text-slate-650"
            />
          </div>

          {/* Confirm Password input */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium font-['Rajdhani'] uppercase tracking-wider">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              className="w-full h-14 bg-slate-900 border border-cyan-400 text-white px-4 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 text-lg placeholder:text-slate-650"
            />
          </div>

          {/* Account name input */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium font-['Rajdhani'] uppercase tracking-wider">
              Account name
            </label>
            <input
              type="text"
              placeholder="e.g. ghost_operator"
              value={signupAccountName}
              onChange={(e) => setSignupAccountName(e.target.value)}
              className="w-full h-14 bg-slate-900 border border-cyan-400 text-white px-4 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 text-lg placeholder:text-slate-650"
            />
          </div>

          {/* Full name input */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium font-['Rajdhani'] uppercase tracking-wider">
              Full name
            </label>
            <input
              type="text"
              placeholder="Enter your full name..."
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
              className="w-full h-14 bg-slate-900 border border-cyan-400 text-white px-4 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 text-lg placeholder:text-slate-650"
            />
          </div>

          {/* Phone number input */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-medium font-['Rajdhani'] uppercase tracking-wider">
              Phone number (Optional)
            </label>
            <input
              type="tel"
              placeholder="+84 90 123 4567"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              className="w-full h-14 bg-slate-900 border border-cyan-400 text-white px-4 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 text-lg placeholder:text-slate-650"
            />
          </div>

          {/* Mock reCAPTCHA Widget */}
          <div className="w-[300px] h-[78px] mx-auto bg-zinc-900 border border-zinc-700 flex items-center justify-between px-3.5 select-none mt-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recaptcha-signup"
                checked={signupCaptchaChecked}
                onChange={(e) => setSignupCaptchaChecked(e.target.checked)}
                className="size-6 border border-zinc-600 bg-zinc-950 focus:ring-0 focus:outline-none accent-cyan-400 cursor-pointer"
              />
              <label htmlFor="recaptcha-signup" className="text-white text-sm font-sans cursor-pointer">
                I'm not a robot
              </label>
            </div>
            <div className="flex flex-col items-center">
              <svg className="size-8 text-cyan-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span className="text-[8px] text-slate-500 font-sans mt-0.5">reCAPTCHA</span>
              <span className="text-[6px] text-slate-400 font-sans">Privacy - Terms</span>
            </div>
          </div>

          {/* Privacy policy checkbox */}
          <div className="flex items-start gap-3 text-xl font-['Rajdhani'] text-white mt-4 select-none">
            <input
              type="checkbox"
              id="agree-policy"
              checked={signupAgreePolicy}
              onChange={(e) => setSignupAgreePolicy(e.target.checked)}
              className="size-6 border border-cyan-400 bg-transparent text-cyan-400 focus:ring-0 focus:ring-offset-0 focus:outline-none rounded-none accent-cyan-400 cursor-pointer mt-1 shrink-0"
            />
            <label htmlFor="agree-policy" className="cursor-pointer">
              I have read and agree to{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  notify("Displaying Privacy Policy rules.");
                }}
                className="text-cyan-400 hover:underline cursor-pointer border-none bg-transparent inline-block font-semibold"
              >
                GameTrust’s Privacy Policy
              </button>
            </label>
          </div>

          {/* Receive news checkbox */}
          <div className="flex items-start gap-3 text-xl font-['Rajdhani'] text-white select-none">
            <input
              type="checkbox"
              id="agree-news"
              checked={signupAgreeNews}
              onChange={(e) => setSignupAgreeNews(e.target.checked)}
              className="size-6 border border-cyan-400 bg-transparent text-cyan-400 focus:ring-0 focus:ring-offset-0 focus:outline-none rounded-none accent-cyan-400 cursor-pointer mt-1 shrink-0"
            />
            <label htmlFor="agree-news" className="cursor-pointer">
              I agree to receive news from GameTrust
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={() => {
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
            }}
            className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-white text-3xl font-semibold font-['Orbitron'] flex justify-center items-center cursor-pointer transition border-none mt-4 uppercase select-none"
          >
            Sign Up
          </button>

          {/* Sign In Link */}
          <div className="text-center text-xl font-['Rajdhani'] text-white mt-4 select-none relative inline-block mx-auto">
            Already have GameTrust account?{" "}
            <button
              onClick={() => setView("signin")}
              className="text-cyan-400 hover:underline cursor-pointer border-none bg-transparent text-xl font-['Rajdhani'] inline-block"
            >
              Sign in
            </button>
            <div className="w-14 h-px bg-cyan-400 absolute bottom-0 right-[4px]"></div>
          </div>

          {/* Separator */}
          <div className="flex items-center justify-between w-full my-6 select-none">
            <div className="w-[240px] h-px bg-cyan-400"></div>
            <span className="text-white text-3xl font-normal font-['Rajdhani']">Or</span>
            <div className="w-[240px] h-px bg-cyan-400"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setView("overview");
              notify("Registered and logged in using Google identity system.");
            }}
            className="w-full h-14 bg-white hover:bg-slate-100 text-black text-xl font-semibold font-['Rajdhani'] flex justify-center items-center gap-3 cursor-pointer transition border-none"
          >
            <svg className="size-6 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.842.95 15.12 0 12 0 7.303 0 3.287 2.68 1.332 6.58l3.934 3.185z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.275c0-.825-.075-1.62-.215-2.385H12v4.51h6.445a5.516 5.516 0 0 1-2.395 3.62l3.725 2.885c2.18-2.01 3.72-4.96 3.72-8.63z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235A7.002 7.002 0 0 1 4.91 12c0-.79.135-1.55.356-2.265L1.332 6.55A11.966 11.966 0 0 0 0 12c0 2.01.5 3.91 1.378 5.585l3.888-3.35z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.075 7.96-2.925l-3.725-2.885c-1.03.69-2.35 1.1-4.235 1.1-3.265 0-6.035-2.205-7.02-5.185l-3.92 3.03C3.045 21.05 7.15 24 12 24z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Facebook Sign In */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setView("overview");
              notify("Registered and logged in using Facebook identity system.");
            }}
            className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white text-xl font-semibold font-['Rajdhani'] flex justify-center items-center gap-3 cursor-pointer transition border-none"
          >
            <svg className="size-6 shrink-0 fill-current text-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>

        </div>

      </div>
    </section>
  );
}
export default SignUpView;
