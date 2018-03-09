#!/bin/bash

SOLR_FIELD="${1}"
URL="https://cn.dataone.org/cn/v2/query/solr/?q=*%3A*"
URL="${URL}&facet=on&rows=0&facet.limit=-1"
URL="${URL}&facet.field=${SOLR_FIELD}"
echo "URL: ${URL}"
curl -s "${URL}" | xml sel -t -m "//lst/lst/int" -v "@name" -n | wc -l

