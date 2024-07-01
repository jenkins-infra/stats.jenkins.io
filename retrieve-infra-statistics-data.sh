#!/bin/bash

set -o nounset
set -o errexit
set -x

command -v "curl" >/dev/null || { echo "[ERROR] no 'curl' command found."; exit 1; }
command -v "unzip" >/dev/null || { echo "[ERROR] no 'unzip' command found."; exit 1; }

INFRASTATISTICS_LOCATION="${INFRASTATISTICS_LOCATION:-src/data/infra-statistics}"

curl --silent --fail --output infra-statistics-gh-pages.zip --location "https://github.com/jenkins-infra/infra-statistics/archive/refs/heads/gh-pages.zip"
# Decompress silently and overwrite existing files
unzip -q -o infra-statistics-gh-pages.zip
mv infra-statistics-gh-pages "${INFRASTATISTICS_LOCATION}"
rm infra-statistics-gh-pages.zip
