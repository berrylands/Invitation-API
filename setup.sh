#!/bin/bash

CTYPE="Content-Type: application/json"
COUCH_URL=""
COUCH_INVITES_DATABASE=""

# create users database (non-partitioned)
curl -X PUT "${COUCH_URL}/${COUCH_INVITES_DATABASE}"

# create index on invite UUID
curl -X POST -H "${CTYPE}" -d'{"index":{"fields": ["uuid"]},"name":"byUUID"}' "${COUCH_URL}/${COUCH_INVITES_DATABASE}/_index"

