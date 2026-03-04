import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  light?: boolean;
};

export function BrandLogo({ href = "/", className = "", light = false }: BrandLogoProps) {
  const logoUrl = "/images/logo-icon.png";

  return (
    <Link href={href} className={`inline-flex items-center ${className}`.trim()}>
      <img 
        src={logoUrl} 
        alt="logo" 
        className="h-10 w-auto object-contain"
        onError={(e) => (e.currentTarget.style.display = 'none')} 
      />
    </Link>
  );
}
