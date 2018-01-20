import React from 'react';
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
  Right
} from 'native-base';
import { Photo } from './Photo';

const styles = {
  card: {
    height: 300,
    width: 300,
  },
  photo: {
    height: 200,
    width: 300,
  },
}

export const PhotoCard = props => (
  <Card style={styles.card}>
    <CardItem>
      <Left>
        <Body>
          <Text>{ props.title }</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem cardBody>
      <Photo fileName={ props.fileName } style={ styles.photo } />
    </CardItem>
  </Card>
);
