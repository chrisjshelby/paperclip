import { describe, expect, it } from "vitest";
import { isGoogleSignInEnabled, resolveGoogleSocialProvider } from "../auth/google-sign-in.js";

const credentials = {
  PAPERCLIP_AUTH_GOOGLE_CLIENT_ID: "client-id",
  PAPERCLIP_AUTH_GOOGLE_CLIENT_SECRET: "client-secret",
};

describe("Google sign-in provider", () => {
  it("stays off unless both OAuth client credentials are set", () => {
    expect(resolveGoogleSocialProvider({ disableSignUp: false }, {})).toBeNull();
    expect(resolveGoogleSocialProvider(
      { disableSignUp: false },
      { PAPERCLIP_AUTH_GOOGLE_CLIENT_ID: "client-id", PAPERCLIP_AUTH_GOOGLE_CLIENT_SECRET: "  " },
    )).toBeNull();
    expect(isGoogleSignInEnabled({})).toBe(false);
    expect(isGoogleSignInEnabled(credentials)).toBe(true);
  });

  it("carries the instance sign-up lock as the non-bypassable provider option", () => {
    const provider = resolveGoogleSocialProvider({ disableSignUp: true }, credentials);
    expect(provider).toEqual({ clientId: "client-id", clientSecret: "client-secret", disableSignUp: true });
    expect(provider).not.toHaveProperty("disableImplicitSignUp");
  });
});
