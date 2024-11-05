import { idp, sp } from "@/lib/saml";
import getSessionOptions from "@/lib/session";
import { STS } from "@aws-sdk/client-sts";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const sts = new STS();

export async function POST(request) {
  const url = request.nextUrl.clone();
  const body = await request.text();
  const SAMLResponseText = Buffer.from(decodeURIComponent(body.split('&')[0].replace('SAMLResponse=', '')), 'base64').toString('utf-8').replace('<?xml version="1.0" encoding="UTF-8"?>', '');
  const SAMLResponse = Buffer.from(SAMLResponseText, 'utf-8').toString('base64');

  const { extract } = await sp.parseLoginResponse(idp, 'post', {
    body: {
      SAMLResponse
    }
  });

  const userId = extract.nameID;
  const response = await sts.assumeRoleWithSAML({
    RoleSessionName: `${userId}@http://localhost:3000`,
    PrincipalArn: process.env.IDP_PROVIDER_ARN,
    RoleArn: process.env.IAM_ROLE_ARN,
    SAMLAssertion: Buffer.from(SAMLResponse, 'base64').toString('base64'),
    DurationSeconds: 900,
  });

  const {
    Credentials: {
      AccessKeyId: accessKeyId,
      SecretAccessKey: secretAccessKey,
      SessionToken: sessionToken
    }
  } = response;

  const credentials = {
    accessKeyId,
    secretAccessKey,
    sessionToken
  };

  const stsClient = new STS({
    credentials
  });

  const { $metadata, ...iamCallerIdentity } = await stsClient.getCallerIdentity();
  const session = await getIronSession(await cookies(), getSessionOptions())

  session.user = {
    isLoggedIn: true,
    login: extract.nameID,
    sessionInfo: extract,
    iamCallerIdentity,
    credentials
  };

  await session.save();

  url.pathname = '/';
  return Response.redirect(url);
}
