import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "❄️Glow In Winter 26 • Resilient Luminosity & Future-Winter Wear by tsgabrielle®",
  description: "❄️Glow In Winter 26 • An Existential Collection. Softness as Strength, Light as Survival. The French Trans Touch™ Reimagines Winter.",
  keywords: [
    "glow in winter 26",
    "resilient luminosity",
    "winter avant-garde",
    "trans-seasonal wear",
    "purple core winter",
    "holographic frost",
    "emotional architecture",
    "winter existentialism",
    "deconstructed warmth",
    "kinetic stillness",
    "quantum ice",
    "vitalist fashion",
    "atmosphere re-engineer",
    "defiant glow",
    "insurgent warmth",
    "singular luminescence",
    "self-igniting style",
    "profound grace",
    "unstoppable force",
    "winter transmuted",
    "future-winter wear",
    "identity theorem",
    "glacial elegance",
    "tsgabrielle winter",
    "aesthetic survival"
  ],
  path: "/glow",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="❄️Glow In Winter 26" 
      slug="glow-in-winter-26" 
      description="❄️Glow In Winter 26: A vanguardist take on winter's resilience, manifesting inner fire and luminous identity."
      longDescription="❄️Glow In Winter 26 is not merely a collection; it’s an existential architecture, a luminous theorem articulated through resilience. It’s a subversion of conventional strength, where softness transmutes into an unyielding force and light becomes the ultimate act of survival. Drawing inspiration from the fractured geometries of frosted panes, the minimalist palette of dawn-streaked skies, and the alchemical heat generated from within during glacial epochs, ❄️Glow In Winter 26 captures the dialectic of winter: the stark stillness and the kinetic spark, the profound silence and the emergent glow, the exterior freeze and the incendiary core. Engineered within the tsgabrielle® purple spectrum, punctuated by stark white, reflective silver, and disruptive holographic interventions, ❄️Glow In Winter 26 unfolds like a deconstructed winter sonnet. Each expression resonates like a vaporous exhalation on sub-zero air—ephemeral, yet imbued with undeniable vitalism. Textures are sculpted to evoke a singular warmth without gravitational mass, while holographic facets shimmer like quantum ice catching the first, piercing vectors of a new sun. The universe of ❄️Glow In Winter 26 extends dynamically into forms that not only clad the body but also re-engineer the atmosphere, forging a winter glow that vibrates long after the initial encounter. Nothing is superfluous; every element is a calculated declaration. This realm embodies The French Trans Touch™: warmth as an insurgent act, identity as a singular luminescence, and the audacious will to generate light even when the external world threatens to calcify. ❄️Glow In Winter 26 is for the self-igniting—those who radiate with quiet intensity, who navigate survival with profound grace, who rise with an almost imperceptible, yet unstoppable, force. This is winter transmuted through purple—essential, incandescent, and profoundly, defiantly human."
      slogans={["Ignite. Evolve. Thrive. In the cold.","Glow beyond the frost.","Winter: Re-coded.","Purple: The warmth imperative.","The French Trans Touch™, glacial glow.","Radiate softly. Resonate profoundly.","Light in the stark silence."]}
    />
  );
}
