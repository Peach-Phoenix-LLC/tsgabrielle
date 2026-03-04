import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
};

export function BrandLogo({ href = "/", className = "" }: BrandLogoProps) {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || "/images/logo.png";

  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <img src={logoUrl} alt="tsgabrielle logo" className="h-9 w-auto object-contain" />
      <span className="font-display text-xl text-phoenix">tsgabrielle</span>
    </Link>
  );
}
