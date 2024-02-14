import '@radix-ui/themes/styles.css';
import "./theme-config.css"
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from '@radix-ui/themes';
import Navbar from "./Navbar/page";
import AuthProvider from './auth/Provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Issue Tracker App - Easily Manage Your Project Issues",
  description: "A user-friendly application to create, read, update, and delete project issues effortlessly.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={inter.variable}>
        <AuthProvider>
          <Theme appearance="light" accentColor="violet">
            <Navbar />
            <main className='p-5'>
              < Container>

                {children}

              </Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
