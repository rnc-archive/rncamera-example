import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Dimensions } from 'react-native';
const landmarkSize = 2;
const field = 40; // size of View, which check landmark entry

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

// <View
//   style={{
//     flex: 0.1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     alignSelf: 'center',
//   }}
// >
//   <TouchableOpacity
//     style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
//     onPress={this.takePicture.bind(this)}
//   >
//     <Text style={styles.flipText}> SNAP </Text>
//   </TouchableOpacity>
// </View>

const {height, width} = Dimensions.get('window');

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'front',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],
    checkView: 40,
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality["288p"],
    },
    isRecording: false
  };

  ;

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  takePicture = async function() {
    console.log('12121212');
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        console.log('data: ', data);
      });
    }
  };


  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </View>
    );
  }

  makePhoto() {
    return console.log('323232323');
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );

    const positionLeftEye = face.leftEyePosition;
    const positionRightEye = face.rightEyePosition;
    const positionLeftCheek = face.leftCheekPosition;
    const positionRightCheek = face.rightCheekPosition;
    const positionNose = face.noseBasePosition;
    const positionBottomMouth = face.bottomMouthPosition;
    const positionLeftMouth = face.leftMouthPosition;
    const positionRightMouth = face.rightMouthPosition;
    if (
      positionLeftEye &&
      positionRightEye &&
      positionLeftCheek &&
      positionRightCheek &&
      positionNose &&
      positionBottomMouth &&
      positionLeftMouth &&
      positionRightMouth
    ) {
      if ((face.leftEyePosition.x <= width/3.5 + field) && (face.leftEyePosition.x >= width/3.5) &&
         (face.leftEyePosition.y <= height/2.5 + field) && (face.leftEyePosition.y >= height/2.5) &&
         (face.rightEyePosition.x <= width - width/3.5) && (face.rightEyePosition.x >= width - width/3.5 - field) &&
         (face.rightEyePosition.y <= height/2.5 + field) && (face.rightEyePosition.y >= height/2.5) &&
         (face.leftCheekPosition.x <= width/3.7 + field) && (face.leftCheekPosition.x >= width/3.7) &&
         (face.leftCheekPosition.y <= height/2 + field) && (face.leftCheekPosition.y >= height/2) &&
         (face.rightCheekPosition.x <= width - width/3.7) && (face.rightCheekPosition.x >= width - width/3.7 - field) &&
         (face.rightCheekPosition.y <= height/2 + field) && (face.rightCheekPosition.y >= height/2) &&
         (face.noseBasePosition.x <= width/2 + field * 0.5) && (face.noseBasePosition.x >= width/2 - field * 0.5) &&
         (face.noseBasePosition.y <= height/1.9 + field) && (face.noseBasePosition.y >= height/1.9) &&
         (face.bottomMouthPosition.x <= width/2 + field * 0.5) && (face.bottomMouthPosition.x >= width/2 - field * 0.5) &&
         (face.bottomMouthPosition.y <= height/1.65 + field) && (face.bottomMouthPosition.y >= height/1.65) &&
         (face.leftMouthPosition.x <= width/2 - 20) && (face.leftMouthPosition.x >= width/2 - 20 - field) &&
         (face.leftMouthPosition.y <= height/1.75 + field) && (face.leftMouthPosition.y >= height/1.75) &&
         (face.rightMouthPosition.x <= width - (width/2 - 20) + field) && (face.rightMouthPosition.x >= width - (width/2 - 20)) &&
         (face.rightMouthPosition.y <= height/1.75 + field) && (face.rightMouthPosition.y >= height/1.75)) {
           console.log('make a photo')
           this.camera.takePictureAsync().then(data => {
             console.log('data: ', data);
           // this.makePhoto;
           // this.takePicture();
         }
    }
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderFace)}
      </View>
    );
  }

  renderLandmarks() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderLandmarksOfFace)}
      </View>
    );
  }


  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={'front'}
        autoFocus={'on'}
        ratio={this.state.ratio}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={this.onFacesDetected}
        onFaceDetectionError={this.onFaceDetectionError}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View key='leftEye'
          style={[styles.checkView, { top: height/2.5, left: width/3.5 }]}
        />
        <View key='rightEye'
          style={[styles.checkView, { top: height/2.5, left: width - width/3.5 - field }]}
        />
        <View key='leftCheek'
          style={[styles.checkView, { top: height/2, left: width/3.7 }]}
        />
        <View key='rightCheek'
          style={[styles.checkView, { top: height/2, left: width - width/3.7 - field }]}
        />
        <View key='nose'
          style={[styles.checkView, { top: height/1.9, left: width/2 - field * 0.5 }]}
        />
        <View key='bottmMouth'
          style={[styles.checkView, { top: height/1.65, left: width/2 - field * 0.5 }]}
        />
        <View key='leftMouth'
          style={[styles.checkView, {  top: height/1.75, left: width/2 - 20 - field}]}
        />
        <View key='rightMouth'
          style={[styles.checkView, {  top: height/1.75, left: width - (width/2 - 20) }]}
        />

        {this.renderFaces()}
        {this.renderLandmarks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  checkView: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderColor: 'yellow',
    borderWidth: 1,
  }
});
