export type AxisKey = 'E' | 'C' | 'x' | 'A' | 'B' | 'S'; // E/C (Energy), A/C (Adventure), B/S (Flavor)

export interface Question {
    id: number;
    text: string;
    axisIndex: 0 | 1 | 2; // 0=Energy, 1=Adventure, 2=Flavor
    options: {
        label: string;
        value: number; // +1 (Green/Left), 0 (Gray/Neutral), -1 (Red/Right)
    }[];
}

export interface Personality {
    key: string; // e.g. "EAB"
    name: string;
    description: string;
}

export const QUESTIONS: Question[] = [
    // Axis 0: Energy (Energized vs Chill)
    {
        id: 1,
        text: "How do you prefer to start your day?",
        axisIndex: 0,
        options: [
            { label: "Give me a caffeine kick!", value: 1 }, // Green -> E
            { label: "A steady, gentle start.", value: 0 },
            { label: "Slow, calm, and caffeine-free.", value: -1 } // Red -> C
        ]
    },
    {
        id: 2,
        text: "What is your ideal mental state?",
        axisIndex: 0,
        options: [
            { label: "Laser-focused & High Energy", value: 1 }, // Green -> E
            { label: "Alert but Balanced", value: 0 },
            { label: "Relaxed & Meditative", value: -1 } // Red -> C
        ]
    },
    // Axis 1: Adventure (Adventurer vs Consistent)
    {
        id: 3,
        text: "Ordering at a new cafe...",
        axisIndex: 1,
        options: [
            { label: "I'll try the weirdest thing!", value: 1 }, // Green -> A
            { label: "Something unique but safe.", value: 0 },
            { label: "My usual order, please.", value: -1 } // Red -> C
        ]
    },
    {
        id: 4,
        text: "Shopping for tea/coffee...",
        axisIndex: 1,
        options: [
            { label: "I love wild flavors & blends.", value: 1 }, // Green -> A
            { label: "I like exploring origins.", value: 0 },
            { label: "I stick to the classics.", value: -1 } // Red -> C
        ]
    },
    // Axis 2: Flavor (Bitter vs Sweet)
    {
        id: 5,
        text: "Pick a treat:",
        axisIndex: 2,
        options: [
            { label: "Dark Chocolate (Bitter/Rich)", value: 1 }, // Green -> B
            { label: "Balanced / Nutty", value: 0 },
            { label: "Pastries / Jam (Sweet)", value: -1 } // Red -> S
        ]
    },
    {
        id: 6,
        text: "How do you take your brew?",
        axisIndex: 2,
        options: [
            { label: "Pure, strong, no sugar.", value: 1 }, // Green -> B
            { label: "Maybe a splash of milk.", value: 0 },
            { label: "Sweetened / Latte style.", value: -1 } // Red -> S
        ]
    }
];

// Helper to generate key from scores
// Scores range -2 to +2 per axis.
// > 0 -> Left Char. < 0 -> Right Char. 0 -> x.
export const getPersonalityKey = (energy: number, adventure: number, flavor: number): string => {
    const k1 = energy > 0 ? 'E' : energy < 0 ? 'C' : 'x';
    const k2 = adventure > 0 ? 'A' : adventure < 0 ? 'C' : 'x';
    const k3 = flavor > 0 ? 'B' : flavor < 0 ? 'S' : 'x';
    return `${k1}${k2}${k3}`;
};

export const PERSONALITIES: Record<string, Personality> = {
    // Energized (E)
    "EAB": { key: "EAB", name: "The Trailblazer", description: "You seek high energy and crave new experiences, appreciating the raw, bitter complexity of pure tea. You're likely the first to try a new trend, not because it's popular, but because you need to know." },
    "EAS": { key: "EAS", name: "The Party Pop", description: "Energetic and adventurous, you love sweet, fun flavors that match your vibrant lifestyle. You approach life with a 'yes' attitude and bring the spark to any gathering." },
    "EAx": { key: "EAx", name: "The Explorer", description: "Driven by energy and curiosity, you're open to any flavor as long as it's exciting. You're constantly moving, seeking the next peak, the next idea, or the next great cup." },

    "ECB": { key: "ECB", name: "The Workhorse", description: "Consistent and energetic. You stick to the strong, bitter brews that get the job done. You value efficiency and reliability over novelty—results matter most to you." },
    "ECS": { key: "ECS", name: "The Sweet Spot", description: "You like your reliable energy boost with a touch of sweetness. Routine comfort is your superpower; you know exactly what you need to perform at your best." },
    "ECx": { key: "ECx", name: "The Daily Driver", description: "High energy, steady habits. You're not fussy about flavor, just the fuel. You're the dependable engine of your group, always running, always ready." },

    "ExB": { key: "ExB", name: "The Purist Pulse", description: "Balanced in habits but energetic in spirit. You strictly prefer the bold, bitter notes. You have a refined intensity—calm on the surface but driven by a powerful internal motor." },
    "ExS": { key: "ExS", name: "The Sugar Rush", description: "You need energy and you like it sweet. Simple effective pleasure. You likely work in bursts of creativity and need a quick, delightful lift to keep going." },
    "Exx": { key: "Exx", name: "The Dynamo", description: "Pure energy. Your preferences fluctuate, but your need for caffeine is constant. You are adaptable and high-octane, able to switch gears instantly." },

    // Chill (C)
    "CAB": { key: "CAB", name: "The Deep Diver", description: "Relaxed demeanor but an adventurous palate. You explore complex, bitter profiles at your own pace. You likely enjoy philosophy, deep conversations, and getting lost in the details." },
    "CAS": { key: "CAS", name: "The Daydreamer", description: "Chill and imaginative. You love trying new, sweet concoctions that drift you away. You see the world not as it is, but as it could be—full of color and wonder." },
    "CAx": { key: "CAx", name: "The Wanderer", description: "Laid back but curious. You float between flavors, always looking for a gentle new experience. You take the path less traveled, simply to see where it goes." },

    "CCB": { key: "CCB", name: "The Monk", description: "Maximum chill, maximum consistency. You meditate on the bitter, earthy depths of the same pure tea. You find profound beauty in routine and simplicity." },
    "CCS": { key: "CCS", name: "The Comfort Seeker", description: "The ultimate cozy vibe. You stick to your favorite sweet, relaxing cup. No surprises needed—you know how to create a sanctuary of peace in a chaotic world." },
    "CCx": { key: "CCx", name: "The Anchor", description: "Stable and relaxed. You are the grounding force, indifferent to flavor swings. People come to you for stability, and you provide it with a warm, steady hand." },

    "CxB": { key: "CxB", name: "The Contemplative", description: "Balanced approach to life, but you seriously appreciate the bitter, grounded notes of tea. You likely spend time reflecting on the past and planning for the future with quiet confidence." },
    "CxS": { key: "CxS", name: "The Softie", description: "Easy-going and balanced. You have a sweet tooth that brings a smile to your calm day. You believe that life is too short to be bitter, finding joy in the small, sweet moments." },
    "Cxx": { key: "Cxx", name: "The Zen Master", description: "Radiating calm. Neither seeking novelty nor routine, simply existing with the flow. You are present, mindful, and virtually unshakeable." },

    // Neutral Energy (x)
    "xAB": { key: "xAB", name: "The Connoisseur", description: "Balanced energy, but highly adventurous. You hunt for the rare, bitter, and complex. You are likely a tastemaker, always seeking quality and nuance that others miss." },
    "xAS": { key: "xAS", name: "The Taster", description: "You enjoy the fun side of tea—sweet, new, and exciting—without needing a caffeine fix. You explore for the sheer joy of it, unburdened by addiction or routine." },
    "xAx": { key: "xAx", name: "The Open Mind", description: "Truly adventurous. Energy doesn't dictate your choice, curiosity does. You are a true generalist, interested in everything and defined by nothing but your openness." },

    "xCB": { key: "xCB", name: "The Traditionalist", description: "You respect the ritual. Consistent, bitter, and balanced. A timeless approach. You likely value heritage, history, and the way things 'should' be done." },
    "xCS": { key: "xCS", name: "The Regular", description: "You have your sweet favorite and you stick to it. Why change what works? You are practical, loyal, and find satisfaction in the familiar." },
    "xCx": { key: "xCx", name: "The Rock", description: "Steady and balanced. You don't seek highs or lows, just a good standard cup. You are the foundation upon which others build, dependable and solid." },

    "xxB": { key: "xxB", name: "The Sommelier", description: "It's all about the flavor profile. You lean towards the sophistication of bitter notes. For you, consumption is an intellectual pursuit as much as a sensory one." },
    "xxS": { key: "xxS", name: "The Treat", description: "Tea is a dessert for you. Sweet, balanced, and enjoyable anytime. You know how to reward yourself and believe in self-care as a priority." },
    "xxx": { key: "xxx", name: "True Eclectic", description: "Perfectly balanced. You are the center of the tea universe, adaptable to any brew. You are the chameleon, able to fit in anywhere and enjoy anything." }
};
