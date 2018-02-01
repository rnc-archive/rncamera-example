#!/bin/bash
if [ ! -f ios/Frameworks/FaceDetector/Frameworks/frameworks/FaceDetector.framework/FaceDetector ]; then
    echo "Downloading and copying GMV..."
    mkdir scripts/dirtemp
    curl -o scripts/dirtemp/temp.tar.gz 'https://dl.google.com/dl/cpdc/df83c97cbca53eaf/GoogleMobileVision-1.1.0.tar.gz' &> /dev/null
    tar -xvzf scripts/dirtemp/temp.tar.gz -C scripts/dirtemp &> /dev/null
    cp -r scripts/dirtemp/FaceDetector/Frameworks ios/Frameworks/FaceDetector
    rm -rf scripts/dirtemp
fi
