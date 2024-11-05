import { idp, sp } from "@/lib/saml";
import getSessionOptions from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(request) {
  const url = request.nextUrl.clone();

  const raw = (await request.text()).replace('SAMLResponse=', '')
  const SAMLResponse = decodeURIComponent(raw)

  const { extract } = await sp.parseLoginResponse(idp, 'post', {
    body: {
      SAMLResponse
    }
  });

  console.log(JSON.stringify(extract, null, 4));

  const session = await getIronSession(await cookies(), getSessionOptions())

  session.user = {
    isLoggedIn: true,
    login: extract.nameID,
    sessionInfo: extract
  };

  await session.save();

  url.pathname = '/';
  return Response.redirect(url);
}
