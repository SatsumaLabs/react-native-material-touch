// @flow
// Copyright © 2018-2019 Satsuma Labs
// Written by George Steel <george.steel@gmail.com>

import React, {type Node, Component, type ComponentType} from 'react';
import {View, TouchableNativeFeedback, TouchableWithoutFeedback, Animated, Platform, Easing} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type TouchTileProps = $ReadOnly<{
    onPress: () => void,
    children: Node,
    color?: string,
    pressColor?: string,
    style?: ViewStyleProp,
}>;
export class TouchTileAnimated extends Component<TouchTileProps>{
    anim: Animated.Value;

    constructor(props: TouchTileProps) {
        super(props);
        this.anim = new Animated.Value(0);
    }

    onPressIn = () => {
        Animated.timing(this.anim, {toValue: 0.5, duration: 500, easing: Easing.out(Easing.back(2.5))}).start();
    };
    onPressOut = () => {
        Animated.sequence([
            Animated.timing(this.anim, {toValue: 1, duration: 100, easing: Easing.inOut(Easing.sin)}),
            Animated.timing(this.anim, {toValue: 0, duration: 500})
        ]).start();
    };

    render() {
        const bgAnim = this.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.color || 'transparent', this.props.pressColor || 'rgba(0,0,0,0.16)']});
        return <TouchableWithoutFeedback accessible={true} onPress={this.props.onPress}
            onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
            <Animated.View style={[this.props.style,{backgroundColor: bgAnim}]}>
                {this.props.children}
            </Animated.View>
        </TouchableWithoutFeedback>;
    }
}

const defRipple = TouchableNativeFeedback.Ripple('rgba(0,0,0,0.16)', false);

class TouchTileLollipop extends Component<TouchTileProps>{
    render() {
        const style = this.props.color ? [this.props.style, {backgroundColor: this.props.color}] : this.props.style;
        const ripple = this.props.pressColor ? TouchableNativeFeedback.Ripple(this.props.pressColor, false) : defRipple;

        return <TouchableNativeFeedback onPress={this.props.onPress} background={ripple}>
            <View style={style}>{this.props.children}</View>
        </TouchableNativeFeedback>;
    }
}

export const TouchTileIsNative = (Platform.OS === 'android' && Platform.Version >= 21);

const TouchTile = TouchTileIsNative ? TouchTileLollipop : TouchTileAnimated;
export default TouchTile;


type RoundTouchTileProps = $ReadOnly<{
    onPress: () => void,
    children: Node,
    color: string,
    pressColor: string,
    radius: number,
    outerStyle?: ViewStyleProp,
    innerStyle?: ViewStyleProp,
}>;

export function RoundTouchTileAnimated({innerStyle, outerStyle, radius, ...props}: RoundTouchTileProps) {
    return <TouchTileAnimated {...props} style={[outerStyle, innerStyle, {borderRadius: radius}]} />;
}

export function RoundTouchTileLollipop({onPress,children,color,pressColor,radius,outerStyle,innerStyle}: RoundTouchTileProps) {
    const style = [{backgroundColor: color, flex: 1, alignSelf: 'stretch', borderRadius: radius}, innerStyle];
    const ripple = TouchableNativeFeedback.Ripple(pressColor, true);
    return <View style={[outerStyle, {borderRadius: radius}]}>
        <TouchableNativeFeedback accessible={true} onPress={onPress} background={ripple}>
            <View style={style}>{children}</View>
        </TouchableNativeFeedback>
    </View>;
}

export const RoundTouchTile : ComponentType<RoundTouchTileProps> =
    TouchTileIsNative ? RoundTouchTileLollipop : RoundTouchTileAnimated;
