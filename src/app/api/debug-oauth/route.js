export async function GET() {
  return Response.json({
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecretExists: !!process.env.GOOGLE_CLIENT_SECRET,
    googleClientSecretPreview: process.env.GOOGLE_CLIENT_SECRET?.substring(0, 10) + "...",
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nodeEnv: process.env.NODE_ENV,
  });
}
