import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Trading OS | Research Terminal', description: 'Research-first trading intelligence workspace.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#080c12' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
