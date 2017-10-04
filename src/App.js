//TODO:Warningが消えない、フッターのタブバーと被って邪魔
import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Scene,
    Router,
    Modal,
    Actions
} from 'react-native-router-flux';
import { colors } from './config';

import List from './containers/List';
import PhotoList from './containers/PhotoList';
import Camera from './containers/Camera';
import Season from './containers/Season';
import FromCameraRoll from './containers/FromCameraRoll';
import PostPhoto from './containers/PostPhoto';
import TabIcon from './components/TabIcon';

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.mintGreen,
    },
    navBar: {
      backgroundColor: colors.mintGreen,
    },
    navBarTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    leftTitle: {
      color: 'white'
    },
    rightTitle: {
      color: 'white',
    },
    leftButton: {
      backgroundColor: 'white'
    }
});

const App = () => (
  <Router style={{backgroundColor:'white'}}>
    <Scene key="root" navigationBarStyle={styles.navBar}>
      <Scene key="tabbar" tabs tabBarStyle={styles.tabBar}>
        <Scene
          key="list"
          initial
          component={PhotoList}
          title="List"
          icon={TabIcon}
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navBarTitle}
          />
        <Scene
          key="addPhoto"
          title="CameraRoll"
          icon={TabIcon}
          onPress={() => Actions.add()}
          />
        <Scene
          key="Season"
          component={Season}
          title="Season"
          icon={TabIcon}
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navBarTitle}
          />
      </Scene>
      <Scene key="add" direction="vertical">
        <Scene key="addTabBar" tabs tabBarStyle={styles.tabBar}>
          <Scene
            key="cameraRoll"
            panHandlers={null}
            component={FromCameraRoll}
            title="CameraRoll"
            icon={TabIcon}
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
            component={Camera}
            title="Camera"
            icon={TabIcon}
            leftTitle="Cancel"
            leftButtonTextStyle={styles.leftTitle}
            onLeft={Actions.pop}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
            />
        </Scene>
        <Scene
          key="postImage"
          component={PostPhoto}
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
