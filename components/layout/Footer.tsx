import Link from "next/link";

const follow = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "X (Twitter)",
  "Pinterest",
  "LinkedIn",
  "Snapchat"
];

const worldwide = ["Store Directory.", "Stores Directory", "USA"];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-peach/50 bg-white">
      <div className="container-luxe grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-phoenix">tsgabrielle</p>
          <p className="mt-2 text-sm text-night/80">Inclusive luxury, globally shipped.</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">📱 Follow tsgabrielle®</h3>
          <ul className="space-y-1 text-sm">
            {follow.map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">👤 tsgabrielle® Worldwide</h3>
          <ul className="space-y-1 text-sm">
            {worldwide.map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
