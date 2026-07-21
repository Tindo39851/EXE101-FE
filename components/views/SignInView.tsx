import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignInView() {
  const {
    emailDraft,
    setEmailDraft,
    passwordDraft,
    setPasswordDraft,
    rememberMe,
    setRememberMe,
    setIsLoggedIn,
    setView,
    notify,
    currentUser,
  } = useAppState();

  const handleSignIn = () => {
    if (emailDraft.trim() === "" || passwordDraft.trim() === "") {
      notify("Error: Email and password fields are required.");
      return;
    }
    setIsLoggedIn(true);
    setView("overview");
    notify(`Signed in successfully as ${currentUser.name}!`);
  };

  return (
    <section className="flex justify-center items-center py-16 font-mono select-none">
      <div className="w-full max-w-lg bg-slate-950/95 border border-cyan-400/30 p-10 flex flex-col items-center relative hover:shadow-[0_0_24px_rgba(0,246,255,0.15)] transition-all duration-300">
        {/* Top cyan bar */}
        <div className="absolute left-[1px] right-[1px] top-[1px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.6)]" />

        <span className="text-cyan-400 text-[8px] font-black tracking-widest uppercase mb-2">
          SECURE CREDENTIAL CHANNEL // PORT_443
        </span>

        <h3 className="text-slate-100 text-2xl font-black tracking-widest mb-8 uppercase text-center">
          LOGIN GATEWAY
        </h3>

        {/* Form elements */}
        <div className="w-full flex flex-col gap-5">
          <Input
            label="EMAIL ADDRESS"
            type="email"
            placeholder="Enter your registered email..."
            value={emailDraft}
            onChange={(e) => setEmailDraft(e.target.value)}
          />

          <Input
            label="ACCOUNT PASSWORD"
            type="password"
            placeholder="••••••••••••"
            value={passwordDraft}
            onChange={(e) => setPasswordDraft(e.target.value)}
          />

          {/* Remember me & forgot password */}
          <div className="flex justify-between items-center w-full text-[10px] mt-1.5 font-bold tracking-wider uppercase">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none hover:text-slate-350 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 border border-cyan-400/20 bg-transparent text-cyan-400 focus:ring-0 focus:outline-none accent-cyan-400 cursor-pointer"
              />
              <span>Remember Session</span>
            </label>

            <button
              onClick={() => notify("Password recovery sequence initiated.")}
              className="text-cyan-400 hover:underline cursor-pointer border-none bg-transparent text-[10px] font-bold p-0"
            >
              Recover password?
            </button>
          </div>

          {/* Sign In Trigger */}
          <Button
            variant="default"
            onClick={handleSignIn}
            className="w-full text-[10px] font-black tracking-widest h-11 mt-4"
          >
            SIGN IN ACCOUNT
          </Button>

          {/* Switch to Sign Up */}
          <div className="text-center text-[10px] text-slate-500 font-bold uppercase mt-2">
            Don’t have GameTrust node?{" "}
            <button
              onClick={() => setView("signup")}
              className="text-cyan-400 hover:underline cursor-pointer border-none bg-transparent text-[10px] font-bold p-0 ml-1"
            >
              Sign Up Node
            </button>
          </div>

          {/* Separator line */}
          <div className="flex items-center justify-between w-full my-4 select-none">
            <div className="flex-1 h-[1px] bg-cyan-400/10" />
            <span className="text-slate-650 text-[9px] font-black uppercase mx-3">OR OAUTH AUTHENTICATION</span>
            <div className="flex-1 h-[1px] bg-cyan-400/10" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setView("overview");
              notify("Logged in using Google identity system.");
            }}
            className="w-full h-11 bg-white hover:bg-slate-100 text-black text-[10px] font-black tracking-widest flex justify-center items-center gap-2.5 transition duration-300 border-none cursor-pointer uppercase"
          >
            <svg className="size-4 shrink-0" viewBox="0 0 24 24">
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
            <span>Google Identity</span>
          </button>

          {/* Facebook Sign In */}
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setView("overview");
              notify("Logged in using Facebook identity system.");
            }}
            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black tracking-widest flex justify-center items-center gap-2.5 transition duration-300 border-none cursor-pointer uppercase"
          >
            <svg className="size-4 shrink-0 fill-current text-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook Node</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignInView;
