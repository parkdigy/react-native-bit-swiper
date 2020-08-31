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
- [`getActiveItemIndex()`](#getactiveitemindex)

## Props - 아이템 관련

### `initItemIndex`[⬆](#props-목차)
최초에 표시(활성) 할 아이템의 index

| 타입    | 기본값  |
| :----: | :---: |
| number | 0     |

### `items`[⬆](#props-목차)
아이템 목록

| 타입   |
| :---: |
| array |

> 관련 예제 : [기본](Examples.md#기본) 

### `itemWidth`[⬆](#props-목차)
아이템의 넓이

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

`activeItemScale`, `inactiveItemScale` 로 스케일을 지정했을 경우, 어느 위치로 기준할지 결정합니다. 

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

| 타입    | 기본값 |
| :----: | :---: |
| number | 0    |

> 관련 예제 : [비활성 아이템 표시](Examples.md#비활성-아이템-표시)

## Props - 루프 (Loop) 관련

### `loop`[⬆](#props-목차)
루프 사용 여부

루프를 사용하면 왼쪽/오른쪽으로 무한히 스크롤 할 수 있습니다.

- 기본적으로 아이템이 1개 일 때는 루프가 적용되지 않습니다.
- 아이템이 1개 일 때 루프를 적용하려면, [`loopSingleItem`](#loopsingleitem) 값을 true 로 설정해야 합니다.
- 루프 사용 시 [`loopCloneCount`](#loopclonecount)에 지정된 값 만큼 왼쪽/오른쪽에 아이템을 복사됩니다.

| 타입     | 기본값  |
| :----:  | :---: |
| boolean | false |

> 관련 예제 : [루프 (Loop)](Examples.md#루프-loop)

### `loopSingleItem`[⬆](#props-목차)
아이템이 1개 일때 루프 사용 여부

- 기본적으로 아이템이 1개 일 떄는 루프가 적용되지 않습니다.
- 이 값을 true 로 설정하면 아이템이 1개 일 때 루프가 적용됩니다.

| 타입     | 기본값  |
| :----:  | :---: |
| boolean | false |

> 관련 예제 : [루프 (Loop)](Examples.md#루프-loop)

### `loopCloneCount`[⬆](#props-목차)
루프 사용 시 왼쪽/오른쪽에 복사 할 아이템 수

| 타입    | 기본값 | 비고 |
| :----: | :---: | --- |
| number | 4    | 2 이상 권장 (2 미만 일 경우 Android 에서 깜박임 현상이 발생할 수 있습니다) |

> 관련 예제 : [루프 (Loop)](Examples.md#루프-loop)

## Props - 자동 스크롤 (Autoplay) 관련

### `autoplay`[⬆](#props-목차)
자동 스크롤 여부

| 타입     | 기본값  |
| :---:  | :---: |
| boolean | false |

> 관련 예제 : [자동 스크롤 (Autoplay)](Examples.md#자동-스크롤-autoplay)

### `autoplayDelay`[⬆](#props-목차)
최초 자동 스크롤 실행 시 대기 시간

| 타입    | 기본값  | 단위             |
| :----: | :---: | :-------------: |
| number | 1000  | Millisecond(ms) |

> 관련 예제 : [자동 스크롤 (Autoplay)](Examples.md#자동-스크롤-autoplay)

### `autoplayInterval`[⬆](#props-목차)
자동 스크롤 시간 간격

| 타입    | 기본값  | 단위             |
| :----: | :---: | :-------------: |
| number | 3000  | Millisecond(ms) |

> 관련 예제 : [자동 스크롤 (Autoplay)](Examples.md#자동-스크롤-autoplay)

## Props - 페이지 (Paginate) 관련

### `showPaginate`[⬆](#props-목차)
페이지 영역 표시 여부

| 타입     | 기본값  |
| :----:  | :---: |
| boolean | false |

> 관련 예제 : [페이지 스타일](Examples.md#페이지-스타일)

### `paginateStyle`[⬆](#props-목차)
패이지 영역 스타일 (스타일을 지정하면, 기본 스타일에 병합됩니다)

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
페이지 영역의 기본(비활성) 도트 스타일 (스타일을 지정하면, 기본 스타일이 대체됩니다)

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
페이지 영역의 활성 도트 스타일 (스타일을 지정하면, 기본 스타일이 대체됩니다)

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
Swiper의 최상단 View 컴포넌트 레이아웃 변경 이벤트 (View 컴포넌트의 onLayout 이벤트 상속)

### `onItemRender`[⬆](#events-목차)
아이템 render 이벤트 ([`items`](#items) Props의 각 item 별로 호출)

***Parameters***

| 이름   | 타입    | 비고          |
| :---: | :----: | ----------- |
| item  | any    | 아이템의 value |
| index | number | 아이템의 index |

> 관련 예제 : [기본](Examples.md#기본) 

### `onItemIndexChange`[⬆](#events-목차)
활성 아이템 변경 이벤트 (스크롤이 완료된 후 호출)

***Parameters***

| 이름   | 타입    | 비고              |
| :---: | :----: | ---------------- |
| index | number | 활성 아이템의 index |

### `onItemIndexChanging`[⬆](#events-목차)
활성 아이템 변경 이벤트 (스크롤 중 호출)

***Parameters***

| 이름   | 타입    | 비고              |
| :---: | :----: | ---------------- |
| index | number | 활성 아이템의 index |

### `onPaginateDotRender`[⬆](#events-목차)
페이지 영역의 도트 render 이벤트 ([`items`](#items) Props의 각 item 별로 호출)

***Parameters***

| 이름    | 타입     | 비고                              |
| :----: | :-----: | -------------------------------- |
| index  | number  | 아이템의 index                     |
| active | boolean | 활성 여부                          |

> 관련 예제 : [커스텀 페이지](Examples.md#커스텀-페이지) 

## Methods

### `activeItem(index, animated)`[⬆](#methods-목차)
주어진 index 의 아이템을 활성 시킴

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| index    | number  | Y     |       | 활성 할 아이템의 index    |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `activeNextItem(animated)`[⬆](#methods-목차)
다음 아이템을 활성화 시킴

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `activePrevItem(animated)`[⬆](#methods-목차)
이전 아이템 활성화 시킴

***Parameters***

| 이름      | 타입     | 필수    | 기본값  | 비고                    |
| :------: | :-----: | :---: | :---: | --------------------- |
| animated | boolean | N     | true  | 스크롤 애니메이션 적용 여부  |

### `getActiveItemIndex()`[⬆](#methods-목차)
현재 활성된 아이템의 index 반환

## 📖 다른 문서

- [예제 (Examples)](./Examples.md) : 다양한 예제 및 코드를 제공합니다.
