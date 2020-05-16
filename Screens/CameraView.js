import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs'


class CameraView extends Component{
  constructor(){
    super()
    this.state = {
      camera:null,
      isRecording: false,
      analyzeVid: false,
    }
    this.style = null
  }

  render(){
    // console.log(this.props)

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
    });
    
    // console.log("temp path " + RNFS.TemporaryDirectoryPath)
    // console.log("lib path " + RNFS.LibraryDirectoryPath)
    // console.log("doc path " + RNFS.DocumentDirectoryPath)

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.state.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') {
              return <View
                      style={{
                        flex: 1,
                        backgroundColor: 'lightgreen',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                    <Text>Waiting</Text>
                  </View>
            }
            let funcCall
            let buttonText

            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                {!this.state.isRecording && !this.state.analyzeVid ?
                  <TouchableOpacity onPress={() => this.takeVideo(this.state.camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> START </Text>
                  </TouchableOpacity> : null
                }
                {this.state.isRecording  ?
                  <TouchableOpacity onPress={() => this.stopVideo(this.state.camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> STOP </Text>
                  </TouchableOpacity> : null
                }
                {this.state.analyzeVid ?
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("VideoPreview")} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> ANALYZE </Text>
                  </TouchableOpacity> : null
                }


              </View>

            );
          }}
        </RNCamera>
      </View>
    )
  }

takeVideo = (camera) => {
    this.setState({isRecording: true})
    return async function(camera){

        // const options = { quality: RNCamera.Constants.VideoQuality.720p }
        const data = await camera.recordAsync()
        //  eslint-disable-next-line
        console.log(data.uri);
        let type = 'video'
        let album = 'Gruve'
        CameraRoll.save(data.uri, { type, album })
    }(camera);
  }

  // add something in this function to func to Call
  // ML models to get reps
stopVideo = (camera) => {
    this.setState({analyzeVid:true, isRecording: false })
    return async function(camera){
      camera.stopRecording()
    }(camera);

  }

analyzeVideo = (camera) => {
    this.setState({getReps: false})
  }

takePicture = (camera) => {
      return async function(camera){

          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          //  eslint-disable-next-line
          console.log(data.uri);
          CameraRoll.saveToCameraRoll(data.uri)

      }(camera);

    }
}

export default CameraView;
