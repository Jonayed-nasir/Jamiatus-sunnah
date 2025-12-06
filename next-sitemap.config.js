/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jamiatussunnah.netlify.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/notfoundpage'], // যেগুলো index করতে চাও না
  transform: async (config, path) => {
    // NavItem অনুযায়ী priority সেট করা
    let priority = 0.7;
    if (path === '/') priority = 1.0;
    else if (path === '/about' || path === '/academic') priority = 0.9;
    else if (path === '/admission' || path === '/notice') priority = 0.8;
    else if (path === '/donate' || path === '/allnotice' || path === '/message' || path === '/fatwa') priority = 0.7;

    return {
      loc: path, // URL path
      changefreq: 'weekly',
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};
