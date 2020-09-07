# 📖 React Native Bit Swiper API 명세서 (API Reference)

이 문서는 React Native Bit Swiper 의 Props, Event, Method 에 대한 상세 정보를 제공합니다.

## Props 목차
- [`initItemIndex`](#inititemindex)
- [`items`](#items)
- [`itemWidth`](#itemwidth)
- [`itemAlign`](#itemalign)
- [`itemScaleAlign`](#itemscalealign)
- [`activeItemScale`](#activeitemscale)
- [`activeItemOpacity`](#activeitemopacity)
- [`inactiveItemScale`](#inactiveitemscale)
- [`inactiveItemOpacity`](#inactiveitemopacity)
- [`inactiveItemOffset`](#inactiveitemvisiblewidth)
- [`loop`](#loop)
- [`loopSingleItem`](#loopsingleitem)
- [`loopCloneCount`](#loopclonecount)
- [`autoplay`](#autoplay)
- [`autoplayDelay`](#autoplaydelay)
- [`autoplayInterval`](#autoplayinterval)
- [`showPaginate`](#showpaginate)
- [`paginateStyle`](#paginatestyle)
- [`paginateDotStyle`](#paginatedotstyle)
- [`paginateActiveDotStyle`](#paginateactivedotstyle)

## Events 목차
- [`onLayout`](#onlayout)
- [`onItemRender`](#onitemrender)
- [`onItemIndexChange`](#onitemindexchange)
- [`onItemIndexChanging`](#onitemindexchanging)
- [`onPaginateDotRender`](#onpaginatedotrender)

## Methods 목차
- [`activeItem(index, animated)`](#activeitemindex-animated)
- [`activeNextItem(animated)`](#activenextitemanimated)
- [`activePrevItem(animated)`](#activeprevitemanimated)
- [`activeFirstItem(animated)`](#activefirstitemanimated)
- [`activeLastItem(animated)`](#activelastitemanimated)
- [`getActiveItemIndex()`](#getactiveitemindex)

## Props - 아이템 관련

### `initItemIndex`[⬆](#props-목차)
최초에 표시(활성) 할 아이템의 `index`

[`items`](#items) 에 설정한 배열에서 표시 할 아이템의 `index` 를 지정합니다.

| 타입    | 기본값  |
| :----: | :---: |
| number | 0     |

### `items`[⬆](#props-목차)
아이템 목록

[`onItemReder`](#onitemrender) 이벤트에서 각 아이템의 UI를 렌더링합니다.

| 타입   |
| :---: |
| array |

> 관련 예제 : [기본](Examples.md#기본) 

### `itemWidth`[⬆](#props-목차)
아이템의 넓이

`%` 값으로 설정할 수 있고, 고정 `숫자` 값으로 설정 할 수도 있습니다.

| 타입              | 기본값  |
| :--------------: | :---: |
| nubmer \| string | 100%  |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

### `itemAlign`[⬆](#props-목차)
아이템 정렬 기준

각 아이템의 높이가 다를 경우 수직 정렬을 어느 위치로 기준할지 결정합니다.

| 타입    | 기본값  | 유효한 값              |
| :---:  | :---: | ---                 |
| string | top   | top, middle, bottom |

> 관련 예제 : [아이템 정렬](Examples.md#아이템-정렬)

### `itemScaleAlign`[⬆](#props-목차)
아이템 스케일 정렬 기준

[`activeItemScale`](#activeitemscale)
[`inactiveItemScale`](#inactiveitemscale)
값으로 스케일을 지정했을 경우, 어느 위치로 기준할지 결정합니다. 

| 타입    | 기본값   | 유효한 값              |
| :---:  | :---:  | ---                 |
| string | middle | top, middle, bottom |

> 관련 예제 : [아이템 스케일 정렬](Examples.md#아이템-스케일-정렬)

## Props - 활성 아이템 관련

### `activeItemScale`[⬆](#props-목차)
활성 아이템의 스케일

| 타입    | 기본값    | 범위       |
| :----: | :-----: | :-------: |
| number | 1.0     | 0.0 ~ 1.0 |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

### `activeItemOpacity`[⬆](#props-목차)
활성 아이템의 투명도

| 타입    | 기본값    | 범위       |
| :----: | :-----: | :-------: |
| number | 1.0     | 0.0 ~ 1.0 |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

## Props - 비활성 아이템 관련

### `inactiveItemScale`[⬆](#props-목차)
비활성 아이템의 스케일

| 타입    | 기본값    | 범위       |
| :----: | :-----: | :-------: |
| number | 1.0     | 0.0 ~ 1.0 |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

### `inactiveItemOpacity`[⬆](#props-목차)
비활성 아이템의 투명도

| 타입    | 기본값    | 범위       |
| :----: | :-----: | :-------: |
| number | 1.0     | 0.0 ~ 1.0 |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

### `inactiveItemOffset`[⬆](#props-목차)
활성 아이템의 왼쪽/오른쪽에 표시할 비활성 아이템의 넓이

[`itemWidth`](#itemwidth) 또는 [`activeItemScale`](#activeitemscale)
값을 `100%` 이하로 설정해야 비활성 아이템이 보입니다.

| 타입    | 기본값 |
| :----: | :---: |
| number | 0    |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

## Props - 루프 (Loop) 관련

### `loop`[⬆](#props-목차)
루프 사용 여부

루프를 사용하면 왼쪽/오른쪽으로 무한히 스크롤 할 수 있습니다.

기본적으로 아이템이 1개 일 때는 루프가 적용되지 않습니다. 아이템이 1개 일 때 루프를 적용하려면, [`loopSingleItem`](#loopsingleitem) 값을 `true` 로 설정해야 합니다.

[`loopCloneCount`](#loopclonecount) 값으로 활성 아이템의 왼쪽/오른쪽에 아이템을 개수를 설정할 수 있습니다.

| 타입     | 기본값  |
| :----:  | :---: |
| boolean | false |

> 관련 예제 : [루프 (Loop)](Examples.md#루프-loop)

### `loopSingleItem`[⬆](#props-목차)
아이템이 1개 일때 루프 사용 여부

기본적으로 아이템이 1개 일 떄는 루프가 적용되지 않습니다.
이 값을 `true` 로 설정하면 아이템이 1개 일 때 루프가 적용됩니다.

| 타입     | 기본값  |
| :----:  | :---: |
| boolean | false |

> 관련 예제 : [루프 (Loop)](Examples.md#루프-loop)

### `loopCloneCount`[⬆](#props-목차)
루프 사용 시 왼쪽/오른쪽에 복사 할 아이템 수

기본 아이템 목록 양 옆에 몇개의 아이템을 복사할지 설정할 수 있습니다.
값을 `4` 로 설정하면, 왼쪽에 4개, 오른쪽에 4개를 복사합니다. 

| 타입    | 기본값 |
| :----: | :---: |
| number | 4    |

루프 사용 시 깜박임을 방지하기 위해, 플렛폼 별 상황에 따라 다음과 같이 최소값이 자동 설정됩니다.

| 플렛폼    | 최소값  |
| :---:   | :---: |
| iOS     | 1     |
| Android | 1 ~ 6 |

> 관련 예제 : [루프 (Loop)](Examples.md#루프-loop)

## Props - 자동 스크롤 (Autoplay) 관련

### `autoplay`[⬆](#props-목차)
자동 스크롤 여부

iOS에서 Swiper 컴포넌트를
[`ScrollView`](https://reactnative.dev/docs/scrollview)
[`FlatList`](https://reactnative.dev/docs/flatlist)
[`SectionList`](https://reactnative.dev/docs/sectionlist) 내에서 사용 시,
자동 스크롤 애니메이션 진행중에
[`ScrollView`](https://reactnative.dev/docs/scrollview)
내부에 있는 다른 컴포넌트의 터치 이벤트가 발생되지 않는 문제가 있습니다.

이를 해결하려면, [`다른 ScrollView 내에서 사용`](Examples.md#다른-scrollview-내에서-사용) 예제를 참고해주시기 바랍니다. 

| 타입     | 기본값  |
| :---:  | :---: |
| boolean | false |

> 관련 예제 1 : [자동 스크롤 (Autoplay)](Examples.md#자동-스크롤-autoplay)<br/>
> 관련 예제 2 : [다른 ScrollView 내에서 사용](Examples.md#다른-scrollview-내에서-사용)

### `autoplayDelay`[⬆](#props-목차)
자동 스크롤 최초 대기 시간

주어진 시간 만큼 최초 자동 스크롤 전에 지연됩니다.

| 타입    | 기본값  | 단위             |
| :----: | :---: | :-------------: |
| number | 1000  | Millisecond(ms) |

> 관련 예제 : [자동 스크롤 (Autoplay)](Examples.md#자동-스크롤-autoplay)

### `autoplayInterval`[⬆](#props-목차)
자동 스크롤 시간 간격

주어진 시간 간격으로 자동 스크롤됩니다.

| 타입    | 기본값  | 단위             |
| :----: | :---: | :-------------: |
| number | 3000  | Millisecond(ms) |

> 관련 예제 : [자동 스크롤 (Autoplay)](Examples.md#자동-스크롤-autoplay)

## Props - 페이지 (Paginate) 관련

### `showPaginate`[⬆](#props-목차)
페이지 영역 표시 여부

기본적으로 페이지 영역이 표시됩니다. 페이지 영역을 표시하지 않으려면, 값을 `false` 로 설정해야합니다.

| 타입     | 기본값  |
| :----:  | :---: |
| boolean | true  |

> 관련 예제 : [페이지 스타일](Examples.md#페이지-스타일)

### `paginateStyle`[⬆](#props-목차)
패이지 영역 스타일

이 값을 설정하면, 기본 스타일에 **병합**됩니다

***기본 스타일***
```javascript
{
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}    
```

> 관련 예제 : [페이지 스타일](Examples.md#페이지-스타일)

### `paginateDotStyle`[⬆](#props-목차)
페이지 영역의 기본(비활성) 도트 스타일

이 값을 설정하면, 기본 스타일이 **대체**됩니다

***기본 스타일***
```javascript
{
    backgroundColor: "rgba(0, 0, 0, .2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
}    
```

> 관련 예제 : [페이지 스타일](Examples.md#페이지-스타일)

### `paginateActiveDotStyle`[⬆](#props-목차)
페이지 영역의 활성 도트 스타일
 
이 값을 설정하면, 기본 스타일이 **대체**됩니다

***기본 스타일***
```javascript
{
    backgroundColor: "#0584f2",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
}    
```

> 관련 예제 : [페이지 스타일](Examples.md#페이지-스타일)

## Events

### `onLayout`[⬆](#events-목차)
최상단 View 컴포넌트 레이아웃 변경 이벤트

View 컴포넌트의 onLayout 이벤트를 상속합니다.

> 참조 : [`React Native 공식 문서`](https://reactnative.dev/docs/view#onlayout)

### `onItemRender`[⬆](#events-목차)
아이템 렌더링 이벤트
 
[`items`](#items) 배열의 각 아이템 별로 호출됩니다.

***Parameters***

| 이름   | 타입    | 비고          |
| :---: | :----: | ----------- |
| item  | any    | 아이템의 value |
| index | number | 아이템의 index |

> 관련 예제 : [기본](Examples.md#기본) 

### `onItemIndexChange`[⬆](#events-목차)
활성 아이템 변경 이벤트

**스크롤 완료** 후 활성 아이템이 변경되면 호출됩니다.

***Parameters***

| 이름   | 타입    | 비고              |
| :---: | :----: | ---------------- |
| index | number | 활성 아이템의 index |

### `onItemIndexChanging`[⬆](#events-목차)
활성 아이템 변경 이벤트

**스크롤 중** 활성 아이템이 변경되면 호출됩니다.

***Parameters***

| 이름   | 타입    | 비고              |
| :---: | :----: | ---------------- |
| index | number | 활성 아이템의 index |

### `onPaginateDotRender`[⬆](#events-목차)
페이지 영역의 도트 렌더링 이벤트
 
[`items`](#items) 배열의 각 아이템 별로 호출됩니다.

***Parameters***

| 이름    | 타입     | 비고                              |
| :----: | :-----: | -------------------------------- |
| index  | number  | 아이템의 index                     |
| active | boolean | 활성 여부                          |

> 관련 예제 : [커스텀 페이지](Examples.md#커스텀-페이지) 

## Methods

### `activeItem(index, animated)`[⬆](#methods-목차)
주어진 `index` 의 아이템을 활성 시킵니다.

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| index    | number  | Y     |       | 활성 할 아이템의 index    |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `activeNextItem(animated)`[⬆](#methods-목차)
현재 활성된 아이템의 다음 아이템을 활성화 시킵니다.

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `activePrevItem(animated)`[⬆](#methods-목차)
현재 활성된 아이템의 이전 아이템 활성화 시킵니다.

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `activeFirstItem(animated)`[⬆](#methods-목차)
첫번째 아이템을 활성화 시킵니다.

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `activeLastItem(animated)`[⬆](#methods-목차)
마지막 아이템을 활성화 시킵니다.

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `getActiveItemIndex()`[⬆](#methods-목차)
현재 활성된 아이템의 `index` 반환합니다.

## 📖 다른 문서

- [예제 (Examples)](Examples.md) : 다양한 예제 및 코드를 제공합니다.
- [업데이트 (Update)](Update.md) : 업데이트의 상세 정보를 제공합니다.
