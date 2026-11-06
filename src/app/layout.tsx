import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'จำให้ MAN | เกมประลองความจำภาพถ่าย',
  description: 'เกมประลองความจำภาพถ่าย "จำให้ MAN" ทดสอบความจำแบบจับเวลา พร้อมตอบคำถามและภารกิจท้าทาย สไตล์งานวัด',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
