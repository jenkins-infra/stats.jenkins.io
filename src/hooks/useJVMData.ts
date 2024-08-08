import { useState, useEffect } from 'react';

interface JVMStatsPerMonth {
    [timestamp: string]: {
        [jvm: string]: number;
    };
}

interface ParsedJVMData {
    [key: string]: {
        dates: string[];
        installations: number[];
    };
}

const useJVMData = () => {
    const [data, setData] = useState<ParsedJVMData | null>(null);

    useEffect(() => {
        const parseJVMData = async () => {
            try {
                const fileUrl = new URL('../data/infra-statistics/plugin-installation-trend/jvms.json', import.meta.url).href;
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch JVM data');
                }
                const jvmData = await response.json();
                const parsedData: ParsedJVMData = {};

                for (const [timestamp, jvms] of Object.entries(jvmData.jvmStatsPerMonth as JVMStatsPerMonth)) {
                    const date = new Date(Number(timestamp)).toISOString().split('T')[0];
                    for (const [jvm, installations] of Object.entries(jvms)) {
                        if (!parsedData[jvm]) {
                            parsedData[jvm] = { dates: [], installations: [] };
                        }
                        parsedData[jvm].dates.push(date);
                        parsedData[jvm].installations.push(installations);
                    }
                }

                setData(parsedData);
            } catch (error) {
                console.error('Error processing JVM data', error);
            }
        };

        parseJVMData();
    }, []);

    return { data };
};

export default useJVMData;
