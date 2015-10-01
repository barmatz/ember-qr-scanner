(function () {
  'use strict';

  App.QrScannerComponent = Ember.Component.extend({
    decoder: null,
    decodeQrCodeRate: 5,
    decodeBarCodeRate: 5,
    frameRate: 15,
    width: 320,
    height: 240,
    videoMaxWidth: 1280,
    videoMaxHeight: 720,
    videoSourceId: true,
    audio: false,
    flipVertical: false,
    flipHorizontal: false,
    zoom: -1,
    beep: null,
    brightness: 0,
    autoBrightnessValue: false,
    grayScale: false,
    contrast: 0,
    threshold: 0,
    sharpness: null,
    didInsertElement: function () {
      var decoder = new WebCodeCamJS(this.$('canvas').get(0))
            .buildSelectMenu(this.$('select').get(0))
            .init({
              DecodeQRCodeRate: this.get('decodeQrCodeRate'),
              DecodeBarCodeRate: this.get('decodeBarCodeRate'),
              frameRate: this.get('frameRate'),
              width: this.get('width'),
              height: this.get('height'),
              constraints: {
                  video: {
                      mandatory: {
                          maxWidth: this.get('videoMaxWidth'),
                          maxHeight: this.get('videoMaxHeight')
                      },
                      optional: [{
                          sourceId: this.get('videoSourceId')
                      }]
                  },
                  audio: this.get('audio')
              },
              flipVertical: this.get('flipVertical'),
              flipHorizontal: this.get('flipHorizontal'),
              zoom: this.get('zoom'),
              beep: this.get('beep'),
              brightness: this.get('brightness'),
              autoBrightnessValue: this.get('autoBrightnessValue'),
              grayScale: this.get('grayScale'),
              contrast: this.get('contrast'),
              threshold: this.get('threshold'),
              sharpness: this.get('sharpness'),
              resultFunction: function(resText ,lastImageSrc) {
                console.log('resText: %s ,lastImageSrc: %s', resText ,lastImageSrc);
              },
              cameraSuccess: function(stream) {
                console.log('cameraSuccess', stream);
              },
              canPlayFunction: function() {
                console.log('canPlayFunction');
              },
              getDevicesError: function(err) {
                console.log('error', err);
              },
              getUserMediaError: function(err) {
                console.log('error', err);
              },
              cameraError: function(err) {
                console.log('error', err);
              }
            });

      this.set('decoder', decoder);
    },
    stop: function () {
      return this.get('decoder').stop();
    },
    play: function () {
      return this.get('decoder').play();
    },
    getLastImageSrc: function () {
      return this.get('decoder').getLastImageSrc();
    },
    decodeLocalImage: function (url) {
      return this.get('decoder').decodeLocalImage(url);
    },
    getOptimalZoom: function () {
      return this.get('decoder').getOptimalZoom();
    }
  });
}());