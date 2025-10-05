#!/bin/bash

# Függőségek telepítése Docker konténerben
docker run --rm -v "$(pwd)/frontend:/app" --entrypoint pnpm idomi27/vue:26 install --dangerously-allow-all-builds

# Docker Compose indítása
docker compose up -d