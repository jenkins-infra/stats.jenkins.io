import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useCSVData = (csvFileName: string) => {
    const [data, setData] = useState<string[][]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fileUrl = `/infra-statistics/jenkins-stats/svg/${csvFileName}.csv`;
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
                }
                const csvText = await response.text();
                const parsedData = Papa.parse<string[]>(csvText, { header: false }).data;
                // Filter out empty rows
                const filteredData = parsedData.filter((row) => row.some((cell) => cell.trim() !== ''));
                setData(filteredData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('An unknown error occurred'));
                }
            }
        };

        fetchData();
    }, [csvFileName]);

    return { data, error };
};

export default useCSVData;

