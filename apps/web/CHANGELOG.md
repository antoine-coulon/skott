# skott-webapp

## 2.1.1

### Patch Changes

- [#138](https://github.com/antoine-coulon/skott/pull/138) [`4a3bd27`](https://github.com/antoine-coulon/skott/commit/4a3bd277c0b9fabcd9e028ecb0c76cdddb957f4e) Thanks [@pedrolamas](https://github.com/pedrolamas)! - Fixes high severity vulnerability in lodash.\* dependency by replacing it with lodash-es

## 2.1.0

### Minor Changes

- [#131](https://github.com/antoine-coulon/skott/pull/131) [`777998c`](https://github.com/antoine-coulon/skott/commit/777998c33f52909b1e596a8ba05eec601bf1a57c) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Add hot application refresh through Server-Sent Events when watch mode is enabled on the backend

## 2.0.1

### Patch Changes

- [#116](https://github.com/antoine-coulon/skott/pull/116) [`2e80022`](https://github.com/antoine-coulon/skott/commit/2e80022ee988ba9997089369d4b3f30a14f3acb0) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Reduce package size by getting rid of unused prod deps as the project is shipped bundled

## 2.0.0

### Major Changes

- [#72](https://github.com/antoine-coulon/skott/pull/72) [`1d4b302`](https://github.com/antoine-coulon/skott/commit/1d4b3021310854ccb23cbe36a4b8a053b11445b8) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Introduce new skott web application (v2), can be used starting from skott@0.31.0
  No breaking changes introduced from a skott perspective, `skott --displayMode=webapp` is still the way to go.
