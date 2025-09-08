'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Simple Navigation */}
      <nav style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>P360 Dashboard</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/dashboard/campaigns" style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}>
              Campaigns
            </Link>
            <Link href="/" style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#374151',
              textDecoration: 'none',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontWeight: '500'
            }}>
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            Welcome to P360
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
            Your Performance Marketing Platform Dashboard
          </p>
        </div>

        {/* Dashboard Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <Link href="/dashboard/campaigns" style={{ textDecoration: 'none' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '2px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                Campaign Management
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                View and manage your advertising campaigns with real-time performance metrics.
              </p>
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#f0fdf4',
                color: '#15803d',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                ✅ P360-67 FIXED
              </div>
            </div>
          </Link>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '32px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            opacity: '0.6'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Audience Management
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Build and manage high-performing audience segments with intelligent targeting.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              Coming Soon
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '32px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            opacity: '0.6'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Analytics & Reporting
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Get instant performance metrics and actionable insights to optimize campaigns.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              Coming Soon
            </div>
          </div>
        </div>

        {/* Success Notice */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '2px solid #bbf7d0',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
            🎉 P360-67 Successfully Deployed!
          </h3>
          <p style={{ fontSize: '16px', color: '#15803d', marginBottom: '16px' }}>
            The campaigns UI has been fixed and is running in Docker. Ready for testing!
          </p>
          <Link 
            href="/dashboard/campaigns"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#15803d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Test Fixed Campaigns UI →
          </Link>
        </div>
      </main>
    </div>
  );
}