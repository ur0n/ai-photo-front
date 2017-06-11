//TODO:Warningが消えない、フッターのタブバーと被って邪魔
import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Scene,
    Router,
} from 'react-native-router-flux';

import List from './containers/List'
import Camera from './containers/Camera'
import Season from './containers/Season'

import TabIcon from './components/TabIcon';

const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        backgroundColor: 'rgb(50, 207, 202)',
    },
});

const App = () => (
  <Router>
       <Scene key="root">
           <Scene
             key="tabbar" tabs
             tabBarStyle={styles.tabBar}
           >
               <Scene key="list" initial component={List} title="List" icon={TabIcon} />
               <Scene key="camera" component={Camera} title="Camera" icon={TabIcon} />
               <Scene key="Season" component={Season} title="Season" icon={TabIcon} />
           </Scene>
       </Scene>
   </Router>
);

export default App;
