import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Firebase Auth login logic here
    // After successful login:
    router.push('/welcome');
  };

  return (
    <div className="parchment p-8">
      <h1 className="text-4xl mb-6">Login to ListToBid</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-emerald ml-4">
          Login
        </button>
      </form>
    </div>
  );
}