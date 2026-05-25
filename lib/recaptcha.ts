/**
 * Verify a Google reCAPTCHA token server-side.
 * Returns true if reCAPTCHA isn't configured (so dev/test still works).
 *
 * Set RECAPTCHA_SECRET_KEY in env. Pair with NEXT_PUBLIC_RECAPTCHA_SITE_KEY
 * for the client widget.
 */
export async function verifyCaptcha(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // not configured -> skip
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success: boolean; score?: number };
    // v2 invisible returns just `success`. v3 returns `score` too — accept >= 0.5.
    if (typeof data.score === "number") return data.success && data.score >= 0.5;
    return data.success;
  } catch {
    return false;
  }
}
