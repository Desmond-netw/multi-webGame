"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Logo from "../../ui_components/logo/Logo";
import { useUser } from "@clerk/nextjs";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  console.log("User:", user);
  console.log("Is Loaded:", isLoaded);
  console.log("Is Signed In:", isSignedIn);
  return (
    <div className="h-screen w-full flex bg-slate-100">
      {/* Left Branding Panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-brand_1-700 text-white p-12">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Logo width={200} height={200} />

          <h2 className="text-brand_1-50 text-center text-md max-w-sm">
            Secure access to the AMSU administrative portal. Authorized
            personnel only.
          </h2>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex flex-1 items-center justify-center px-6">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="
              w-full max-w-md space-y-6 rounded-2xl bg-white 
              px-6 py-10 shadow-xl ring-1 ring-slate-200
              flex flex-col
            "
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                Welcome Back
              </h2>
              <p className="text-slate-500 text-sm">
                Login to your AMSU account
              </p>
            </div>

            <Clerk.GlobalError />

            {/* Email / Username */}
            <Clerk.Field name="identifier">
              <Clerk.Label className="text-sm font-medium text-slate-700">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                className="
                  mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 
                  focus:ring-2 focus:ring-brand_1-500 focus:outline-none
                "
              />
              <Clerk.FieldError />
            </Clerk.Field>

            {/* Password */}
            <Clerk.Field name="password">
              <Clerk.Label className="text-sm font-medium text-slate-700">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                className="
                  mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 
                  focus:ring-2 focus:ring-brand_1-500 focus:outline-none
                "
              />
              <Clerk.FieldError />
            </Clerk.Field>

            {/* Submit Button */}
            <SignIn.Action
              submit
              className="
                w-full bg-brand_1-600 hover:bg-brand_1-700 
                text-white py-3 rounded-lg font-semibold 
                transition-all duration-300 shadow-md
              "
            >
              Sign In
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginPage;
