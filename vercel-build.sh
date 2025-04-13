#!/bin/bash

echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "Building the application..."
npm run build

echo "Build completed!"
