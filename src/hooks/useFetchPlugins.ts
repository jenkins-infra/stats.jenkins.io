import { useState, useEffect } from 'react';
import { IPluginData } from '../types/types';
import useGetPluginNames from './useGetPluginNamesAndCount';

const useFetchPlugins = () => {
    const [plugins, setPlugins] = useState<IPluginData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { pluginNames } = useGetPluginNames();

    useEffect(() => {
        const fetchPluginList = async () => {
            try {
                const pluginData = await Promise.all(
                    pluginNames.map(async (name) => {
                        const fileUrl = new URL(`../data/infra-statistics/plugin-installation-trend/${name}.stats.json`, import.meta.url).href;
                        const response = await fetch(fileUrl);
                        if (!response.ok) {
                            throw new Error(`JSON file for plugin with id "${name}" not found`);
                        }
                        const chartData = await response.json();
                        return { id: name, chartData };
                    })
                );
                setPlugins(pluginData);
            } catch (error) {
                console.error('Error fetching plugin data', error);
            } finally {
                setLoading(false);
            }
        };

        if (pluginNames.length > 0) {
            fetchPluginList();
        } else {
            setLoading(false);
        }
    }, [pluginNames]);

    return { plugins, loading };
};

export default useFetchPlugins;
