const csvFiles = import.meta.glob('../data/infra-statistics/jenkins-stats/svg/*.csv', { eager: true, as: 'raw' })
const htmlFiles = import.meta.glob('../data/infra-statistics/pluginversions/*.html', { eager: true, as: 'raw' })
const jsonFiles = import.meta.glob('../data/infra-statistics/plugin-installation-trend/*.json', {
    eager: true,
    as: 'raw',
})

const csvFileMapping: Record<string, string> = {}
const htmlFileMapping: Record<string, string> = {}
const jsonFileMapping: Record<string, string> = {}

for (const path in csvFiles) {
    const fileName = path.split('/').pop()?.replace('.csv', '')
    if (fileName) {
        csvFileMapping[fileName] = csvFiles[path]
    }
}

for (const path in htmlFiles) {
    const fileName = path.split('/').pop()?.replace('.html', '')
    if (fileName) {
        htmlFileMapping[fileName] = htmlFiles[path]
    }
}

for (const path in jsonFiles) {
    const fileName = path.split('/').pop()?.replace('.stats.json', '')
    if (fileName) {
        jsonFileMapping[fileName] = jsonFiles[path]
    }
}

export { csvFileMapping, htmlFileMapping, jsonFileMapping }
