//TODO:Warningが消えない、フッターのタブバーと被って邪魔
import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';

import List from './containers/List';
import Camera from './containers/Camera';
import Season from './containers/Season';
import FromCameraRoll from './containers/FromCameraRoll';
import TabIcon from './components/TabIcon';

const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        backgroundColor: 'rgb(50, 207, 202)',
    }
});

const App = () => (
  <Router>
    <Scene key="root">
      <Scene key="tabbar" tabs tabBarStyle={styles.tabBar}>
        <Scene key="list" initial component={List} title="List" icon={TabIcon} />
        <Scene key="addPhoto" title="CameraRoll" icon={TabIcon} onPress={() => Actions.add()} />
        <Scene key="Season" component={Season} title="Season" icon={TabIcon} />
      </Scene>
      <Scene key="add" direction="vertical">
        <Scene key="addTabBar" tabs tabBarStyle={styles.tabBar} >
          <Scene key="cameraRoll" component={FromCameraRoll} title="CameraRoll" icon={TabIcon} leftTitle="Cancel" onLeft={Actions.pop} />
          <Scene key="camera" component={Camera} title="Camera" icon={TabIcon} />
          <Scene key="othre" component={Season} title="Season" icon={TabIcon} />
        </Scene>
      </Scene>
    </Scene>
  </Router>
);

export default App;
