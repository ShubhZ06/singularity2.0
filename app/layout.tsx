import { Agentation } from 'agentation';
import SmoothScroll from './components/SmoothScroll';
import 'lenis/dist/lenis.css';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Disable browser scroll restoration synchronously before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              try {
                Object.keys(sessionStorage).forEach(function(k) {
                  if (k.indexOf('scroll') !== -1 || k.indexOf('next') !== -1) {
                    sessionStorage.removeItem(k);
                  }
                });
              } catch(e) {}
              // opacity:0 hides ALL visual scroll jumps (overflow:hidden only stops
              // user-initiated scroll but doesn't hide programmatic window.scrollTo calls)
              document.documentElement.style.opacity = '0';
              document.documentElement.style.overflow = 'hidden';
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
