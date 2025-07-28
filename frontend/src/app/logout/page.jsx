'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000); // redirect after 3 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">👋 Logged Out Successfully</h1>
        <p className="text-lg text-gray-700 mb-2">
          You've been signed out of your Allpac account.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to login...
        </p>
      </div>
    </div>
  );
}
