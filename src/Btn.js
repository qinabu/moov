/**
 * @providesModule Btn
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Platform,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
} = ReactNative;

var Btn = React.createClass({
    buttonClicked: function() {
        var result = fetch('http://localhost:8001/location', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lat: 100.1,
                lng: 50.5,
            })
        });
    },
    render: function() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={styles.buttonContainer}>
                <TouchableElement
                    style={styles.button}
                    onPress={this.buttonClicked}>
                    <View>
                        <Text style={styles.buttonText}>
                            Take a glance at Cupertino
                        </Text>
                    </View>
                </TouchableElement>
            </View>
       );
    }
});

var styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    buttonText: {
    },
});

module.exports = Btn;
