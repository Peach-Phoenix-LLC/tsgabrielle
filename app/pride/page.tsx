import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pride 26 • Quantum Identity & Visionary by tsgabrielle®",
  description: "Pride 26 • A Radical Universe of Identity, Hyper-Visibility, And The French Trans Touch™ • Experience Quantum Self-Expression.",
  keywords: [
    "pride 26 vanguard",
    "quantum identity",
    "lgbtqia+ futurism",
    "trans visibility",
    "purple frequency",
    "holographic truth",
    "avant-garde pride",
    "emotional architecture",
    "radical self-expression",
    "pride manifesto",
    "cosmic pride",
    "disruptive elegance",
    "hyper-visible fashion",
    "tsgabrielle universe",
    "fluid aesthetics",
    "anti-stasis apparel",
    "resonant identity",
    "alchemical self",
    "fashion revolution",
    "luminous existence",
    "queer theory fashion",
    "new dawn style",
    "emotional frequency",
    "defiance couture",
    "pride as power"
  ],
  path: "/pride",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Pride 26" 
      slug="pride-26" 
      description="Pride 26: A radical universe of identity, hyper-visibility, and the incandescent truth of self, forged with vanguardist elegance."
      longDescription="Pride 26 isn't a mere collection; it's an emergent universe, sculpted by an audacious identity, hyper-visibility, and the incandescent core of living your truth. Forged within the signature tsgabrielle® purple spectrum, punctuated by iridescent holographic interventions, Pride 26 unfurls as a radical manifesto: its poetry a potent whisper, its presence an undeniable force, its devotion to authenticity an unshakeable doctrine. This universe is architected from raw, lived experience—the audacious tenderness of self-genesis, the disruptive electricity of being seen, the unyielding resilience forged in the crucible of doubt, and the supernova of joy that ignites when your own light becomes your undisputed mirror. Every single expression within Pride 26 carries the vibrational frequency of pride: layered, complex, and blindingly luminous. Subversive curves collide with precision lines, creating a kinetic visual syntax that balances vulnerable revelation with unassailable strength. The holographic accents aren't just shimmer; they're quantum echoes of memory—shifting, evolving, refusing all stasis. Pride 26 detonates naturally into forms that amplify its ethos, allowing pride to transcend mere adornment, becoming the very atmosphere you command. This universe embodies The French Trans Touch™: identity as the ultimate artifact, visibility as an engine of power, and pride as a perpetual act of cosmic unfolding. Pride 26 is for those who wield their truth with both molten tenderness and unbridled fire—for the revolutionaries who carved their own visibility, for those in the alchemical process of self-love, and for the celestial beings whose radiance vectors a new dawn. This is pride, elevated into pure frequency—unfiltered, resonant, and definitely alive."
      slogans={["Pride: The ultimate frequency, in purple.","Visible. Potent. Undeniably You.","The French Trans Touch™: Code Pride.","Identity is the new infinite.","Manifest your truth.","Pride, unceasing.","Radiate with pride."]}
    />
  );
}
