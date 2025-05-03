#!/bin/bash

# Simple shell script to handle contact form submissions
# Usage: ./contact.sh

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Creating .env file..."
  echo "EMAIL_USER=tobiaribo@gmail.com" > .env
  echo "EMAIL_PASS=" >> .env
  echo ".env file created. Please edit it to add your email password."
  echo "Run: nano .env"
  exit 1
fi

# Check if EMAIL_PASS is set in .env
if ! grep -q "EMAIL_PASS=" .env || grep -q "EMAIL_PASS=$" .env; then
  echo "EMAIL_PASS is not set in .env file."
  echo "Please edit .env file to add your email password."
  echo "Run: nano .env"
  exit 1
fi

# Run the Node.js script
echo "Running contact form handler..."
node contact-handler.js
