'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    View,
    Text,
} = ReactNative;
var Btn = require('Btn');
var Geo = new(require('Geo'));
var Mapa = new(require('Mapa'));
var GLOBAL = require('Globals');

var Moov = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    {Mapa.render()}
                </View>
                <Btn/>
            </View>
        );
    },
});

Geo.setCallback(function(track) {
    var lastPoint = track.slice(-1)[0];
    if (!lastPoint) {
        return;
    }
    fetch('http://localhost:8001/location', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lat: lastPoint.coords.latitude,
            lng: lastPoint.coords.longitude,
        })
    }).then((resp) => {
        if (resp.status === 200 && resp.ok) {
            return resp.json();
        }
    }).then((obj) => {
        if (obj) {
            Geo.storeObj(obj);
            GLOBAL.EMITTER.emit('change', {
                line: [
                    {latitude: 39.73825, longitude: -124.4424},
                    {latitude: 39.74825, longitude: -124.4724},
                    {latitude: 39.75825, longitude: -124.4224},
                    {latitude: 39.76825, longitude: -124.4524},
                ]
            })
        }
    });
    Mapa.onTrackIncrease(track)
//    Liner.points.push(track[-1])
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    mapContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});

AppRegistry.registerComponent('Moov', () => Moov);
