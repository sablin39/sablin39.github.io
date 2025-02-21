#!/bin/bash

# Install dependencies
npm install
cp ./themes/Kratos-Rebirth/_config.yml ./themes/Kratos-Rebirth/_config.example.yml
cp ./_config.kratos-rebirth.yml ./themes/Kratos-Rebirth/_config.yml
cd themes/Kratos-Rebirth
npm install
cd ../..

# Install Hexo CLI globally
# npm install -g hexo-cli --save

# Clean and generate static site
hexo clean
hexo g
