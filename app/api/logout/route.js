import { idp, sp } from "@/lib/saml";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(request) {
  const session = await getIronSession(await cookies(), { password: process.env.COOKIE_PASSWORD, cookieName: 'sessionId' });

  const { id, context } = sp.createLogoutRequest(idp, 'redirect', session?.user?.login);
  console.log(`logout request id:`, id);
  console.log(`logout request context:`, context);

  return Response.redirect(context);
}
