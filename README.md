# React Native Bit Swiper
![platforms](https://img.shields.io/badge/platforms-ios%20%7C%20android-grightgreen)
[![npm](https://img.shields.io/npm/v/react-native-bit-swiper.svg?style=flat)](https://www.npmjs.com/package/react-native-bit-swiper)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

이 컴포넌트는 다양한 기능을 제공하는 React Native 용 Swiper/Carousel 컴포넌트입니다.

- 깜박임 없는 [`루프(Loop)`](docs/Examples.md#루프-loop), [`자동 스크롤(Autoplay)`](docs/Examples.md#자동-스크롤-autoplay) 기능을 제공합니다.
- 커스텀 가능한 [`페이지(Paginate)`](docs/Examples.md#페이지-스타일) 기능을 제공합니다.
- 활성/비활성 아이템의 스케일(Scale), 투명도(Opacity) 설정을 포함한 [`비활성 아이템 표시`](docs/Examples.md#비활성-아이템-표시) 기능을 제공합니다.
- [`아이템 정렬`](docs/Examples.md#아이템-정렬), [`아이템 스케일 정렬`](docs/Examples.md#아이템-스케일-정렬) 기능을 제공합니다.
- 다양한 기능을 실시간으로 테스트할 수 있는 [`예제 프로그램`](docs/Examples.md#예제-프로그램)을 제공합니다.

## 📖 문서
- [API 명세서 (API Reference)](docs/ApiReference.md) : 사용 가능한 Props, Event, Method 에 대한 상세 정보를 제공합니다.
- [예제 (Examples)](docs/Examples.md) : 다양한 예제 및 코드를 제공합니다.

## 📦 설치
```
npm install --save react-native-bit-swiper
```
또는
```
yarn add react-native-bit-swiper
```

## 🚀 사용

```javascript
import BitSwiper from 'react-native-bit-swiper';

<BitSwiper />
```

---
_각 예제의 제목을 클릭하면, 상세 정보 및 소스 코드를 확인할 수 있습니다._

<br/>

***![](docs/img/link.png) [기본](docs/Examples.md#기본)***

<a href="docs/Examples.md#기본"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_basic.gif" width="300" height="166" /></a><br/>
<br/>

***![](docs/img/link.png) [비활성 아이템 표시](docs/Examples.md#비활성-아이템-표시)***

<a href="docs/Examples.md#비활성-아이템-표시"><a href="docs/Examples.md#기본"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_inactive.gif" width="300" height="130" /></a><br/>
<br/>

***![](docs/img/link.png) [루프 (Loop)](docs/Examples.md#루프-loop)***

<a href="docs/Examples.md#루프-loop"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_loop.gif" width="300" height="130" /></a><br/>
<br/>

***![](docs/img/link.png) [자동 스크롤 (Autoplay)](docs/Examples.md#자동-스크롤-autoplay)***

<a href="docs/Examples.md#자동-스크롤-autoplay"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_autoplay.gif" width="300" height="130" /></a><br/>
 
<a href="docs/Examples.md#자동-스크롤-autoplay"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_autoplay_loop.gif" width="300" height="130" /></a><br/>
<br/>

***![](docs/img/link.png) [페이지 스타일](docs/Examples.md#페이지-스타일)***

<a href="docs/Examples.md#페이지-스타일"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_paginate.png" width="300" height="108" /></a><br/>
<br/>

***![](docs/img/link.png) [커스텀 페이지](docs/Examples.md#커스텀-페이지)***

<a href="docs/Examples.md#커스텀-페이지"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_custom_paginate.gif" width="300" height="138" /></a><br/>
<br/>

***![](docs/img/link.png) [아이템 정렬](docs/Examples.md#아이템-정렬)***

<a href="docs/Examples.md#아이템-정렬"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemalign_top.jpg" width="300" height="165" /></a><br/>

<a href="docs/Examples.md#아이템-정렬"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemalign_middle.jpg" width="300" height="165" /></a><br/>

<a href="docs/Examples.md#아이템-정렬"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemalign_bottom.jpg" width="300" height="165" /></a><br/>
<br/>

***![](docs/img/link.png) [아이템 스케일 정렬](docs/Examples.md#아이템-스케일-정렬)***

<a href="docs/Examples.md#아이템-스케일-정렬"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemscalealign_top.gif" width="300" height="128" /></a><br/>

<a href="docs/Examples.md#아이템-스케일-정렬"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemscalealign_middle.gif" width="300" height="128" /></a><br/>

<a href="docs/Examples.md#아이템-스케일-정렬"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemscalealign_bottom.gif" width="300" height="128" /></a><br/>
<br/>

***![](docs/img/link.png) [예제 프로그램](docs/Examples.md#예제-프로그램)***

<a href="docs/Examples.md#예제-프로그램"><img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_app.jpg" width="300" height="647" /></a><br/>
