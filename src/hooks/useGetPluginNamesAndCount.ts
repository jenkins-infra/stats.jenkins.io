import { useState, useEffect } from 'react';

const usePluginData = () => {
    const [pluginCount, setPluginCount] = useState<number>(0);
    const [pluginNames, setPluginNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPluginData = async () => {
            try {
                const fileUrl = '/infra-statistics/plugin-installation-trend/latestNumbers.json';
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch plugin data');
                }
                const latestNumbers = await response.json();
                const plugins = latestNumbers.plugins;
                if (plugins) {
                    const names = Object.keys(plugins);
                    setPluginNames(names);
                    setPluginCount(names.length);
                } else {
                    console.error('Plugins data not found');
                }
            } catch (error) {
                console.error('Error processing plugin data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPluginData();
    }, []);

    return { pluginCount, pluginNames, loading };
};

export default usePluginData;
