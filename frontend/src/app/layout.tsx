import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'P360 - Performance Marketing Platform',
  description: 'Advanced attribution and audience management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
