import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

export class DatePicker extends Component {
  constructor(props){
    super(props);
    this.maxYear = new Date().getFullYear();
    this.minYear = 1960;

    this.state = {
      era: this.props.defaultEra,
    }
  }

  _onValueChangeHandler(value){
    const { valueChangeHandler } = this.props;
    this.setState({era: value});
    valueChangeHandler(value);
  }

  render(){
    return (
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={`${this.state.era}`}
        onValueChange={(itemValue, itemIndex) => this._onValueChangeHandler(itemValue)}
      >
      {
        Array.from(Array(this.maxYear), (v, k) => this.minYear + k).filter(i => i <= this.maxYear).reverse().map(year => {
          return (
            <Picker.Item key={year} label={`${year}`} value={`${year}`} />
          );
        })
      }
      </Picker>
      </View>
    );
  }
}
