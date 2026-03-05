interface BrandNameProps {
  className?: string;
  includeSymbol?: '®' | '™' | '';
}

export function BrandName({ className = '', includeSymbol = '®' }: BrandNameProps) {
  return (
    <span className={`font-bold italic lowercase ${className}`}>
      tsgabrielle{includeSymbol}
    </span>
  );
}
