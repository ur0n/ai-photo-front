import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  RefreshControl,
  FlatList,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { fetchSeasonListFromAPI, onEndReached } from '../actions/season';
import SeasonTabBar from '../components/SeasonTabBar';

class Season extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getSeasonPhotoList(this.props.season.thisSeason);
  }

  render(){
    const { isFetched, seasonPhotoList, thisSeason } = this.props.season;
    const season = ['Spring', 'Summer', 'Autumn', 'Winter'];

    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{marginTop: 64, backgroundColor: 'rgba(240, 240, 240, 0)'}}
          renderTabBar={() => <SeasonTabBar />}
          onChangeTab={({i}) => this.props.getSeasonPhotoList(i)}
          >
          {
            season.map((s, i) => {
              return (
                <View style={styles.contents} tabLabel={s} key={i}>
                  <FlatList
                    contentContainerStyle={styles.photoGrid}
                    data={seasonPhotoList[thisSeason].Photos}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    />
                </View>
              )
            })
          }
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  photoGrid: {
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

function renderItem({item}){

  if(item === undefined)return null;

  const ps = item.image.String;
  if(ps.substring(ps.length - 3, ps.length) !== "jpg") return null;
  return (
    <Image style={styles.photo} source={{uri: "https://b.sakurastorage.jp/ai-photo/images/" + item.image.String}} />
  );
}

function keyExtractor(item, index){
  return index;
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
