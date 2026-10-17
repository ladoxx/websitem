import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yönetim Paneli | FMKAL Studio',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
