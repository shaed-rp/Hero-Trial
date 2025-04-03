import { Metadata } from 'next';
import mullenOneData from '@/data/mullenOneData.json';
import LinkedInTracking from '../components/MullenOne/LinkedInTracking';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: mullenOneData.siteConfig.title,
    description: mullenOneData.siteConfig.description,
    openGraph: {
      title: mullenOneData.siteConfig.title,
      description: mullenOneData.siteConfig.description,
      url: mullenOneData.siteConfig.url,
      siteName: mullenOneData.siteConfig.title,
      images: [
        {
          url: mullenOneData.siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: mullenOneData.siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: mullenOneData.siteConfig.title,
      description: mullenOneData.siteConfig.description,
      images: [mullenOneData.siteConfig.ogImage],
    },
    icons: {
      icon: mullenOneData.siteConfig.faviconUrl,
      apple: mullenOneData.siteConfig.faviconUrl,
    },
  };
}

export default function MullenOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LinkedInTracking />
      {children}
    </>
  );
}
