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
import { getPhotoList, updatePhotoList } from '../actions/photoList';
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
    const ps = item.image.String;
    const ext = ps.substring(ps.length -3, ps.length)
    if(ext === "jpg" || ext === "png"){
      return (
          <Card style={styles.photo}>
            <CardItem>
              <Left>
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: "https://s3-ap-northeast-1.amazonaws.com/shop-bot-view/" + item.image.String}} style={{height: 200, width: 300, flex: 1}}/>
            </CardItem>
          </Card>
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
  },
  list: {
  }
});

function mapStateToProps (state) {
  return {
    photoList: state.photoList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getPhotoList: page => dispatch(getPhotoList(page)),
    updatePhotoList: () => dispatch(updatePhotoList())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList);
