#!/bin/bash

set -euxo pipefail

command -v "curl" >/dev/null || { echo "[ERROR] no 'curl' command found."; exit 1; }
command -v "unzip" >/dev/null || { echo "[ERROR] no 'unzip' command found."; exit 1; }

INFRASTATISTICS_LOCATION="${INFRASTATISTICS_LOCATION:-src/data/infra-statistics}"

trap 'rm -f infra-statistics-gh-pages.zip' EXIT

# Fetch infra-statistics repository zip and extract it
curl --silent --fail --output infra-statistics-gh-pages.zip --location "https://github.com/jenkins-infra/infra-statistics/archive/refs/heads/gh-pages.zip"
unzip -q -o infra-statistics-gh-pages.zip
rm -rf "${INFRASTATISTICS_LOCATION}"
mv infra-statistics-gh-pages "${INFRASTATISTICS_LOCATION}"
rm infra-statistics-gh-pages.zip

# Copy folders over public folder to serve their static files
for dir in jenkins-stats plugin-installation-trend pluginversions; do
    if [ ! -d "${INFRASTATISTICS_LOCATION}/${dir}"]; then
        echo "[ERROR] Expected directory not found: ${dir}"
        exit 1
    fi
    cp -r "${INFRASTATISTICS_LOCATION}/${dir}" public/
done

# Fetch update-center.actual.json
curl --silent --fail --output "${INFRASTATISTICS_LOCATION}/update-center.actual.json" --location "https://updates.jenkins.io/current/update-center.actual.json"
