import { useState, useEffect } from 'react';
import { AllPluginVersionData } from '../types/types';

const useGetPluginVersionData = () => {
    const [allVersionData, setAllVersionData] = useState<AllPluginVersionData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fileUrl = new URL(`../data/infra-statistics/plugin-installation-trend/jenkins-version-per-plugin-version.json`, import.meta.url).href;
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error(`Version data not found`);
                }
                const data = await response.json() as AllPluginVersionData;
                setAllVersionData(data);
            } catch (error) {
                console.error(`Error fetching version data`, error);
                setAllVersionData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { allVersionData, loading };
};

export default useGetPluginVersionData;
