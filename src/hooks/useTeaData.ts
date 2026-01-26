import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Tea, CsvRow } from '../types';

export const useTeaData = () => {
    const [teas, setTeas] = useState<Tea[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const response = await fetch('/teareviews.csv');
                if (!response.ok) {
                    throw new Error('Failed to fetch CSV file');
                }
                const csvText = await response.text();

                Papa.parse<CsvRow>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsedTeas: Tea[] = results.data.map((row) => {
                            // Remove currency symbol and whitespace for price parsing
                            const priceString = row['PPP (350ml)']?.replace('$', '').trim() || '0';

                            return {
                                name: row.Name,
                                brand: row.Brand,
                                form: row.Form,
                                type: row.Type,
                                score: parseFloat(row.Score),
                                description: row.Description,
                                ppp: parseFloat(priceString),
                                link: row.link
                            };
                        }).sort((a, b) => b.score - a.score); // Default sort by score desc

                        // Add rank
                        const rankedTeas = parsedTeas.map((tea, index) => ({
                            ...tea,
                            rank: index + 1
                        }));

                        setTeas(rankedTeas);
                        setLoading(false);
                    },
                    error: (err: Error) => {
                        setError(err.message);
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchTeas();
    }, []);

    return { teas, loading, error };
};
