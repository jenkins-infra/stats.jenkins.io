const jsonFiles = import.meta.glob('../data/infra-statistics/plugin-installation-trend/*.json', {
    eager: true,
    as: 'raw',
})

const jsonFileMapping: Record<string, string> = {}

for (const path in jsonFiles) {
    const fileName = path.split('/').pop()?.replace('.stats.json', '')
    if (fileName) {
        jsonFileMapping[fileName] = jsonFiles[path]
    }
}

export default jsonFileMapping
