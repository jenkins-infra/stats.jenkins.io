import { useState, useEffect } from 'react';
import { IPluginData } from '../types/types';
import useGetPluginNames from './useGetPluginNamesAndCount';

const BATCH_SIZE = 100;

interface UseFetchPluginsResult {
    plugins: IPluginData[];
    loading: boolean;
    error: Error | null;
}

const useFetchPlugins = (): UseFetchPluginsResult => {
    const [plugins, setPlugins] = useState<IPluginData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const { pluginNames } = useGetPluginNames();

    useEffect(() => {
        if (pluginNames.length === 0) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPluginsInBatch = async (
            batch: string[],
            fetchedIds: Set<string>
        ): Promise<IPluginData[]> => {

            const namesToFetch = batch.filter((name) => !fetchedIds.has(name));

            const results = await Promise.allSettled(
                namesToFetch.map(async (name): Promise<IPluginData> => {
                    const fileUrl = `/infra-statistics/plugin-installation-trend/${name}.stats.json`;
                    const response = await fetch(fileUrl, { signal });
                    if (!response.ok) {
                        throw new Error(`JSON file for plugin with id "${name}" not found`);
                    }
                    const chartData = await response.json();
                    fetchedIds.add(name);
                    return { id: name, chartData };
                })
            );

            return results
                .filter(
                    (result): result is PromiseFulfilledResult<IPluginData> =>
                        result.status === 'fulfilled'
                )
                .map((result) => result.value);
        };

        const fetchAllPlugins = async (): Promise<void> => {
            setLoading(true);
            setError(null);

            try {
                const allPlugins: IPluginData[] = [];
                const fetchedIds = new Set<string>();

                for (let i = 0; i < pluginNames.length; i += BATCH_SIZE) {
                    const batch = pluginNames.slice(i, i + BATCH_SIZE);
                    const batchData = await fetchPluginsInBatch(batch, fetchedIds);
                    allPlugins.push(...batchData);

                    if (signal.aborted) {
                        return;
                    }

                    setPlugins([...allPlugins]);
                }

                if (!signal.aborted) {
                    setPlugins(allPlugins);
                }
            } catch (err) {
                if (!signal.aborted) {
                    setError(err as Error);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchAllPlugins();

        return () => {
            controller.abort();
        };
    }, [pluginNames]);

    return { plugins, loading, error };
};

export default useFetchPlugins;
