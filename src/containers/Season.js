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
import { colors } from '../config';

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

  keyExtractor(item, index){
    return index;
  }

  renderItem({item}){
    if(item === undefined)return null;
    const ps = item.image.String;
    if(ps.substring(ps.length - 3, ps.length) !== "jpg") return null;

    return (
      <Image
        style={styles.photo}
        source={{uri: "https://s3-ap-northeast-1.amazonaws.com/shop-bot-view/" + item.image.String}}
        />
    );
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
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
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
    flex: 1,
    marginBottom: 50
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  photo: {
    margin: 1,
    borderRadius: 5,
    backgroundColor: colors.mintGreen,
    width: Season.dimensions.width,
    height: Season.dimensions.height,
  }
});

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
