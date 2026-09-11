import { Agentation } from 'agentation';
import SmoothScroll from './components/SmoothScroll';
import './globals.css';

export const metadata = {
  title: 'Singularity',
  description: 'Next.js sample project with Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
