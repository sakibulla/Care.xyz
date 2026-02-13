export default function sitemap() {
  const baseUrl = 'https://care-xyz.vercel.app';
  
  const routes = [
    '',
    '/services',
    '/products',
    '/blog',
    '/contact',
    '/my-bookings',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
