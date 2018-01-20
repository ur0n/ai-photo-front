import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right } from 'native-base';
import { connect } from 'react-redux';

import {
  ViewContainer,
  PhotoCard
} from '../components';

import { getPhotoList, updatePhotoList } from '../actions/photoList';
import { colors } from '../config';


const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    height: 300,
    width: 300,
  },
  photo: {
    height: 200,
    width: 300,
  }
});

const mapStateToProps = state => {
  return {
    photoList: state.photoList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotoList: page => dispatch(getPhotoList(page)),
    updatePhotoList: () => dispatch(updatePhotoList())
  };
}

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

    const ps = item.image.String;
    const ext = ps.substring(ps.length -3, ps.length)

    if(ext === "jpg" || ext === "png"){
      return (
        <PhotoCard
          title={item.title.String}
          fileName={item.image.String}
        />
      );
    }
  }

  handleLoadMore(){
    const { page } = this.props.photoList;
    this.props.getPhotoList(page + 1);
    this.onEndReachedCalledDuringMomentum = true;
  }

  _handleRefresh(){
    const page = 1;
    this.setState({ refreshing: true });

    this.props.updatePhotoList().then(res => {
      this.setState({ refreshing: false })
    });
  }

  render(){
    const { isFetched, photoList } = this.props.photoList;
    return (
      <ViewContainer>
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
    </ViewContainer>
    );
  }
}

export const PhotoListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList);
