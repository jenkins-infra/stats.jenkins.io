import { ParsedData, VersionData } from '../../data/plugins'

export function parseData(versionData: VersionData, name: string): ParsedData {
    const pluginVersionsSet = new Set<string>()
    const coreVersionsSet = new Set<string>()
    const totalInstallsPerPluginVersion = new Map<string, number>()

    let totalInstalls = 0

    for (const pluginVersion in versionData) {
        if (/^\d[\w.]*\w$/.test(pluginVersion)) {
            pluginVersionsSet.add(pluginVersion)
            if (!totalInstallsPerPluginVersion.has(pluginVersion)) {
                totalInstallsPerPluginVersion.set(pluginVersion, 0)
            }
            for (const coreVersion in versionData[pluginVersion]) {
                if (/^[12][.]\d+(|[.]\d)$/.test(coreVersion)) {
                    coreVersionsSet.add(coreVersion)
                    totalInstalls += versionData[pluginVersion][coreVersion]
                    totalInstallsPerPluginVersion.set(
                        pluginVersion,
                        (totalInstallsPerPluginVersion.get(pluginVersion) || 0) +
                            versionData[pluginVersion][coreVersion]
                    )
                }
            }
        }
    }

    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
    const pluginVersions = Array.from(pluginVersionsSet).sort(collator.compare)
    const coreVersions = Array.from(coreVersionsSet).sort(collator.compare)

    const thisCoreVersionOrOlderPerPluginVersion: { [key: string]: number } = {}
    let thisCoreVersionOrOlder = 0 // Added to track core version totals

    const rows = coreVersions.map((coreVersion) => {
        const cells = pluginVersions.map((pluginVersion) => {
            const count = versionData[pluginVersion][coreVersion] || 0
            const opacity = Math.max(0.1, (count * 100) / totalInstalls)
            const totalInstallsForPlugin = totalInstallsPerPluginVersion.get(pluginVersion) || 0

            // Initialize if not set
            if (thisCoreVersionOrOlderPerPluginVersion[pluginVersion] === undefined) {
                thisCoreVersionOrOlderPerPluginVersion[pluginVersion] = 0
            }

            const installsPercentage =
                totalInstallsForPlugin > 0
                    ? Math.round(
                          (1 - (thisCoreVersionOrOlderPerPluginVersion[pluginVersion] || 0) / totalInstallsForPlugin) *
                              100
                      )
                    : 0

            const title =
                `${pluginVersion} on ${coreVersion}: ${count > 0 ? `${count} installs (${Math.round((count / totalInstalls) * 100)}%) - ` : ''}` +
                `${installsPercentage}% of ${pluginVersion} installs are on this core version or newer`

            thisCoreVersionOrOlderPerPluginVersion[pluginVersion] += count

            return { version: pluginVersion, count, opacity, title }
        })

        const total = cells.reduce((acc, cell) => acc + cell.count, 0)

        if (thisCoreVersionOrOlderPerPluginVersion[coreVersion] === undefined) {
            thisCoreVersionOrOlderPerPluginVersion[coreVersion] = 0
        }

        const installsPercentage =
            totalInstalls > 0 ? Math.round((1 - thisCoreVersionOrOlder / totalInstalls) * 100) : 0

        const totalTitle =
            `${coreVersion} total: ${total} installs (${Math.round((total / totalInstalls) * 100)}%)` +
            ` - ${installsPercentage}% of plugin installs are on this core version or newer`

        thisCoreVersionOrOlder += total

        return { coreVersion, cells, total, totalTitle }
    })

    return {
        name,
        pluginVersions,
        coreVersions,
        rows,
        totalInstalls,
    }
}
