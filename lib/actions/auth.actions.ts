"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    //Call better-auth
    const response = await auth.api.signUpEmail({
      body: { email: email, password: password, name: fullName },
    });

    if (response) {
      try {
        await inngest.send({
          name: "app/user.created",
          data: {
            email: email,
            name: fullName,
            country,
            investmentGoals,
            preferredIndustry,
            riskTolerance,
          },
        });
      } catch (error) {
        console.error("Failed to send welcome mail", error);
      }
    }

    return { success: true, data: response };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message.includes("duplicate")
          ? "Email already exists"
          : "Failed to create account, please try again",
      };
    }
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.log("Sign out failed", error);
    return { success: false, error: "Sign out failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    //Call better-auth
    const response = await auth.api.signInEmail({
      body: { email: email, password: password },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Sign in failed", error);
    return { success: false, error: "Sign in failed. Please try again." };
  }
};
