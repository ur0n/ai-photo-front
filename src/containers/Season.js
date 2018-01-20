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
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { SeasonTabBar, ViewContainer } from '../components';
import { fetchSeasonListFromAPI, changeTab } from '../actions/season';
import { colors } from '../config';

const getPhotoSize = () => Dimensions.get('window').width / 4 - 3;
const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    margin: 1,
    backgroundColor: colors.whilteGray,
    width: getPhotoSize(),
    height: getPhotoSize(),
  }
});

const mapStateToProps = state => {
  return {
    season: state.season
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getSeasonPhotoList: season => dispatch(fetchSeasonListFromAPI(season)),
    changeTab: page => dispatch(changeTab(page))
  };
}

class Season extends Component {
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

    return (
      <CachedImage
        style={styles.photo}
        source={{uri: "https://s3-ap-northeast-1.amazonaws.com/shop-bot-view/" + item}}
        />
    );
  }

  render(){
    const { seasonPhotoList, thisSeason } = this.props.season;
    return (
      <ViewContainer>
        <ScrollableTabView
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
      </ViewContainer>
    )
  }
}

export const SeasonScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Season);
