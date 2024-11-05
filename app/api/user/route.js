import getSessionOptions from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(request) {
  const session = await getIronSession(await cookies(), getSessionOptions());

  if (!session?.user) {
    return Response.json({
      isLoggedIn: false
    });
  } else {
    return Response.json(session.user);
  }
}
