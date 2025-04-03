import { Metadata } from 'next';
import peterbilt520ev from '@/data/peterbilt520ev.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: peterbilt520ev.siteConfig.title,
    description: peterbilt520ev.siteConfig.description,
    openGraph: {
      title: peterbilt520ev.siteConfig.title,
      description: peterbilt520ev.siteConfig.description,
      url: peterbilt520ev.siteConfig.url,
      siteName: peterbilt520ev.siteConfig.title,
      images: [
        {
          url: peterbilt520ev.siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: peterbilt520ev.siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: peterbilt520ev.siteConfig.title,
      description: peterbilt520ev.siteConfig.description,
      images: [peterbilt520ev.siteConfig.ogImage],
    },
    icons: {
      icon: peterbilt520ev.siteConfig.faviconUrl,
      apple: peterbilt520ev.siteConfig.faviconUrl,
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
