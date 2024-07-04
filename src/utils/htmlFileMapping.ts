const htmlFiles = import.meta.glob('../data/infra-statistics/pluginversions/*.html', {
    eager: true,
    as: 'raw',
})

const htmlFileMapping: Record<string, string> = {}

for (const path in htmlFiles) {
    const fileName = path.split('/').pop()?.replace('.html', '')
    if (fileName) {
        htmlFileMapping[fileName] = htmlFiles[path]
    }
}

export default htmlFileMapping
