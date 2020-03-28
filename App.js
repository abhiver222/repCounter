/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Hello World</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      camera:null,
      isRecording: false,
      getReps: false
    };
  }

  render(){
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
                {!this.state.isRecording && !this.state.getReps ?
                <TouchableOpacity onPress={() => this.takeVideo(this.state.camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> START </Text>
                </TouchableOpacity> : null
                }
                {this.state.isRecording && !this.state.getReps ?
                <TouchableOpacity onPress={() => this.stopVideo(this.state.camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> STOP </Text>
                </TouchableOpacity> : null
                }
                {this.state.getReps ?
                <TouchableOpacity onPress={() => this.takeVideo(this.state.camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> START </Text>
                </TouchableOpacity> : null
                }

              </View>

            );
          }}
        </RNCamera>
      </View>
    );
  }

  takeVideo = (camera) => {
    this.setState({isRecording: true, getReps: false})
    return async function(camera){

        // const options = { quality: RNCamera.Constants.VideoQuality.720p }
        const data = await camera.recordAsync()
        //  eslint-disable-next-line
        console.log(data.uri);
        let type = 'video'
        let album = 'repCounter'
        CameraRoll.save(data.uri, { type, album })

    }(camera);
  }

  stopVideo = (camera) => {
    this.setState({getReps: true, isRecording: false })
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

};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
