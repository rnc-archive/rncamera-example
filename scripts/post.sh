#!/bin/bash
if [ ! -f ios/Frameworks/FaceDetector/Frameworks/frameworks/FaceDetector.framework/FaceDetector ]; then
    echo "Downloading and copying GMV..."
    mkdir -p ios/Frameworks/FaceDetector
    curl -sSL 'https://dl.google.com/dl/cpdc/df83c97cbca53eaf/GoogleMobileVision-1.1.0.tar.gz' | tar xz -C ios/Frameworks/FaceDetector --strip-components=2 FaceDetector
fi