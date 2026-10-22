#!/bin/sh
set -e

echo "Installing dependencies..."
yarn install --frozen-lockfile

echo "Cleaning cache..."
rm -rf .next/cache

echo "Starting the application..."
yarn dev