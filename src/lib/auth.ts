export function verifyBearerToken(req: Request): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  console.log("[SAVE_IMAGE_TOKEN]", token);
  if (!token || token !== process.env.NEXT_PUBLIC_SAVE_IMAGE_TOKEN) {
    return null;
  }

  return token;
}
