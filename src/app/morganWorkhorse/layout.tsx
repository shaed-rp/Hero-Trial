import { Metadata } from 'next';
import morganWhData from '@/data/morganWhData.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: morganWhData.siteConfig.title,
    description: morganWhData.siteConfig.description,
    openGraph: {
      title: morganWhData.siteConfig.title,
      description: morganWhData.siteConfig.description,
      url: morganWhData.siteConfig.url,
      siteName: morganWhData.siteConfig.title,
      images: [
        {
          url: morganWhData.siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: morganWhData.siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: morganWhData.siteConfig.title,
      description: morganWhData.siteConfig.description,
      images: [morganWhData.siteConfig.ogImage],
    },
    icons: {
      icon: morganWhData.siteConfig.faviconUrl,
      apple: morganWhData.siteConfig.faviconUrl,
    },
  };
}

export default function MorganWorkhorseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
