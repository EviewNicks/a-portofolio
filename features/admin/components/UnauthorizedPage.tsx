import Link from 'next/link';
import { ShieldX } from 'lucide-react';

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <ShieldX size={48} className="text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
        <p className="text-gray-400 max-w-sm">
          You don&apos;t have permission to access this page.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
