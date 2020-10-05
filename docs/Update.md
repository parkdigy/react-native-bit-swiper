# 📝 React Native Bit Swiper 업데이트 (Update)

이 문서는 React Native Bit Swiper 의 업데이트 정보를 제공합니다.

## 목차
- [`v1.1.8`](#v118) : 특정 상황에 Warning 발생하는 현상 수정
- [`v1.1.7`](#v117) : Android 에서 다른 ScrollView 내에 있을 때, 자동 스크롤(Autoplay) 중지되는 현상 수정
- [`v1.1.4`](#v114) : Android 에서 루프(Loop) 사용 시 시작 아이템이 활성화 되지 않는 문제 수정 
- [`v1.1.3`](#v113) : 불필요한 Index 변경 이벤트 발생 제거
- [`v1.1.2`](#v112) : Props 변경 시 특정 상황에 [`onItemRender`](ApiReference.md#onitemrender) 이벤트가 호출되지 않는 버그 수정
- [`v1.1.0`](#v110) : 애니메이션 성능 및 안정성 향상
- [`v1.0.2`](#v102) : 비활성 아이템 표시 넓이가 다르게 표시되는 현상 수정
- [`v1.0.1`](#v101) : 최초 배포

## 버전

### `v1.1.8`[⬆](#목차)
특정 상황에 아래의 Warning 발생하는 현상 수정

```
The prop `realItemWidth` is marked as required in `SwiperItem`, but its value is `undefined`.
```

### `v1.1.7`[⬆](#목차)
Android 에서 다른 ScrollView 내에 있을 때, 자동 스크롤(Autoplay) 중지되는 현상 수정

### `v1.1.4`[⬆](#목차)
Android 에서 루프(Loop) 사용 시 시작 아이템이 활성화 되지 않는 문제 수정

### `v1.1.3`[⬆](#목차)
불필요한 Index 변경 이벤트 발생 제거

[`onItemIndexChange`](ApiReference.md#onitemindexchange)
[`onItemIndexChanging`](ApiReference.md#onitemindexchanging) 이벤트가 불필요하게 많이 발생되는 부분을 제거하였습니다.

### `v1.1.2`[⬆](#목차)
Props 변경 시 특정 상황에
[`onItemRender`](ApiReference.md#onitemrender) 이벤트가 호출되지 않는 버그 수정

Swiper 컴포넌트의 Props 변경 시 항상 [`onItemRender`](ApiReference.md#onitemrender) 이벤트가 호출되게 수정되었습니다.
 
### `v1.1.0`[⬆](#목차)
애니메이션 성능 및 안정성 향상

- Animated 적용으로 애니메이션 성능이 크게 향상되었습니다.
- 루프(Loop) 시 상황에 따라 깜박거림이 발생하는 현상이 수정되었습니다.
- 애니메이션 중 끊김, 버벅임 등이 개선되어 안정성이 향상되었습니다.
- [`loopCloneCount`](ApiReference.md#loopclonecount) 의 최소값이 상황에 따라 자동으로 설정됩니다.
    - iOS 최소값 : 1
    - Android 최소값 : 상황에 따라 1~6까지 자동을 설정 (자세한 정보는 [API 문서](ApiReference.md#loopclonecount) 참조)
- [`activePrevItem()`](ApiReference.md#activeprevitemanimated)
[`activeNextItem()`](ApiReference.md#activenextitemanimated) 빠르게 호출 시 이전/다음 아이템으로 이동하지 않고 무시되는 현상이 수정되었습니다. 
- [`activeFirstItem(animated)`](ApiReference.md#activefirstitemanimated)
[`activeLastItem(animated)`](ApiReference.md#activelastitemanimated) Method 가 추가되었습니다.

### `v1.0.2`[⬆](#목차)
비활성 아이템 표시 넓이가 다르게 표시되는 현상 수정

- [`inactiveItemOffset`](ApiReference.md#inactiveitemoffset) 에 지정한 값보다 작게 표시되는 현상이 수정되었습니다.

### `v1.0.1`[⬆](#목차)
최초 배포

- [API 명세서 (API Reference)](ApiReference.md) : 사용 가능한 Props, Event, Method 에 대한 상세 정보를 제공합니다.
- [예제 (Examples)](Examples.md) : 다양한 예제 및 코드를 제공합니다.
