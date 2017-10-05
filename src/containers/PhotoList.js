import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { fetchPhotosFromAPI } from '../actions/photoList';
import { colors } from '../config';

class PhotoList extends Component{
  constructor(props){
    super(props);

    this.state = {
      refreshing: false,
    }
  }

  componentDidMount(){
    this.props.getPhotoList(this.props.photoList.page);
  }

  keyExtractor(item, index){
    return index;
  }

  renderItem({item}){
    if(item === undefined)return null;
    console.log(item);
    const ps = item.image.String;
    const ext = ps.substring(ps.length -3, ps.length)
    if(ext === "jpg" || ext === "png"){
      return (
        <Image
          style={styles.photo}
          source={{uri: "https://s3-ap-northeast-1.amazonaws.com/shop-bot-view/" + item.image.String}}
          />
      )
    }
  }

          // source={{uri: "https://b.sakurastorage.jp/ai-photo/images/" + item.image.String}}
  handleLoadMore(){
    const { page } = this.props.photoList;
    this.props.getPhotoList(page + 1);
    this.onEndReachedCalledDuringMomentum = true;
  }

  _handleRefresh(){
    const page = 1;
    this.setState({ refreshing: true });

    this.props.getPhotoList(page).then(res => {
      this.setState({ refreshing: false })
    });
  }

  render(){
    const { isFetched, photoList } = this.props.photoList;
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.photoContainer}>
            <FlatList
              style={styles.list}
              data={photoList}
              numColumns={1}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              initialListSize={10}
              pageSize={10}
              onEndReached={this.handleLoadMore.bind(this)}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._handleRefresh.bind(this)}
                  />
              }
              />
          </View>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 50
  },
  contents: {
    flex: 1
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  photo: {
    height: 300,
    width: 300,
    margin: 1,
    borderRadius: 10,
    backgroundColor: colors.mintGreen,
  },
  list: {
    paddingRight: 40,
    paddingLeft: 40
  }
});

function mapStateToProps (state) {
  return {
    photoList: state.photoList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getPhotoList: page => dispatch(fetchPhotosFromAPI(page))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList);
