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
}
