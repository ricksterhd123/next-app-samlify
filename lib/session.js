export default function getSessionOptions() {
  const ttl = Number(process.env.COOKIE_TTL);

  return {
    password: process.env.COOKIE_PASSWORD,
    cookieName: 'sessionId',
    ttl,
    cookieOptions: {
      maxAge: ttl - 10,
    }
  };
}
