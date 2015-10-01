(function () {
  'use strict';

  App.QrScannerComponent = Ember.Component.extend({
    decoder: null,
    active: false,
    result: null,
    imageSrc: null,
    error: null,
    connected: false,
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
    activeDidChange: Ember.observer('active', function () {
      if (this.get('active')) {
        this.play();
      } else {
        this.stop();
      }
    }),
    didInsertElement: function () {
      var self = this
        , decoder = new WebCodeCamJS(this.$('canvas').get(0))
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
              resultFunction: function(resText, lastImageSrc) {
                self.setProperties({
                  result: resText,
                  imageSrc: lastImageSrc
                });
              },
              cameraSuccess: function(stream) {
                self.set('connected', true);
                self.sendAction('didConnect', stream);
              },
              canPlayFunction: function() {
                self.sendAction('canPlay');
              },
              getDevicesError: function(err) {
                self.set('error', err);
                self.sendAction('deviceFailed', err);
              },
              getUserMediaError: function(err) {
                self.set('error', err);
                self.sendAction('userMediaFailed', err);
              },
              cameraError: function(err) {
                self.set('error', err);
                self.sendAction('cameraFailed', err);
              }
            });

      this.set('decoder', decoder);

      if (this.get('active')) {
        this.play();
      }
    },
    willDestroyElement: function () {
      this.stop();
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