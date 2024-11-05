import { idp, sp } from "@/lib/saml";

export async function GET(request) {
  const { id, context } = sp.createLoginRequest(idp, 'redirect');
  console.log(`login request id:`, id);
  console.log(`login request context:`, context);
  return Response.redirect(context);
}
