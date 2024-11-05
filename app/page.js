'use client';

import useUser from "@/lib/useUser";

export default function Home() {
  const { user } = useUser({
    redirectTo: 'api/login'
  });

  return (
    user?.login ? 
    <div>
      <p>Email: {user?.login}</p>
      <p>SessionInfo:</p>
      <pre>{JSON.stringify(user?.sessionInfo || {}, null, 4)}</pre>
    </div> : <div>
      <p>Logging in...</p>
    </div>
  );
}
