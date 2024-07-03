// csvFileMapping.ts
const csvFiles = import.meta.glob('../data/infra-statistics/jenkins-stats/svg/*.csv', { eager: true, as: 'raw' })

const csvFileMapping: Record<string, string> = {}

for (const path in csvFiles) {
    const fileName = path.split('/').pop()?.replace('.csv', '')
    if (fileName) {
        csvFileMapping[fileName] = csvFiles[path] as string
    }
}

export default csvFileMapping
