const domain = process.env.NEXT_PUBLIC_DOMAIN;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
