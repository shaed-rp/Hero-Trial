import { Metadata } from 'next';
import streetrodData from '@/data/streetrodData.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: streetrodData.siteConfig.title,
    description: streetrodData.siteConfig.description,
    openGraph: {
      title: streetrodData.siteConfig.title,
      description: streetrodData.siteConfig.description,
      url: streetrodData.siteConfig.url,
      siteName: streetrodData.siteConfig.title,
      images: [
        {
          url: streetrodData.siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: streetrodData.siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: streetrodData.siteConfig.title,
      description: streetrodData.siteConfig.description,
      images: [streetrodData.siteConfig.ogImage],
    },
    icons: {
      icon: streetrodData.siteConfig.faviconUrl,
      apple: streetrodData.siteConfig.faviconUrl,
    },
  };
}

export default function StreetrodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
