import React from 'react';
import { View, StyleSheet, Platform, TouchableHighlight } from 'react-native';

class DefaultMarker extends React.Component {
  render() {
    return (
      <TouchableHighlight>
        <View
          style={
            this.props.enabled
              ? [
                  styles.markerStyle,
                  this.props.markerStyle,
                  this.props.pressed && styles.pressedMarkerStyle,
                  this.props.pressed && this.props.pressedMarkerStyle,
                ]
              : [
                  styles.markerStyle,
                  styles.disabled,
                  this.props.disabledMarkerStyle,
                ]
          }
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  markerStyle: {
    ...Platform.select({
      ios: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#4681D0',
        backgroundColor: '#FFFFFF',
        marginTop: 8,
      },
      android: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#4681D0',
        backgroundColor: '#FFFFFF',
      },
    //   web: {
    //     height: 30,
    //     width: 30,
    //     borderRadius: 30,
    //     borderWidth: 1,
    //     borderColor: '#4681D0',
    //     backgroundColor: '#4681D0',
    //   },
    }),
  },
  pressedMarkerStyle: {
    ...Platform.select({
    //   web: {},
      ios: {},
      android: {
        height: 20,
        width: 20,
        borderRadius: 20,
      },
    }),
  },
  disabled: {
    backgroundColor: '#d3d3d3',
  },
});

export default DefaultMarker;