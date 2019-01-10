import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TouchTile, {RoundTouchTile, TouchTileAnimated} from 'react-native-material-touch';

export default class App extends React.Component {
    state = {x: 0}
    buttonPressed = () => {
        this.setState(({x}) => ({x: x+1}));
    }
    render() {
        return (<SafeAreaView style={styles.container}>
            <TouchTile onPress={this.buttonPressed} style={styles.pad}>
                <Text>This is a touchable with feedback,</Text>
                <Text>a transparent background,</Text>
                <Text>and multiple children</Text>
            </TouchTile>
            <TouchTileAnimated onPress={this.buttonPressed} style={styles.pad}>
                <Text>This touchable uses Animated on all platforms</Text>
            </TouchTileAnimated>
            <View style={styles.pad}>
                <TouchTile onPress={this.buttonPressed} color='#303f9f' pressColor='#5c6bc0' style={styles.coloredBtn}>
                    <Text style={styles.white}>This is a colored button</Text>
                </TouchTile>
                <RoundTouchTile onPress={this.buttonPressed} color='#303f9f' pressColor='#5c6bc0' outerStyle={styles.roundOuter} innerStyle={styles.roundInner} radius={24}>
                    <Text style={styles.white}>This button has rounded corners and Android native feedback</Text>
                </RoundTouchTile>
                <TouchTileAnimated onPress={this.buttonPressed} color='#303f9f' pressColor='#5c6bc0' style={styles.roundAnim}>
                    <Text style={styles.white}>This button uses Animated, which supports rounded corners</Text>
                </TouchTileAnimated>
            </View>
            <View style={styles.pad}>
                <Text>A button was pressed {this.state.x} times.</Text>
            </View>
        </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 32,
  },
  pad: {
      paddingHorizontal: 16,
      paddingVertical: 8,
  },
  coloredBtn: {
      elevation: 4,
      marginVertical: 8,
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
  },
  roundOuter: {
      elevation: 4,
      height: 48,
      marginVertical: 8,
      marginHorizontal: 16,
  },
  roundInner: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: 'center',
  },
  roundAnim: {
      elevation: 4,
      marginVertical: 8,
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: 'center',
      height: 48,
      borderRadius: 24,
  },
  white: {
      color: '#ffffff'
  },
});
