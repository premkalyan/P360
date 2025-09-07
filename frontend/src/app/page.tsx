import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to P360
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Performance Marketing Platform with Advanced Attribution
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Development Environment</h2>
            <div className="space-y-2 text-left">
              <p className="flex justify-between">
                <span className="text-gray-600">Frontend:</span>
                <span className="text-green-600 font-medium">Running ✓</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Backend:</span>
                <span className="text-green-600 font-medium">http://localhost:8000</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Ready for Development</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
