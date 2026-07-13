import { Helmet } from "react-helmet-async";

const SITE = "Zeeshan Haider";
const BASE_URL = "https://zynkit.tech";
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "Designer & Full-Stack Developer based in Lahore, PK. I design, build, and ship products that look great and work fast.";

interface PageMetaProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function PageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = OG_IMAGE,
  noIndex = false,
}: PageMetaProps) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Designer & Full-Stack Developer`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* OpenGraph */}
      <meta property="og:site_name" content="Zynk" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@zeeshanh" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
