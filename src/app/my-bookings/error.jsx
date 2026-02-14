"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("My Bookings Error:", error);
  }, [error]);

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          My <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Bookings</span>
        </h1>
      </div>
      
      <div className="card bg-error/10 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title text-error justify-center text-2xl">
            ⚠️ Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn&apos;t load your bookings. This might be a temporary issue.
          </p>
          <div className="card-actions justify-center gap-4">
            <button 
              onClick={reset}
              className="btn btn-primary"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn btn-outline"
            >
              Go Home
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
