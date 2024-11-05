import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(request) {
  const session = await getIronSession(await cookies(), { password: process.env.COOKIE_PASSWORD, cookieName: 'sessionId' });
  session.destroy();
}
