import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
 } from 'react-native';

class SeasonTabBar extends React.Component {
  renderTabOption(name, page) {
  };

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <TouchableOpacity
        style={styles[name]}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
        >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: 'navy',
      bottom: -2
    };

    const left = {
          transform: [
            {
              translateX: this.props.scrollValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, containerWidth / numberOfTabs]
              })
            }
          ]
        };

    return (
      <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style]}>
        {
          this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return this.renderTab(name, page, isTabActive, this.props.goToPage);
          })
        }
        <Animated.View style={[tabUnderlineStyle, left, this.props.underlineStyle]} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexOne: {
    flex: 1
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  Spring: createSeasonView('#5ACB98'),
  Summer: createSeasonView('#FC675E'),
  Autumn: createSeasonView('#FFCC35'),
  Winter: createSeasonView('#4CA4DD')
});

function createSeasonView(color){
  return {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: color
  }
}

SeasonTabBar.propsTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: ViewPropTypes.style,
  renderTab: PropTypes.func,
  underlineStyle: ViewPropTypes.style
};

SeasonTabBar.defaultProps = {
  activeTextColor: 'black',
  inactiveTextColor: 'white',
  backgroundColor: null
}

module.exports = SeasonTabBar;
