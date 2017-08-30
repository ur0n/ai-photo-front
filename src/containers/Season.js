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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { fetchSeasonListFromAPI, changeTab } from '../actions/season';
import SeasonTabBar from '../components/SeasonTabBar';

class Season extends Component {
  static dimensions = { width: getPhotoSize(), height: getPhotoSize() };
  constructor(props){
    super(props);
    this.season = ['Spring', 'Summer', 'Autumn', 'Winter'];
  }

  componentDidMount(){
    this.props.getSeasonPhotoList(this.props.season.thisSeason);
  }

  onChangeTab({i}){
    const { seasonPhotoList } = this.props.season;
    const thisSeason = this.season[i];
    seasonPhotoList[thisSeason].isFetched? this.props.changeTab(thisSeason) : this.props.getSeasonPhotoList(thisSeason);
  }

  render(){
    const { seasonPhotoList, thisSeason } = this.props.season;

    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{marginTop: 64}}
          renderTabBar={() => <SeasonTabBar />}
          onChangeTab={this.onChangeTab.bind(this)}
          >
          {
            this.season.map((s, i) => {
              return (
                <View style={styles.contents} tabLabel={s} key={i}>
                  <FlatList
                    data={seasonPhotoList[thisSeason].Photos}
                    numColumns={4}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    initialListSize={25}
                    pageSize={10}
                    />
                </View>
              )
            })
          }
        </ScrollableTabView>
      </View>
    )
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
  photo: {
    margin: 1,
    borderRadius: 5,
    backgroundColor: '#aff',
    width: Season.dimensions.width,
    height: Season.dimensions.height,
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
    getSeasonPhotoList: season => dispatch(fetchSeasonListFromAPI(season)),
    changeTab: page => dispatch(changeTab(page))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Season);
