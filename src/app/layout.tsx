import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Memory & Challenge Game | Test Your Photographic Memory',
  description: 'Test your photographic memory with timed image observation and sequential challenges powered by Next.js & Supabase.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
