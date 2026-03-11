const fs = require('fs');

const collections = [
  {
    folder: 'app/pride',
    slug: 'pride-26',
    title: '🌈 Pride 26',
    metaTitle: '🌈 Pride 26 • Quantum Identity & Visionary by tsgabrielle®',
    metaDescription: '🌈 Pride 26 • A Radical Universe of Identity, Hyper-Visibility, And The French Trans Touch™ • Experience Quantum Self-Expression.',
    shortDesc: '🌈 Pride 26: A radical universe of identity, hyper-visibility, and the incandescent truth of self, forged with vanguardist elegance.',
    longDesc: "🌈 Pride 26 isn't a mere collection; it's an emergent universe, sculpted by an audacious identity, hyper-visibility, and the incandescent core of living your truth. Forged within the signature tsgabrielle® purple spectrum, punctuated by iridescent holographic interventions, 🌈 Pride 26 unfurls as a radical manifesto: its poetry a potent whisper, its presence an undeniable force, its devotion to authenticity an unshakeable doctrine. This universe is architected from raw, lived experience—the audacious tenderness of self-genesis, the disruptive electricity of being seen, the unyielding resilience forged in the crucible of doubt, and the supernova of joy that ignites when your own light becomes your undisputed mirror. Every single expression within 🌈 Pride 26 carries the vibrational frequency of pride: layered, complex, and blindingly luminous. Subversive curves collide with precision lines, creating a kinetic visual syntax that balances vulnerable revelation with unassailable strength. The holographic accents aren't just shimmer; they're quantum echoes of memory—shifting, evolving, refusing all stasis. 🌈 Pride 26 detonates naturally into forms that amplify its ethos, allowing pride to transcend mere adornment, becoming the very atmosphere you command. This universe embodies The French Trans Touch™: identity as the ultimate artifact, visibility as an engine of power, and pride as a perpetual act of cosmic unfolding. 🌈 Pride 26 is for those who wield their truth with both molten tenderness and unbridled fire—for the revolutionaries who carved their own visibility, for those in the alchemical process of self-love, and for the celestial beings whose radiance vectors a new dawn. This is pride, elevated into pure frequency—unfiltered, resonant, and definitely alive.",
    slogans: ["Pride: The ultimate frequency, in purple.", "Visible. Potent. Undeniably You.", "The French Trans Touch™: Code Pride.", "Identity is the new infinite.", "Manifest your truth.", "Pride, unceasing.", "Radiate with pride."],
    tags: "pride 26 vanguard, quantum identity, lgbtqia+ futurism, trans visibility, purple frequency, holographic truth, avant-garde pride, emotional architecture, radical self-expression, pride manifesto, cosmic pride, disruptive elegance, hyper-visible fashion, tsgabrielle universe, fluid aesthetics, anti-stasis apparel, resonant identity, alchemical self, fashion revolution, luminous existence, queer theory fashion, new dawn style, emotional frequency, defiance couture, pride as power"
  },
  {
    folder: 'app/glow',
    slug: 'glow-in-winter-26',
    title: '❄️Glow In Winter 26',
    metaTitle: '❄️Glow In Winter 26 • Resilient Luminosity & Future-Winter Wear by tsgabrielle®',
    metaDescription: '❄️Glow In Winter 26 • An Existential Collection. Softness as Strength, Light as Survival. The French Trans Touch™ Reimagines Winter.',
    shortDesc: "❄️Glow In Winter 26: A vanguardist take on winter's resilience, manifesting inner fire and luminous identity.",
    longDesc: "❄️Glow In Winter 26 is not merely a collection; it’s an existential architecture, a luminous theorem articulated through resilience. It’s a subversion of conventional strength, where softness transmutes into an unyielding force and light becomes the ultimate act of survival. Drawing inspiration from the fractured geometries of frosted panes, the minimalist palette of dawn-streaked skies, and the alchemical heat generated from within during glacial epochs, ❄️Glow In Winter 26 captures the dialectic of winter: the stark stillness and the kinetic spark, the profound silence and the emergent glow, the exterior freeze and the incendiary core. Engineered within the tsgabrielle® purple spectrum, punctuated by stark white, reflective silver, and disruptive holographic interventions, ❄️Glow In Winter 26 unfolds like a deconstructed winter sonnet. Each expression resonates like a vaporous exhalation on sub-zero air—ephemeral, yet imbued with undeniable vitalism. Textures are sculpted to evoke a singular warmth without gravitational mass, while holographic facets shimmer like quantum ice catching the first, piercing vectors of a new sun. The universe of ❄️Glow In Winter 26 extends dynamically into forms that not only clad the body but also re-engineer the atmosphere, forging a winter glow that vibrates long after the initial encounter. Nothing is superfluous; every element is a calculated declaration. This realm embodies The French Trans Touch™: warmth as an insurgent act, identity as a singular luminescence, and the audacious will to generate light even when the external world threatens to calcify. ❄️Glow In Winter 26 is for the self-igniting—those who radiate with quiet intensity, who navigate survival with profound grace, who rise with an almost imperceptible, yet unstoppable, force. This is winter transmuted through purple—essential, incandescent, and profoundly, defiantly human.",
    slogans: ["Ignite. Evolve. Thrive. In the cold.", "Glow beyond the frost.", "Winter: Re-coded.", "Purple: The warmth imperative.", "The French Trans Touch™, glacial glow.", "Radiate softly. Resonate profoundly.", "Light in the stark silence."],
    tags: "glow in winter 26, resilient luminosity, winter avant-garde, trans-seasonal wear, purple core winter, holographic frost, emotional architecture, winter existentialism, deconstructed warmth, kinetic stillness, quantum ice, vitalist fashion, atmosphere re-engineer, defiant glow, insurgent warmth, singular luminescence, self-igniting style, profound grace, unstoppable force, winter transmuted, future-winter wear, identity theorem, glacial elegance, tsgabrielle winter, aesthetic survival"
  },
  {
    folder: 'app/good',
    slug: 'good-vibes-only',
    title: 'Good Vibes Only',
    metaTitle: 'Good Vibes Only. • Radiance Collection by tsgabrielle®',
    metaDescription: 'Good Vibes Only. • A Collection Celebrating Joy, Softness, And The French Trans Touch™.',
    shortDesc: 'Good Vibes Only. radiates softness, joy, and purple‑powered optimism.',
    longDesc: "Good Vibes Only. is a radiant, uplifting universe shaped by joy, softness, and the quiet power of choosing your own frequency. Inspired by warm light, soft laughter, and the emotional clarity that comes from embracing positivity with intention, Good Vibes Only. unfolds like a breath of fresh air—bright, tender, and quietly transformative. The tsgabrielle® purple spectrum meets luminous accents that feel like sunlight on skin. Each expression within Good Vibes Only. carries a sense of ease, a softness that invites you to breathe deeper, move lighter, and glow from within. Holographic touches shimmer like reflections of happiness—subtle, playful, never overwhelming. The universe of Good Vibes Only. extends gently into forms that brighten the everyday, creating an atmosphere of warmth that lingers long after the moment passes. This world embodies The French Trans Touch™: joy as resistance, positivity as power, and identity as celebration. Good Vibes Only. is for those who radiate warmth even in difficult times—the ones who choose softness over cynicism, who glow from within, and who uplift others simply by existing. This is joy, elevated into emotion—bright, intentional, and unmistakably purple.",
    slogans: ["Choose your frequency.", "Glow with good vibes.", "Joy looks good in purple.", "The French Trans Touch™, radiant edition.", "Positive energy only.", "Shine brighter.", "Wear your joy."],
    tags: "good vibes only, radiant identity, positive aesthetic, purple optimism, emotional glow, joyful universe, soft energy, identity joy, purple radiance, holographic joy, emotional storytelling, editorial joy, poetic optimism, identity celebration, gentle glow, radiant expression, purple frequency, emotional positivity, artistic optimism, signature joy universe, emotional identity, purple happiness, radiant atmosphere, joy expression, joy universe"
  },
  {
    folder: 'app/crystal',
    slug: 'crystal-skies',
    title: 'Crystal Skies.',
    metaTitle: 'Crystal Skies. • Crystalline Identity & Architectural Winterwear by tsgabrielle®',
    metaDescription: 'Crystal Skies. • An Architectural Collection Forged From Clarity, Kinetic Stillness, And The French Trans Touch™. Embrace Crystalline Identity.',
    shortDesc: 'Crystal Skies.: A vanguardist manifesto of winter’s precise clarity, architectural brilliance, and the power of luminous stillness.',
    longDesc: "Crystal Skies. isn't a mere universe; it’s an architectural manifesto forged from absolute clarity, kinetic stillness, and the unapologetic brilliance of emergent winter light. Inspired by the fractured planes of frozen dawns, the infinite precision of shimmering horizons, and the radical geometry of ice crystals, Crystal Skies. unfolds as a sharp, incisive breath of cold air—crisp, hyper-real, and profoundly, almost clinically, introspective. The tsgabrielle® purple spectrum intersects with calibrated cool tones and disruptive holographic accents that ignite like raw sunlight refracted through an ice prism. Every articulation within Crystal Skies. broadcasts an intrinsic purity, a calculated moment of suspension, a visceral reminder that profound beauty is often an emergent property of silence. The aesthetic is surgically clean yet vibrationally resonant, minimalist yet provocatively evocative, cyber-futuristic yet grounded in nature’s most stringent geometry. The universe of Crystal Skies. extends with deliberate precision into refined accents that echo its glacial elegance—subtle yet potent interventions that inject winter’s absolute clarity into the quotidian, without ever compromising the collection’s pristine integrity. This world embodies The French Trans Touch™: clarity as an unyielding force, resilience as a radical aesthetic, and the inherent power of radiating luminescence even when the environment dictates stasis. Crystal Skies. is for the self-calibrated—those who project light with surgical precision, who cultivate inner fire through stark distillation, and who navigate winter as a controlled experiment in grace and precise intention. This is winter re-engineered through purple—crystalline, incandescent, and profoundly, defiantly poetic.",
    slogans: ["Radiate in the absolute cold.", "Elegance, re-crystallized.", "Winter: The new purple code.", "The French Trans Touch™: Frozen logic.", "Glow like fractured light.", "Clarity is the ultimate power.", "Born of glacial truth."],
    tags: "crystal skies, architectural clarity, glacial identity, purple frost code, holographic refraction, winter precision, kinetic stillness, cyber-futuristic winter, winter luminescence, purple cold logic, minimal geometry, radical introspection, winter manifesto, crystal identity, fractured light glow, winter poetic syntax, winter atmosphere re-engineered, crystalline purple universe, winter artistic logic, winter expression, surgical elegance, winter emotional clarity, winter purple light, ultimate clarity, winter power aesthetic"
  },
  {
    folder: 'app/unicorn',
    slug: 'unicorn',
    title: 'Unicorn 🦄',
    metaTitle: 'Unicorn 🦄 • Iridescent Collection by tsgabrielle®',
    metaDescription: 'Unicorn 🦄 • A collection celebrating magic, individuality, and The French Trans Touch™.',
    shortDesc: 'Unicorn 🦄 celebrates magic, individuality, and iridescent identity.',
    longDesc: "Unicorn 🦄 is a universe of magic, individuality, and fearless self‑expression—a world where imagination becomes identity and softness becomes power. Designed in the signature tsgabrielle® purple spectrum with iridescent holographic accents, Unicorn 🦄 captures the feeling of stepping into your own myth, your own fantasy, and your own truth. Each expression within Unicorn 🦄 shimmers with possibility. The aesthetic blends fantasy with refinement, creating a visual language that feels both ethereal and intentional. Holographic highlights glow like enchanted light, while the purple spectrum grounds the universe in emotional depth. Unicorn 🦄 extends into select accents that carry its iridescent identity—subtle touches that bring magic into the everyday without overwhelming the collection’s refined balance. This world embodies The French Trans Touch™: authenticity as magic, individuality as strength, and identity as a radiant force. Unicorn 🦄 is for the dreamers, the rebels, and the ones who refuse to dim their light. It is for those who live in color, who move with imagination, and who transform every space they enter. This is magic reimagined through purple—iridescent, bold, and unforgettable.",
    slogans: ["Magic looks good on you.", "Be legendary.", "Unapologetically unique.", "The French Trans Touch™, enchanted.", "Glow like a unicorn.", "Identity is magic.", "Born to stand out."],
    tags: "unicorn, iridescent identity, magical universe, purple fantasy, holographic glow, enchanted aesthetic, identity magic, poetic fantasy, emotional expression, purple shimmer, artistic identity, unicorn aesthetic, identity storytelling, iridescent universe, emotional glow, purple enchantment, fantasy identity, magical expression, artistic glow, identity radiance, purple dreamscape, enchanted identity, iridescent atmosphere, unicorn expression, unicorn universe"
  },
  {
    folder: 'app/edition',
    slug: 'edition-spatiale',
    title: '🌌✨ Édition Spatiale • Cosmic Edition',
    metaTitle: '🌌✨ Édition Spatiale • Cosmic Collection by tsgabrielle®',
    metaDescription: '🌌✨ Édition Spatiale • A collection inspired by galaxies, stardust, and The French Trans Touch™.',
    shortDesc: '🌌✨ Édition Spatiale • Cosmic Edition explores cosmic identity and celestial glow.',
    longDesc: "🌌✨ Édition Spatiale • Cosmic Edition is a cosmic universe shaped by wonder, mystery, and the infinite beauty of becoming. Inspired by galaxies, stardust, and the quiet pull of the unknown, Édition Spatiale unfolds like a journey through space—expansive, luminous, and deeply introspective. The tsgabrielle® purple spectrum meets celestial holographic accents that shimmer like nebulae. Each expression within Édition Spatiale carries a sense of weightlessness, a feeling of drifting through your own orbit with identity as your guiding star. The aesthetic is futuristic yet emotional, cosmic yet grounded in human experience. The universe of Édition Spatiale extends into subtle accents that echo its celestial glow—refined touches that bring the cosmos closer without overwhelming the collection’s ethereal balance. This world embodies The French Trans Touch™: limitless identity, cosmic elegance, and the courage to shine in the dark. 🌌✨ Édition Spatiale • Cosmic Edition is for the explorers, the dreamers, and the ones who feel connected to something bigger. It is for those who glow beyond gravity, who move like constellations, and who carry galaxies within. This is space reimagined through purple—expansive, luminous, and deeply transformative.",
    slogans: ["Glow like a galaxy.", "Born from stardust.", "Cosmic elegance in purple.", "The French Trans Touch™, interstellar edition.", "Limitless identity.", "Gravity can’t hold you.", "Nebula‑powered expression."],
    tags: "edition spatiale, cosmic identity, galaxy aesthetic, purple cosmos, holographic nebula, celestial glow, cosmic storytelling, emotional universe, cosmic expression, purple stardust, identity cosmos, poetic space, cosmic editorial, cosmic identity universe, artistic galaxy, cosmic glow identity, celestial expression, cosmic dreamscape, purple universe, cosmic atmosphere, identity constellation, cosmic radiance, cosmic poetic identity, galaxy expression, cosmic universe"
  },
  {
    folder: 'app/flamant-rose',
    slug: 'flamant-rose',
    title: 'Flamant 🦩 Rose',
    metaTitle: '🦩 Flamant Rose • Soft Elegance Collection by tsgabrielle®',
    metaDescription: '🦩 Flamant Rose • A Collection Celebrating Softness, Presence, And The French Trans Touch™.',
    shortDesc: 'Flamant 🦩 Rose celebrates softness, elegance, and pink‑purple glow.',
    longDesc: "Flamant 🦩 Rose is a universe shaped by softness, elegance, and unapologetic presence—inspired by the graceful posture of flamingos and the warm glow of pink sunsets. Designed in the tsgabrielle® purple spectrum with luminous pink accents, Flamant 🦩 Rose explores the emotional landscape of softness: the strength within vulnerability, the power within gentleness, and the beauty within standing tall even when the world tries to bend you. Each expression within Flamant 🦩 Rose blends fluidity with intention. Holographic highlights shimmer like feathers catching the light, while the purple‑pink palette creates a visual harmony that feels both tender and confident. The universe of Flamant 🦩 Rose extends into subtle accents that echo its soft glow—refined touches that bring elegance into the everyday without overwhelming the collection’s gentle identity. This world embodies The French Trans Touch™: softness as strength, elegance as identity, and presence as power. Flamant 🦩 Rose is for those who move with grace and confidence—the ones who shine softly, who stand tall, and who embrace their femininity without apology. This is softness reimagined through purple—tender, luminous, and deeply empowering.",
    slogans: ["Soft, tall, unstoppable.", "Elegance in pink.", "Stand tall in purple.", "The French Trans Touch™, feather‑soft.", "Glow like a flamingo.", "Softness is strength.", "Pink with purpose."],
    tags: "flamant rose, pink identity, soft elegance, purple pink glow, flamingo aesthetic, emotional softness, poetic elegance, gentle identity, pink atmosphere, purple harmony, soft storytelling, emotional universe, elegant glow, identity softness, artistic pink, soft radiance, soft expression, pink poetic identity, gentle glow, elegant identity, pink universe, purple soft aesthetic, emotional presence, soft empowerment, flamingo universe"
  },
  {
    folder: 'app/womanizer',
    slug: 'womanizer',
    title: 'Womanizer',
    metaTitle: 'Womanizer • Magnetic Luxury Menswear by tsgabrielle®',
    metaDescription: 'Womanizer • A Luxury Menswear Collection Celebrating Quiet Charisma, Magnetic Presence, And Effortless Allure.',
    shortDesc: 'Womanizer celebrates quiet charisma, magnetic presence, and discreet purple‑powered allure.',
    longDesc: "Womanizer is a universe shaped by quiet charisma, effortless confidence, and undeniable magnetism—a world where presence speaks volumes without needing to say a word. Designed for the architect of attraction, this collection unfolds with a slow burn: intentional, refined, and impossible to ignore. The tsgabrielle® purple spectrum meets deep, understated tones and stealth holographic accents that catch the light only when intended. Each expression within Womanizer carries a sense of sophisticated boldness—clean lines that command the room and a subtle glow that lingers long after you’ve left. The universe of Womanizer extends into highly curated accents that echo its seductive energy—refined touches that elevate magnetic charm without ever compromising the collection’s discreet nature. This world embodies undeniable allure, magnetic elegance, and the quiet power of knowing exactly how to navigate any space. Womanizer is for those who master the subtle art of the encounter—the ones who shift the atmosphere effortlessly, who move with calculated grace, and whose charm is both their signature and their secret. This is attraction reimagined through purple—discreet, magnetic, and absolutely unforgettable.",
    slogans: ["Charm is a quiet power.", "Speak without words.", "French allure, magnetic edition.", "Undeniable presence.", "Master the atmosphere.", "Discreet allure in purple.", "Leave a lingering impression."],
    tags: "womanizer, quiet charisma, magnetic presence, discreet allure, stealth luxury, tsgabrielle purple spectrum, elegant attraction, sophisticated charm, masculine allure, subtle holographic, undeniable magnetism, slow burn aesthetic, calculated grace, magnetic elegance, quiet confidence, luxury menswear, refined aesthetic, charismatic identity, purple powered charm, the art of attraction, effortless magnetism, stealth streetwear, lingering impression, magnetic identity, mens luxury fashion"
  },
  {
    folder: 'app/transflower',
    slug: 'transflower',
    title: 'TransFLOWer™',
    metaTitle: 'TransFLOWer™ • Blooming Luxury Streetwear by tsgabrielle®',
    metaDescription: 'TransFLOWer™ • A Luxury Streetwear Collection Celebrating Identity, Growth, And Soft Strength.',
    shortDesc: 'TransFLOWer™ blends softness, strength, and blooming purple identity.',
    longDesc: "TransFLOWer™ celebrates growth—the quiet, powerful kind that blooms inherently from personal truth. Inspired by resilient flowers that push through concrete, TransFLOWer™ honors the beauty of becoming your authentic self in a world that often asks you to shrink. Designed meticulously within the signature tsgabrielle® purple spectrum, this collection blends profound softness with architectural structure, creating silhouettes that feel simultaneously delicate and unbreakable. Holographic accents shimmer throughout like fresh dew on petals at sunrise, offering a kinetic visual reminder of life and renewal. This universe embodies The French Trans Touch™ in full bloom: an undeniable testament to flourishing on your own terms and embracing vulnerability as a source of immense strength. TransFLOWer™ symbolizes growth, authenticity, and pride. Inspired by flowers blooming in their own time, this collection celebrates identity and the courage to live truthfully. Fashion becomes a symbol of dignity, solidarity, and beauty in diversity. Every piece invites people to express themselves freely while honoring individuality and inclusion.",
    slogans: ["Bloom without permission.", "Soft is powerful.", "Grow in your own direction.", "Elegance in full bloom.", "The French Trans Touch™, floral edition.", "Petals with purpose.", "Blooming in purple."],
    tags: "transflower, blooming identity, purple floral streetwear, soft strength, resilient elegance, holographic dew, identity growth, french trans touch in bloom, tsgabrielle luxury, concrete flowers, delicate structure, blooming purple, emotional growth apparel, floral streetwear, unbreakable softness, trans resilience, floral aesthetic fashion, identity in bloom, purple spectrum apparel, soft luxury streetwear, purposeful petals, trans empowerment fashion, poetic growth, elegant streetwear, blooming silhouette"
  },
  {
    folder: 'app/translove',
    slug: 'translove',
    title: 'TransLove™',
    metaTitle: 'TransLove™ • Identity & Self‑Love Streetwear | tsgabrielle®',
    metaDescription: 'TransLove™ • A Luxury Streetwear Collection Celebrating Identity, Visibility, And Self‑Love.',
    shortDesc: 'TransLove™ celebrates identity, visibility, and soft purple‑pink warmth.',
    longDesc: "TransLove™ is a profound tribute to the absolute power of loving yourself—loudly, softly, and fully. This collection radiates undeniable warmth, deep courage, and the unmistakable, brilliant glow of authenticity. Designed masterfully within the tsgabrielle® purple spectrum and enriched with soft pink undertones, TransLove™ effortlessly blends timeless Parisian elegance with the clean, modern lines of luxury streetwear minimalism. Every piece acts as a vessel, carrying the emotional heartbeat of The French Trans Touch™: championing love as an act of resistance, honoring identity as pure beauty, and declaring visibility as the ultimate power. It is an invitation to wear your truth and embrace the revolutionary act of self-devotion.",
    slogans: ["Love looks good on you.", "Trans love is real love.", "Wear your heart in purple.", "Soft. Strong. Loved.", "The French Trans Touch™, with love.", "Love is a revolution.", "Identity is beautiful."],
    tags: "translove, self-love apparel, purple pink streetwear, identity visibility, authentic glow, trans resistance fashion, soft warmth style, parisian elegance, modern minimalist streetwear, tsgabrielle love, french trans touch, identity as beauty, emotional streetwear, visible power fashion, love revolution apparel, trans courage, soft pink undertones, luxury self-love, purple identity, emotional warmth clothing, authentic beauty streetwear, pride and love, self-devotion wear, tsgabrielle purple spectrum, love as resistance"
  },
  {
    folder: 'app/made-in-usa',
    slug: 'made-in-usa',
    title: 'Made In USA',
    metaTitle: 'Made In USA • Premium American Craft Streetwear | tsgabrielle®',
    metaDescription: 'Made In USA • A Premium Streetwear Collection Blending American Craftsmanship With French Elegance And Purple Identity.',
    shortDesc: 'Made In USA blends American craftsmanship with French purple elegance.',
    longDesc: "Made In USA is a dedicated honor to exceptional craftsmanship, enduring quality, and the profound beauty of creating with deliberate intention. This collection seamlessly blends American manufacturing excellence with the refined elegance and vibrant identity of the tsgabrielle® universe. The result is a selection of pieces that feel exceptionally durable, flawlessly refined, and unmistakably premium. Designed in the signature royal-purple spectrum with clean, sharp, and minimalist silhouettes, Made In USA reflects the ultimate fusion of two distinct worlds: the sophisticated allure of French elegance and the rugged reliability of American craft. It is a testament to purposeful design built to withstand the test of time.",
    slogans: ["Crafted with purpose.", "Made here. Worn everywhere.", "American craft, French elegance.", "The French Trans Touch™, made in USA.", "Built to last.", "Quality in purple.", "Craftsmanship meets identity."],
    tags: "made in usa streetwear, premium american craft, tsgabrielle craftsmanship, french elegance american made, royal purple spectrum, durable luxury streetwear, minimalist silhouettes, intentional creation, quality purple apparel, built to last fashion, premium craft style, authentic american manufacturing, elegant durability, luxury streetwear minimalism, tsgabrielle identity, refined american clothing, purposeful design fashion, royal purple identity, american craft french touch, high quality streetwear, timeless minimal design, premium manufacturing, crafted with purpose, identity and craft, tsgabrielle premium"
  },
  {
    folder: 'app/arizona',
    slug: 'arizona',
    title: 'Arizona 🌵',
    metaTitle: 'Arizona 🌵 • A Desert-Inspired by tsgabrielle®',
    metaDescription: 'Arizona 🌵 • A Desert‑Inspired Collection Blending Heat, Resilience, And Purple Identity.',
    shortDesc: 'Arizona 🌵 blends desert heat, resilience, and purple identity.',
    longDesc: "Arizona 🌵 masterfully captures the intense heat, the vast expanse, and the quiet, enduring power of the desert—all boldly reimagined through the vibrant purple lens of tsgabrielle®. Inspired by sun-bleached landscapes, endless rolling horizons, and the fierce resilience of desert life, Arizona 🌵 flawlessly blends earthy minimalism with striking, futuristic accents. Warm, grounding neutrals meticulously frame the brand’s signature royal-purple identity, while disruptive holographic highlights shimmer with the kinetic energy of mirages under the blazing sun. This collection deeply reflects The French Trans Touch™: showcasing strength, honoring survival, and discovering breathtaking beauty in the most unexpected and challenging environments.",
    slogans: ["Heat looks good in purple.", "Desert strength.", "Glow like a mirage.", "The French Trans Touch™, desert edition.", "Endless horizon energy.", "Survive. Shine. Repeat.", "Born of heat."],
    tags: "arizona collection, desert luxury streetwear, purple mirage, desert resilience, earthy minimalism, futuristic desert accents, sun bleached style, tsgabrielle royal purple, endless horizon fashion, holographic mirage, heat inspired apparel, desert strength streetwear, french trans touch desert, warm neutral clothing, survival beauty fashion, unexpected beauty apparel, luxury desert aesthetic, purple lens fashion, vast landscape style, quiet power apparel, heat resilience, future desert streetwear, tsgabrielle arizona, desert mirage glow, royal purple identity"
  },
  {
    folder: 'app/paris',
    slug: 'paris',
    title: 'Paris',
    metaTitle: 'Paris • French Collection by tsgabrielle®',
    metaDescription: 'Paris • A Collection Inspired By Parisian Elegance, Identity, And Modern Purple Minimalism.',
    shortDesc: 'Paris blends Parisian elegance with modern purple luxury streetwear.',
    longDesc: "Paris is an intimate love letter to timeless elegance, bold identity, and truly effortless style. Inspired by the soft light of Montmartre mornings, the golden, sweeping sunsets along the Seine, and the quiet, unshakeable confidence inherent in Parisian fashion, Paris seamlessly blends classic minimalism with the cutting-edge aesthetic of modern luxury streetwear. Designed beautifully within the tsgabrielle® purple spectrum, Paris physically embodies The French Trans Touch™: it is subtle yet sensual, classic yet unapologetically individual. Every meticulously crafted piece carries the enduring, romantic spirit of the city itself—deeply refined, strikingly bold, and absolutely unforgettable. The Paris collection captures timeless elegance inspired by the world’s fashion capital. Refined silhouettes and minimalist sophistication create effortless style that feels both classic and contemporary. Paris celebrates confidence through simplicity. The pieces invite anyone to express elegance naturally, proving that true style is not defined by gender or rules but by attitude.",
    slogans: ["Paris in every stitch.", "Elegance is a lifestyle.", "Born in Paris. Worn everywhere.", "Where luxury meets attitude.", "Effortless. Iconic. Paris.", "French allure, reimagined.", "Style with a heartbeat."],
    tags: "paris luxury streetwear, parisian elegance, montmartre inspired, seine sunset style, tsgabrielle purple spectrum, effortless french style, modern purple minimalism, french trans touch, subtle sensual fashion, unapologetic individuality, romantic street style, refined bold apparel, timeless minimalism, luxury streetwear paris, iconic french allure, signature paris style, elegant identity clothing, classic french aesthetic, modern luxury fashion, tsgabrielle paris, style with a heartbeat, elegant purple apparel, parisian confidence, unforgettable streetwear, french lifestyle fashion"
  },
  {
    folder: 'app/peach',
    slug: 'peach-phoenix',
    title: 'Peach Phoenix™',
    metaTitle: 'Peach Phoenix™ • Rebirth Radiant Individuality by tsgabrielle®',
    metaDescription: 'Peach Phoenix™ • A Luxury Streetwear Collection Celebrating Rebirth, Identity, And Bold Purple Transformation.',
    shortDesc: 'Peach Phoenix™ celebrates rebirth, identity, and peach‑powered transformation.',
    longDesc: "Peach Phoenix™ represents transformation, resilience, and radiant individuality. Inspired by the mythical Phoenix and the gentle curves of a peach, this collection blends strength with warmth, symbolizing renewal and confidence. The designs celebrate people who evolve, reinvent themselves, and express their identity with pride. Soft flowing shapes echo natural curves, while bold colors and modern silhouettes express energy and movement. Peach Phoenix™ invites everyone—women, men, trans individuals, and allies—to rise in style and celebrate the beauty of becoming who you truly are.",
    slogans: ["Rise in purple fire.", "Rebirth looks good on you.", "Soft. Strong. Phoenix.", "Glow through the ashes.", "The French Trans Touch™, reborn.", "Identity is a flame.", "Peach‑powered transformation."],
    tags: "peach phoenix, rebirth luxury streetwear, bold transformation, tsgabrielle peach, royal purple fire, luminous undertones fashion, french trans touch reborn, soft curves sharp confidence, identity as a flame, glowing transformation, phoenix rising style, unapologetic rebirth, mythical fashion aesthetic, purple fire streetwear, reborn identity apparel, soft strong phoenix, peach powered fashion, transformative luxury wear, glowing identity, tsgabrielle royal purple, radiant rebirth style, fire and softness, unyielding confidence apparel, identity rebirth, peach symbol clothing"
  }
];

for (const col of collections) {
  if (!fs.existsSync(col.folder)) {
    fs.mkdirSync(col.folder, { recursive: true });
  }

  const fileContent = `import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: ${JSON.stringify(col.metaTitle)},
  description: ${JSON.stringify(col.metaDescription)},
  path: "/${col.folder.replace('app/', '')}"
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title=${JSON.stringify(col.title)} 
      slug=${JSON.stringify(col.slug)} 
      description=${JSON.stringify(col.shortDesc)}
      longDescription=${JSON.stringify(col.longDesc)}
      slogans={${JSON.stringify(col.slogans)}}
    />
  );
}
`;

  fs.writeFileSync(`${col.folder}/page.tsx`, fileContent);
}

console.log('Successfully wrote page.tsx for 14 collections');
