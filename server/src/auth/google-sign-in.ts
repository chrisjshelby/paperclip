/**
 * Google sign-in through Better Auth's built-in `socialProviders.google`.
 *
 * Enabled only when the operator supplies both OAuth client credentials, so an
 * instance without them exposes no Google surface. The redirect URI to register
 * with Google is `<public base URL>/api/auth/callback/google`.
 */
export function resolveGoogleSocialProvider(
  input: { disableSignUp: boolean },
  env: NodeJS.ProcessEnv = process.env,
) {
  const clientId = env.PAPERCLIP_AUTH_GOOGLE_CLIENT_ID?.trim();
  const clientSecret = env.PAPERCLIP_AUTH_GOOGLE_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return null;
  // `disableSignUp`, not `disableImplicitSignUp`: Better Auth lets the client
  // bypass the implicit variant with `requestSignUp: true`, which would reopen
  // sign-up on an instance that locked it.
  return { clientId, clientSecret, disableSignUp: input.disableSignUp };
}

export function isGoogleSignInEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return resolveGoogleSocialProvider({ disableSignUp: false }, env) !== null;
}
