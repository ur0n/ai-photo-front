import React from 'react';
import { View } from 'react-native';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  navBar: {
    marginTop: 65,
  },
  tabBar: {
    marginBottom: 50,
  }
}

const _containerStyle = props => {
  const { container, navBar, tabBar } = styles;

  if(!props.hideTabBar && !props.hideNavBar){
    return [container, navBar, tabBar];
  }else if(props.hideTabBar && !props.hideNavBar){
    return [container, navBar];
  }else if(props.hideNavBar && !props.hideTabBar){
    return [container, tabBar];
  }else{
    return container;
  }
}

export const ViewContainer = props => {
  return (
    <View style={_containerStyle(props)}>{props.children}</View>
  );
}
