//TODO:Warningが消えない、フッターのタブバーと被って邪魔
import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Scene,
    Router,
    Modal,
    Actions
} from 'react-native-router-flux';

import { colors } from './config';
import TabIcon from './components/TabIcon';

import {
  HomeIcon,
  CameraRollIcon,
  SeasonIcon,
  UpCameraRollIcon
} from './components';

import {
  PhotoListScreen,
  CameraScreen,
  FromCameraRollScreen,
  SeasonScreen,
  PostPhotoScreen
} from './containers';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderColor: colors.whiteGray,
  },
  navBar: {
    backgroundColor: colors.white,
  },
  navBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  leftTitle: {
    color: colors.lightRed
  },
  rightTitle: {
    color: colors.lightRed,
  },
  leftButton: {
    backgroundColor: 'white'
  },
  navBarTitleImageStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    top: -73
  }
});

const App = () => (
  <Router>
    <Scene key="root" navigationBarStyle={styles.navBar}>
      <Scene key="tabbar" tabs tabBarStyle={styles.tabBar}>
        <Scene
          key="list"
          initial
          component={PhotoListScreen}
          title="List"
          navigationBarTitleImage={require("../assets/line/logo.png")}
          navigationBarTitleImageStyle={styles.navBarTitleImageStyle}
          navigationBarStyle={styles.navBar}
          icon={HomeIcon}
          tabBarBackgroundImage={require("../assets/line/home.png")}
          titleStyle={styles.navBarTitle}
          />
        <Scene
          key="addPhoto"
          title="CameraRoll"
          navigationBarTitleImage={require("../assets/line/logo.png")}
          navigationBarTitleImageStyle={styles.navBarTitleImageStyle}
          icon={CameraRollIcon}
          onPress={() => Actions.add()}
          />
        <Scene
          key="Season"
          component={SeasonScreen}
          title="Season"
          navigationBarTitleImage={require("../assets/line/logo.png")}
          navigationBarTitleImageStyle={styles.navBarTitleImageStyle}
          icon={SeasonIcon}
          navigationBarStyle={styles.navBar}
          />
      </Scene>
      <Scene key="add" direction="vertical">
        <Scene key="addTabBar" tabs tabBarStyle={styles.tabBar}>
          <Scene
            key="cameraRoll"
            panHandlers={null}
            component={FromCameraRollScreen}
            title="CameraRoll"
            navigationBarTitleImage={require("../assets/line/logo.png")}
            navigationBarTitleImageStyle={styles.navBarTitleImageStyle}
            icon={UpCameraRollIcon}
            leftTitle="Cancel"
            leftButtonTextStyle={styles.leftTitle}
            onLeft={Actions.pop}
            rightTitle="Next"
            rightButtonTextStyle={styles.rightTitle}
            onRight={() => Actions.postImage({isCameraRoll: true})}
            navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}
            />
          <Scene
            key="camera"
            panHandlers={null}
            component={CameraScreen}
            title="Camera"
            navigationBarTitleImage={require("../assets/line/logo.png")}
            navigationBarTitleImageStyle={styles.navBarTitleImageStyle}
            icon={CameraRollIcon}
            leftTitle="Cancel"
            leftButtonTextStyle={styles.leftTitle}
            onLeft={Actions.pop}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
            />
        </Scene>
        <Scene
          key="postImage"
          component={PostPhotoScreen}
          navigationBarTitleImage={require("../assets/line/logo.png")}
          navigationBarTitleImageStyle={styles.navBarTitleImageStyle}
          panHandlers={null}
          title="PostImage"
          icon={TabIcon}
          backButtonTextStyle={styles.leftTitle}
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navBarTitle}
          />
      </Scene>
    </Scene>
  </Router>
);

export default App;
