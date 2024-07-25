import { useState, useEffect } from 'react';
import { VersionData, AllPluginVersionData } from '../types/types';

const useGetSpecificPluginVersionData = (pluginId: string | null, versionData: AllPluginVersionData | null) => {
    const [specificVersionData, setSpecificVersionData] = useState<VersionData | null>(null);

    useEffect(() => {
        if (pluginId && versionData) {
            const data = versionData[pluginId] || null;
            setSpecificVersionData(data);
        }
    }, [pluginId, versionData]);

    return specificVersionData;
};

export default useGetSpecificPluginVersionData;
