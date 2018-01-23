import React, { Component } from 'react';
import {
  View,
  Modal,
  Picker,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  TouchableHighlight,
} from 'react-native';
import { ViewContainer } from './ViewContainer';
import { DatePicker } from './DatePicker';
import { colors } from '../config';

const styles = StyleSheet.create({
  eraFormContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
  },
  pickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  cancel: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 3,
  },
  cancelButton: {
  },
  ok: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 3,
  },
  okButton: {

  },
  picker: {
    flex: 4,
    alignSelf: 'stretch',
  },
  display: {
    flex: 1,
    flexDirection: 'row',
  },
  formKey: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eraDisplay: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eraText: {
    alignSelf: 'flex-end',
    color: colors.lightGray,
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export class EraForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      era: this.props.era,
      unsettledEra: this.props.era,
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
    };
  }

  static defaultProps = {
    era: new Date().getFullYear(),
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,
  }

  _onValueChangeHandler(value){
    this.setState({unsettledEra: value});
  }

  _onPressMask(){
    this._setModalVisible(false);
  }

  _onPressCancel(){
    this._setModalVisible(false);
  }

  _onPressOk(){
    this.setState({era: this.state.unsettledEra});
    this.props.eraChangeHandler(this.state.unsettledEra);
    this._setModalVisible(false);
  }

  _setModalVisible(isVisible){
    if(isVisible){
      this.setState({modalVisible:true});
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.props.height,
          duradion: 100,
        }
      ).start();
    }else{
      this.setState({modalVisible:false});
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.props.height,
          duradion: 100,
        }
      ).start();
    }
  }

  render(){
    return (
      <View style={styles.eraFormContainer}>
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'
          transparent={true}
          onRequestClose={() => this._setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableHighlight
              style={styles.pickerMask}
              activeOpacity={1}
              underlayColor={colors.underlayBlack}
              onPress={() => this._onPressMask()}
            >
              <View style={{flex: 1}}/>
            </TouchableHighlight>
            <Animated.View style={[
              styles.datePickerCon,
              {height: this.state.animatedHeight}
            ]} >
              <View style={styles.innerContainer}>
                <View style={styles.buttons}>
                  <View style={styles.cancel}>
                    <Button
                      style={styles.cancelButton}
                      title="キャンセル"
                      onPress={() => this._onPressCancel()}
                    />
                  </View>
                  <View style={styles.ok}>
                    <Button
                      style={styles.okButton}
                      onPress={() => this._onPressOk()}
                      title="完了"
                    />
                  </View>
                </View>
                <View style={styles.picker}>
                  <DatePicker defaultEra={this.state.era} valueChangeHandler={value => this._onValueChangeHandler(value)}/>
                </View>
              </View>
            </Animated.View>
          </View>
        </Modal>
        <View style={styles.display}>
          <View style={styles.formKey}>
            <Text> 時代　</Text>
          </View>
          <View style={styles.eraDisplay}>
            <Text style={styles.eraText}>{this.state.era}</Text>
          </View>
          <View style={styles.modalButton}>
            <Button
              onPress={() => this._setModalVisible(true)}
              title=">"
            />
          </View>
        </View>
      </View>
    );
  }
}
