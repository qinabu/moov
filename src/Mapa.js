/**
 * @providesModule Mapa
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Dimensions,
} = ReactNative;
var MapView = require('react-native-maps');
var GLOBAL = require('Globals');
var {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var Mapa = React.createClass({
    getInitialState: function () {
        return {
            line: [
                {latitude: 37.75825, longitude: -122.4224},
                {latitude: 37.76825, longitude: -122.4524},
                {latitude: 37.73825, longitude: -122.4424},
                {latitude: 37.74825, longitude: -122.4724},
            ],
            objs: [],
        }
    },
    componentDidMount: function() {
        GLOBAL.EMITTER.addListener('change', this.makeChangeEventMixin_handler);
    },
    componentWillUnmount: function() {
        GLOBAL.EMITTER.removeListener('change', this.makeChangeEventMixin_handler);
    },
    makeChangeEventMixin_handler: function(payload) {
        this.setState(payload);
        var lastPoint = payload.line.slice(-1)[0];
        if (lastPoint == null) {
            return
        }
        // this.onTrackIncrease(payload)
        this.setRegion({
            latitude: lastPoint.latitude,
            longitude: lastPoint.longitude,
            latitudeDelta: this.LATITUDE_DELTA,
            longitudeDelta: this.LONGITUDE_DELTA,
        });
    },

    renderLine: function() {
        return (
          <MapView.Polyline
            coordinates={this.state.line}
            strokeColor="#FF0000"
            strokeWidth={3}
            />
        )
    },

    renderObjs: function() {
        return this.state.objs.map(function(o) {
            return (
              <MapView.Marker
                coordinate={{latitude: o.lat, longitude: o.lon}}
                title={o.title}
                key={o.id}
                />
            )
        });
    },

    render: function() {
        return (
            <MapView
                ref={(ref) => {this._zimap = ref}}
                style={styles.map}
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                {this.renderLine()}
                {this.renderObjs()}
            </MapView>
        );
    },
    setRegion: function(region) {
        if (this._zimap) {
            this._zimap.animateToRegion(region);
        }
    },
});

var styles = StyleSheet.create({
    map: {
        flex: 1,
        flexDirection: 'column',
    },
});

module.exports = Mapa;
