import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import { colors, images } from '../config';

const styles = StyleSheet.create({
  seasonSelect: {
    flex: 2,
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  seasonButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formKey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {
    alignSelf: 'flex-start',
  },
  selectContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.lightRed,
  },
  inactive: {
    backgroundColor: colors.lightBlue,
  },
  buttonImage: {
    width: 44,
    height: 44,
  }
});

const SeasonButton = props => {
  console.log(props);
  return (
    <View style={styles.seasonButtonContainer}>
      <TouchableHighlight
        style={[styles.imageOuter, props.isSelected? styles.active : styles.inactive]}
        onPress={() => props.selectSeasonHandler(props.season)}
        underlayColor={colors.lightGray}
      >
        <Image
          style={styles.buttonImage}
          source={images[props.season + '_white']}
          resizeMode='contain'
        />
      </TouchableHighlight>
    </View>
  );
}

export class SeasonSelect extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: '',
    }
  }

  _onSelectSeasonHandler(season){
    this.setState({selected: season})
    this.props.selectSeasonHandler(season);
  }

  render(){
    return (
      <View style={styles.seasonSelect}>
        <View style={styles.formKey}>
          <Text style={styles.formText}> 季節 </Text>
        </View>
        <View style={styles.selectContainer}>
          {
            ['spring', 'summer', 'autumn', 'winter'].map((season, i) => (
              <SeasonButton
                key={i}
                isSelected={this.state.selected === season}
                season={season}
                selectSeasonHandler={season => this._onSelectSeasonHandler(season)}
              />
            ))
          }
        </View>
      </View>
    );
  }
}
