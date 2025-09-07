import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">P360 Dashboard</h1>
            </div>
            <Button variant="outline" size="sm">
              <Link href="/auth/login">Logout (Demo)</Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Welcome to P360!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Authentication UI Components Successfully Implemented
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ✅ Story P360-19 Complete
            </h3>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <p>✓ Authentication Layout Component</p>
              <p>✓ Login Form with Validation</p>
              <p>✓ Signup Form with Validation</p>
              <p>✓ Reusable UI Components (Button, Input)</p>
              <p>✓ Responsive Design</p>
              <p>✓ Figma Design Integration</p>
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <Button variant="outline" size="md">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
            <Button variant="outline" size="md">
              <Link href="/auth/signup">Back to Signup</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
