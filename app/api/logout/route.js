import { idp, sp } from "@/lib/saml";
import getSessionOptions from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(request) {
  const session = await getIronSession(await cookies(), getSessionOptions())

  const { id, context } = sp.createLogoutRequest(idp, 'redirect', session?.user?.login);
  console.log(`logout request id:`, id);
  console.log(`logout request context:`, context);

  session.destroy();
  return Response.redirect(context);
}
