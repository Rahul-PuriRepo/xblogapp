#!/bin/sh
# Exit script on error
set -e

cd assessment
rm -rf node_modules package-lock.json
 
npm install
node runCypress.js
 
# Run Python script
python3 process_filtered_logs.py cypressResults.json
 
# Check if assessment_result.json exists
if [ -f "assesment_result.json" ]; then
    cp assesment_result.json ..
    echo "Assessment results generated"
else
    echo "Python script failed!!!"
fi
