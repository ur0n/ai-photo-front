import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { fetchSeasonListFromAPI } from '../actions/season';

class Season extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getSeasonPhotoList("Spring");
  }

  render(){
    const { isFetched, seasonPhotoList, thisSeason } = this.props.season;
    const season = ['Spring', 'Summer', 'Autumn', 'Winter'];

    return (
      <View style={styles.container}>
        <View style={styles.seasonSelect}>
          {
            season.map((s, i) => {
              return (
                <TouchableHighlight style={styles[s]} key={i} onPress={() => this.props.getSeasonPhotoList(s)}>
                  <View key={i}>
                    <Text style={{color: 'white'}}>{s}</Text>
                  </View>
                </TouchableHighlight>
              )
          })
        }
        </View>
        <View style={styles.contents}>
          <ScrollView>
            <View style={styles.photoGrid}>
              {
                isFetched? seasonPhotoList[thisSeason].Photos.map((photo, i) => {
                  const ps = photo.image.String;
                  if(ps.substring(ps.length - 3, ps.length) === "jpg"){
                    return (
                      <View key={i}>
                        <Image style={styles.photo} source={{uri: "https://b.sakurastorage.jp/ai-photo/images/" + photo.image.String}} />
                      </View>
                    );
                  }else{
                    return null;
                  }
                }) : null
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  seasonSelect: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 70,
    marginBottom: 10
  },
  Spring: createSeasonView('#5ACB98'),
  Summer: createSeasonView('#FC675E'),
  Autumn: createSeasonView('#FFCC35'),
  Winter: createSeasonView('#4CA4DD'),
  contents: {
    flex: 9,
    paddingBottom: 51,
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  photoGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    flex: 1,
    margin: 1,
    borderRadius: 5,
    width: getPhotoSize(),
    height: getPhotoSize(),
  }
});

function createSeasonView(color){
  return {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: color,
  }
}

function getPhotoSize(){
  return Dimensions.get('window').width / 4 - 2;
}

function mapStateToProps (state) {
  return {
    season: state.season
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getSeasonPhotoList: season => dispatch(fetchSeasonListFromAPI(season))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Season);
