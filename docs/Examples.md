# 🚀 React Native Bit Swiper 예제 (Examples)

이 문서는 React Native Bit Swiper 의 다양한 예제 및 코드를 제공합니다.

## 목차

- [`기본`](#기본)
- [`비활성 아이템 표시`](#비활성-아이템-표시)
- [`루프 (Loop)`](#루프-loop)
- [`자동 스크롤 (Autoplay)`](#자동-스크롤-autoplay)
- [`페이지 스타일`](#페이지-스타일)
- [`커스텀 페이지`](#커스텀-페이지)
- [`아이템 정렬`](#아이템-정렬)
- [`아이템 스케일 정렬`](#아이템-스케일-정렬)
- [`다른 ScrollView 내에서 사용`](#다른-scrollview-내에서-사용)
- [`예제 프로그램`](#예제-프로그램)

## `기본`[⬆](#목차)
[`items`](ApiReference.md#items) 에 아이템 목록을 설정하고,
[`onItemRender`](ApiReference.md#onitemrender) 에서 각 아이템의 UI를 렌더링합니다.

[`initItemIndex`](ApiReference.md#inititemindex) 로 최초에 활성화 할 아이템의 지정할 수 있습니다.

[`onItemIndexChange`](ApiReference.md#onitemindexchange)
[`onItemIndexChanging`](ApiReference.md#onitemindexchanging)
이벤트에서 변경되는 활성 아이템의 `index` 를 확인할 수 있습니다.

<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_basic.gif" width="300" height="166" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  onItemRender={(item, index) => (
    <View key={index} style={{height: 200}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`items`](ApiReference.md#items)
> [`initItemIndex`](ApiReference.md#inititemindex)

> 관련 Events :
> [`onItemRender`](ApiReference.md#onitemrender)
> [`onItemIndexChange`](ApiReference.md#onitemindexchange)
> [`onItemIndexChanging`](ApiReference.md#onitemindexchanging)
 
> 전체 소스 : [/docs/examples/Basic.js](examples/Basic.js)

## `비활성 아이템 표시`[⬆](#목차)
[`itemWidth`](ApiReference.md#itemwidth) 또는
[`activeItemScale`](ApiReference.md#activeitemscale)
로 활성 아이템의 크기를 100% 이하로 조정하고,
[`inactiveItemOffset`](ApiReference.md#inactiveitemoffset)
값을 설정하면, 활성 아이템의 양 옆에 비활성 아이템을 표시할 수 있습니다.

[`activeItemOpacity`](ApiReference.md#activeitemopacity)
값으로 활성 아이템의 투명도를 조절할 수 있습니다.

[`inactiveItemScale`](ApiReference.md#inactiveitemscale)
[`inactiveItemOpacity`](ApiReference.md#inactiveitemopacity)
값으로 비활성 아이템의 크기 및 투명도를 조절할 수 있습니다.

<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_inactive.gif" width="300" height="130" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%" // 활성 아이템의 넓이
  inactiveItemScale={0.8} // 비활성 아이템의 스케일
  inactiveItemOpacity={0.5} // 비활성 아이템의 투명도
  inactiveItemOffset={30} // 비활성 아이템 표시 넓이
  onItemRender={(item, index) => (
    <View key={index} style={{height: 150}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`itemWidth`](ApiReference.md#itemwidth)
> [`activeItemScale`](ApiReference.md#activeitemscale)
> [`activeItemOpacity`](ApiReference.md#activeitemopacity)
> [`inactiveItemScale`](ApiReference.md#inactiveitemscale)
> [`inactiveItemOpacity`](ApiReference.md#inactiveitemopacity)
> [`inactiveItemOffset`](ApiReference.md#inactiveitemoffset)

> 전체 소스 : [/docs/examples/Inactive.js](examples/Inactive.js)

## `루프 (Loop)`[⬆](#목차)
[`loop`](ApiReference.md#loop)
값을 `true`로 설정하면, 좌우로 무한히 스크롤할 수 있는 루프 (Loop) 기능을 사용할 수 있습니다.

아이템이 1개 일 때는 기본적으로 루프가 적용되지 않습니다.
[`loopSingleItem`](ApiReference.md#loopsingleitem)
값을 `true`로 설정하여, 아이템이 1개 일 때 루프를 적용할 수 있습니다.

[`loopCloneCount`](ApiReference.md#loopclonecount)
값으로 기본 아이템 목록 양 옆에 몇개의 아이템을 복사할지 설정할 수 있습니다.
값을 `4` 로 설정하면, 왼쪽에 4개, 오른쪽에 4개를 복사합니다. 

루프 사용 시 깜박임을 방지하기 위해,
[`loopCloneCount`](ApiReference.md#loopclonecount)
의 최소값이 플렛폼 별로 다음과 같이 자동 설정됩니다.

| 플렛폼    | 아이템 수 | 최소값  |
| :---:   | :---:   | :---: |
| iOS     | 모두     | 1     |
| Android | 1개     | 3     |
| Android | 2개     | 4     |
| Android | 3개 이상  | 1     | 

<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_loop.gif" width="300" height="130" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%"
  inactiveItemScale={0.8}
  inactiveItemOpacity={0.5}
  inactiveItemOffset={30}
  loop // 루프 사용
  loopSingleItem // 아이템이 1개 일때 루프 사용
  onItemRender={(item, index) => (
    <View key={index} style={{height: 150}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`loop`](ApiReference.md#loop)
> [`loopSingleItem`](ApiReference.md#loopsingleitem)
> [`loopCloneCount`](ApiReference.md#loopclonecount)

> 전체 소스 : [/docs/examples/Loop.js](examples/Loop.js)

## `자동 스크롤 (Autoplay)`[⬆](#목차)
[`autoplay`](ApiReference.md#autoplay)
값을 `true`로 설정하면, 자동 스크롤 (Autoplay) 기능을 사용할 수 있습니다.

[`autoplayDelay`](ApiReference.md#autoplaydelay) 값으로 최초 자동 스크롤 전에 지연할 시간을 설정할 수 있습니다.

[`autoplayInterval`](ApiReference.md#autoplayinterval) 값으로 자동 스크롤 시간 간격을 설정할 수 있습니다.

_루프를 적용하지 않은 자동 스크롤_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_autoplay.gif" width="300" height="130" /><br/>

_루프를 적용한 자동 스크롤_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_autoplay_loop.gif" width="300" height="130" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%"
  inactiveItemScale={0.8}
  inactiveItemOpacity={0.5}
  inactiveItemOffset={30}
  loop
  autoplay // 자동 스크롤 사용
  autoplayDelay={1000} // 자동 스크롤 최초 대기 시간 (1초)
  autoplayInterval={1000} // 자동 스크롤 시간 간격 (1초)
  onItemRender={(item, index) => (
    <View key={index} style={{height: 150}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`autoplay`](ApiReference.md#autoplay)
> [`autoplayDelay`](ApiReference.md#autoplaydelay)
> [`autoplayInterval`](ApiReference.md#autoplayinterval)

> 전체 소스 : [/docs/examples/Autoplay.js](examples/Autoplay.js)

## `페이지 스타일`[⬆](#목차)
[`paginateStyle`](ApiReference.md#paginatestyle)
에 페이지 컨테이너의 스타일을 설정할 수 있습니다.
기본 컨테이너 스타일에 **병합**됩니다.
 
[`paginateDotStyle`](ApiReference.md#paginatedotstyle)
에 기본 도트 스타일을 설정할 수 있습니다.
기본 도트 스타일이 **대체**됩니다.

[`paginateActivDotStyle`](ApiReference.md#paginateactivdotstyle)
에 활성 도트 스타일을 설정할 수 있습니다.
기본 활성 도트 스타일이 **대체**됩니다.

<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_paginate.png" width="300" height="108" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%"
  inactiveItemScale={0.8}
  inactiveItemOpacity={0.5}
  inactiveItemOffset={30}
  loop
  // 페이지 컨테이너 스타일
  paginateStyle={{
    marginTop: -20,
  }}
  // 기본 도트 스타일
  paginateDotStyle={{
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  }}
  // 활성 도트 스타일
  paginateActiveDotStyle={{
    backgroundColor: 'rgba(255, 255, 255, .8)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  }}
  onItemRender={(item, index) => (
    <View key={index} style={{height: 150}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`paginateStyle`](ApiReference.md#paginatestyle)
> [`paginateDotStyle`](ApiReference.md#paginatedotstyle)
> [`paginateActivDotStyle`](ApiReference.md#paginateactivdotstyle)

> 전체 소스 : [/docs/examples/Paginate.js](examples/Paginate.js)

## `커스텀 페이지`[⬆](#목차)
[`onPaginateDotRender`](ApiReference.md#onpaginatedotrender)
이벤트를 활용하여, 커스텀 페이지를 구성할 수 있습니다.

이 이벤트를 설정하면,
[`paginateDotStyle`](ApiReference.md#paginatedotstyle)
[`paginateActivDotStyle`](ApiReference.md#paginateactivdotstyle)
설정은 무시됩니다.

<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_custom_paginate.gif" width="300" height="138" /><br/>

```javascript
<BitSwiper
  ref={swiperRef}
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%"
  inactiveItemScale={0.8}
  inactiveItemOpacity={0.5}
  inactiveItemOffset={30}
  loop
  onItemRender={(item, index) => (
    <View key={index} style={{height: 150}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
  // 커스텀 페이지 render
  onPaginateDotRender={(index, active) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.7}
      style={active ? styles.customActiveDot : styles.customDot}
      onPress={() => {
        if (swiperRef.current) {
          swiperRef.current.activeItem(index);
        }
      }}>
      <Text
        style={active ? styles.customActiveDotText : styles.customDotText}>
        {index + 1}
      </Text>
    </TouchableOpacity>
  )}
/>

const styles = StyleSheet.create({
  customDot: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  customDotText: {
    color: 'white',
    lineHeight: 20,
  },
  customActiveDot: {
    backgroundColor: '#f18904',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  customActiveDotText: {
    color: 'white',
    lineHeight: 20,
    fontWeight: 'bold',
  },
});
```

> 관련 Events :
> [`onPaginateDotRender`](ApiReference.md#onpaginatedotrender)
> [`paginateStyle`](ApiReference.md#paginatestyle)
> [`paginateDotStyle`](ApiReference.md#paginatedotstyle)
> [`paginateActivDotStyle`](ApiReference.md#paginateactivdotstyle)

> 전체 소스 : [/docs/examples/CustomPaginate.js](examples/CustomPaginate.js)

## `아이템 정렬`[⬆](#목차)
각 아이템의 높이가 다른 경우, [`itemAlign`](ApiReference.md#itemalign) 값을 설정하여 어느 위치로 기준할지 정할 수 있습니다. 

_상단 정렬 (top)_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemalign_top.jpg" width="300" height="165" /><br/>

_중간 정렬 (middle)_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemalign_middle.jpg" width="300" height="165" /><br/>

_하단 정렬 (bottom)_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemalign_bottom.jpg" width="300" height="165" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%"
  itemAlign="top" // 정렬 위치 (top, middle, bottom)
  inactiveItemOffset={30}
  loop
  onItemRender={(item, index) => (
    <View key={index} style={{height: [150, 180, 200][index]}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`itemAlign`](ApiReference.md#itemalign)

> 전체 소스 : [/docs/examples/ItemAlign.js](examples/ItemAlign.js)

## `아이템 스케일 정렬`[⬆](#목차)
[`activeItemScale`](ApiReference.md#activeitemscale)
[`inactiveItemScale`](ApiReference.md#inactiveitemscale)
로 스케일을 지정했을 경우,
[`itemScaleAlign`](ApiReference.md#itemscalealign)
값을 설정하여 어느 위치로 기준할지 정할 수 있습니다.

_상단 정렬 (top)_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemscalealign_top.gif" width="300" height="128" /><br/>

_중간 정렬 (middle)_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemscalealign_middle.gif" width="300" height="128" /><br/>

_하단 정렬 (bottom)_<br/>
<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_itemscalealign_bottom.gif" width="300" height="128" /><br/>

```javascript
<BitSwiper
  items={['Item 1', 'Item 2', 'Item 3']}
  itemWidth="80%"
  itemScaleAlign="middle" // 정렬 위치 (top, middle, bottom)
  inactiveItemScale={0.8}
  inactiveItemOffset={30}
  loop
  onItemRender={(item, index) => (
    <View key={index} style={{height: 150}}>
      <Image
        source={Images[index]}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  )}
/>
```

> 관련 Props :
> [`itemScaleAlign`](ApiReference.md#itemscalealign)
> [`activeItemScale`](ApiReference.md#activeitemscale)
> [`inactiveItemScale`](ApiReference.md#inactiveitemscale)

> 전체 소스 : [/docs/examples/ItemScaleAlign.js](examples/ItemScaleAlign.js)

## `다른 ScrollView 내에서 사용`[⬆](#목차)
iOS에서 Swiper 컴포넌트를
[`ScrollView`](https://reactnative.dev/docs/scrollview)
[`FlatList`](https://reactnative.dev/docs/flatlist)
[`SectionList`](https://reactnative.dev/docs/sectionlist) 내에서 사용 시,
자동 스크롤 애니메이션 진행중에
[`ScrollView`](https://reactnative.dev/docs/scrollview)
내부에 있는 다른 컴포넌트의 터치 이벤트가 발생되지 않는 문제가 있습니다.

`ScrollView`의
[`disableScrollViewPanResponder`](https://reactnative.dev/docs/scrollview#disablescrollviewpanresponder)
설정으로 문제를 해결할 수 있습니다.

```javascript
const [disableScrollViewPanResponder, setDisableScrollViewPanResponder] = useState(true);

const handleScrollBeginDrag = () => {
setDisableScrollViewPanResponder(false);
};

const handleScrollEndDrag = () => {
setDisableScrollViewPanResponder(true);
};

<ScrollView
  disableScrollViewPanResponder={isIos && disableScrollViewPanResponder}
  onScrollBeginDrag={isIos && handleScrollBeginDrag}
  onScrollEndDrag={isIos && handleScrollEndDrag}>
  <BitSwiper
    items={['Item 1', 'Item 2', 'Item 3']}
    itemWidth="80%"
    inactiveItemScale={0.8}
    inactiveItemOpacity={0.5}
    inactiveItemOffset={30}
    loop
    autoplay
    autoplayInterval={1000}
    onItemRender={(item, index) => (
      <View key={index} style={{height: 150}}>
        <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
      </View>
    )}
  />
  <Button title="Button" onPress={() => console.log('Button press!')} />
</ScrollView>
```

> 전체 소스 : [/docs/examples/SwiperInScrollView.js](examples/SwiperInScrollView.js)

## `예제 프로그램`[⬆](#목차)
iOS, Android 예제프로그램을 통해, 이 컴포넌트에서 제공하는 다양한 기능을 실시간으로 옵션을 변경하며 확인할 수 있습니다.

<img src="https://github.com/parkdigy/react-native-bit-swiper/raw/master/docs/img/example_app.jpg" width="300" height="647" /><br/>

- iOS 실행
```
$ cd RNBitSwiperExample
$ yarn install
$ cd ios && pod install && cd ..
$ react-native start
$ react-native run-ios
```

- Android 실행
```
$ cd RNBitSwiperExample
$ yarn install
$ react-native start
$ react-native run-android
```

> 전체 소스 : [/RNBitSwiperExample](../RNBitSwiperExample)

## 📖 다른 문서

- [API 명세서 (API Reference)](ApiReference.md) : 사용 가능한 Props, Event, Method 에 대한 상세 정보를 제공합니다.
- [업데이트 (Update)](Update.md) : 업데이트의 상세 정보를 제공합니다.
