<script src="http://localhost:8097"></script>
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
import Video from 'react-native-video';
import RNFS from 'react-native-fs'

import testVid from '../testVid.mov'

class VideoPreview extends Component{
  constructor(){
    super()
    this.state = {
      video: null,
      player: null,
      tmpVid: null,
    }
  }

  componentDidMount(){

    // CameraRoll.getAlbums({
    //   assetType: 'All'
    // })
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Videos',
      groupName: 'Gruve',
      groupTypes:'Album'
    })
    .then(r => {
      console.log(r)
      console.log("r edge")
      console.log(JSON.stringify(r))
      // console.log("r title")
      // console.log(r.title)
      console.log("got video")
      this.setState({ video: r.edges[0] });

    })
    .catch((err) => {
      console.log("video fetch error")
       //Error Loading Videos
    });
  }


videoError = () => {
  console.log("couldnt load video")
}

  render(){
    var styles = StyleSheet.create({
      backgroundVideo: {
        position: 'absolute',
        top: 20,
        left: 0,
        bottom: 0,
        right: 0,
        marginTop:50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width:'500 !important',
        height:'500 !important',
      },
      container: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',

      }
    })

    // if(this.state.video){
    //   console.log("video.node")
    //   // console.log(this.state.video.node)
    //   console.log(this.state.video.node.image.uri)
    //   // this.state.video.node.image.uri
    //   let appleId = '6DBA0F0A-C246-4945-BB36-1C32007EC349'
    //   const uri = `assets-library://asset/asset.mov?id=${appleId}&ext=mov`;
    //   console.log(uri)
      // RNFS.exists(uri)
      // .then(r => {
      //   console.log(r)
      //   console.log("file exists")
      // })
    // }
    if(this.state.player){
      this.state.player.presentFullscreenPlayer();
    }

    let assetUri = 'assets-library://asset/asset.mov?id=DA47B320-D4A2-4972-8509-026709B0E5B5&ext=mov'
    RNFS.copyAssetsVideoIOS(assetUri, RNFS.TemporaryDirectoryPath + "temp.mov").then(res => {
    	const filePathUrl = "file://" + res;
      console.log(filePathUrl)
    	//filePathUrl works for me in <Video source={{uri: filePathUrl}} />
      RNFS.exists(filePathUrl)
      .then(r => {
        console.log(r)
      })
    });

    // return <View></View>
    let uri = ''
    return (
      <View style={styles.container}>
      <Video
        ref={ref => this.state.player = ref}
        source={{ uri: 'file:///private/var/mobile/Containers/Data/Application/B26E7253-09F9-445A-9B3F-4EB3A741BCB0/tmp/temp.mov' }}
         resizeMode={'cover'}
         repeat={true}
         paused = {true}
         style={{
             height: 200,
             width: 200,
         }}
         controls={true}
         onLoad={() => {
             this.state.player.seek(2);
         }} />
      </View>
    )
  }
}

export default VideoPreview

// {!this.state.video || !this.state.tmpVid ? null :
// <Video source={{uri: 'file:///private/var/mobile/Containers/Data/Application/F8803ABD-B0E7-4D23-953E-DC8484043604/tmp/temp.mov'}}   // Can be a URL or a local file.
//    ref={(ref) => {
//      this.state.player = ref
//    }}                                      // Store reference                // Callback when remote video is buffering
//    onError={this.videoError}               // Callback when video cannot be loaded
//    style={styles.backgroundVideo} />
// }


// assets-library://asset/F184D335-59F2-4F3A-86DC-F188E6DA5ABA.mov?id=9AE15A8B-D1DC-41A8-A1C9-D2CC57AD09B7&ext=mov
// const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;`
