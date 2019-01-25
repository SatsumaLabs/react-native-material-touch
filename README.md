react-native-material-touch
===========================

A simple touchable `View` with Material-style feedback for both Android and IOS. On Android ≥21 this Uses `TouchableNativeFeedback` to provide  on Android >21 (Lollipop) to provide the full ripple effect, and on other platforms it animates the view's background color to provide as close a replacement as possible using the `Animated` API.  Unlike the various `Touchable` components, this always introduces a single `View` into the layout hierarchy(which may be styled through the `style` and `color` props) and may contain any number of children.

Example
-------

```jsx
import TouchTile from 'react-native-material-touch';

...

render () {
    return <View>
        <TouchTile onPress={aPressed}>
            <Text>This is touchable with feedback,</Text>
            <Text>a transparent background,</Text>
            <Text>and multiple children</Text>
        </TouchTile>
        <TouchTile onPress={bPressed} color='#303f9f' pressColor='#5c6bc0' style={{elevation: 4}}>
            <Text>This is a colored button</Text>
        </TouchTile>
    </View>;
}
```

Rounded Corners
---------------

Due to the limitations of `TouchableNativeFeedback` (which does not respect the `borderRadius` style of the view it encloses) the default export should only be used for rectangular components otherwise corners will become square while pressed. There are two options to deal with these situations. The simplest is to force the use of the `Animated` based implementation even on Android by using the named export `TouchTileAnimated` instead of the default export.

Another named export `RoundTouchTile` keeps the use of native feedback by sandwiching `TouchableNativeFeedback` between two `View`s so that the outer one can provide bounding box clipping. This requires splitting the `style` into the props `outerStyle`, `innerStyle`, and `radius`, which control the styles of the outer and inner views and the border radius. In IOS these styles are merged and applied to a single view.
