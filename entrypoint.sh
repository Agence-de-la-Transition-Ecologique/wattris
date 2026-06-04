#!/bin/sh
set -e

echo "Installing dependencies..."
yarn install --frozen-lockfile

echo "Starting the application..."
yarn dev