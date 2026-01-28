export interface Tea {
    name: string;
    brand: string;
    form: string;
    type: string;
    score: number;
    description: string;
    ppp: number; // Price per portion (350ml)
    link: string;
    rank?: number;
    caffeine: number;
    sweetness: number;
}

export interface CsvRow {
    Name: string;
    Brand: string;
    Form: string;
    Type: string;
    Score: string;
    Description: string;
    "PPP (350ml)": string;
    link: string;
    Caffeine?: string; // Optional because legacy CSVs might not have it immediately in all envs (safe parsing)
    Sweetness?: string;
}
