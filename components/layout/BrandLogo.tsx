import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  light?: boolean;
};

export function BrandLogo({ href = "/", className = "", light = false }: BrandLogoProps) {
  const logoUrl = light 
    ? "/images/tsgabrielle-logo-white.png" 
    : "/images/tsgabrielle-logo.png";

  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <img 
        src={logoUrl} 
        alt="tsgabrielle logo" 
        className="h-10 w-auto object-contain"
        onError={(e) => (e.currentTarget.style.display = 'none')} 
      />
    </Link>
  );
}
