
import { getSiteConfig } from '../lib/api';
import '../app/globals.scss'; // Using SCSS for global styles

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  // This metadata applies to the whole site
  return {
    title: { 
      default: siteConfig.defaultSeo.metaTitle,
      template: `%s | ${siteConfig.siteName}`,
    },
    description: siteConfig.defaultSeo.metaDescription,
    openGraph: siteConfig.defaultSeo.og,
    twitter: siteConfig.defaultSeo.twitter,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteConfig = await getSiteConfig();

  // Inline JSON-LD for WebSite Schema
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteConfig.siteName,
    'url': siteConfig.baseUrl,
    // Potential search action can be added here later
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
