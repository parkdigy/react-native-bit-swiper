import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, ScrollView, View, ViewPropTypes, Text} from 'react-native';
import * as Util from './Util';
import SwiperItem from './SwiperItem';
import SwiperPaginate from './SwiperPaginate';

// 디버그용
const ll = console.log;
const showIndexText = false;

const isIos = Platform.OS === 'ios';
const toFixedFractionDigits = 5;

class Swiper extends React.Component {
  static propTypes = {
    // item
    items: PropTypes.array,
    initItemIndex: PropTypes.number,
    itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    itemAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    itemScaleAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),

    // active item
    activeItemScale: PropTypes.number,
    activeItemOpacity: PropTypes.number,

    // inactive item
    inactiveItemScale: PropTypes.number,
    inactiveItemOpacity: PropTypes.number,
    inactiveItemOffset: PropTypes.number,

    // loop
    loop: PropTypes.bool,
    loopSingleItem: PropTypes.bool,
    loopCloneCount: PropTypes.number,

    // autoplay
    autoplay: PropTypes.bool,
    autoplayDelay: PropTypes.number,
    autoplayInterval: PropTypes.number,

    // paginate
    showPaginate: PropTypes.bool,
    paginateStyle: ViewPropTypes.style,
    paginateDotStyle: ViewPropTypes.style,
    paginateActiveDotStyle: ViewPropTypes.style,

    // events
    onLayout: PropTypes.func,
    onItemRender: PropTypes.func.isRequired,
    onItemIndexChanging: PropTypes.func,
    onItemIndexChange: PropTypes.func,
    onPaginateDotRender: PropTypes.func,
  };

  static defaultProps = {
    initItemIndex: 0,
    itemWidth: '100%',
    itemAlign: 'top',
    itemScaleAlign: 'middle',
    activeItemScale: 1,
    activeItemOpacity: 1,
    inactiveItemScale: 1,
    inactiveItemOpacity: 1,
    inactiveItemOffset: 0,
    loop: false,
    loopSingleItem: false,
    loopCloneCount: 4,
    autoplay: false,
    autoplayDelay: 1000,
    autoplayInterval: 3000,
    showPaginate: true,
  };

  //--------------------------------------------------------------------------------------------------------------------

  state = {
    items: null, // Loop 시 복사 아이템을 포함한 전체 아이템
    baseItemIndex: 0, // items 에서 원본 아이템의 시작 위치
    baseItemCount: 0, // 원본 아이템 수
    contentOffset: {}, // ScrollView 에서 이동할 스크롤 위치 - iOS 에서 사용
  };

  //--------------------------------------------------------------------------------------------------------------------

  $paginateRef = React.createRef(); // 페이지 UI 의 ref
  $scrollViewRef; // ScrollView 의 ref

  $width; // 컨테이너의 넓이
  $realItemWidth; // 실제 아이템 넓이 - Props 의 itemWidth 값에서 계산된 실제 넓이
  $scrollContentSize; // ScrollView 의 컨텐츠 크기
  $scrollDragging = false; // ScrollView 의 드레그 중인지 여부
  $scrollToBaseTimer; // Loop 일 때, 복사 아이템으로 이동하면, 원본 아이템으로 이동하는 Timer
  $lastScrollPos; // ScrollView 의 마지막 스크롤 위치
  $autoplayTimer; // 자동 스크롤 Timer
  $autoplayDelayed = false; // 자동 스크롤 delay 사용 여부
  $lastActiveChangeBaseItemIndex = 0; // 활성화 된 원본 아이템 Index
  $lastActiveChangingBaseItemIndex = 0; // 스크롤 중 활성화 된 원본 아이템 Index

  // 디버그용
  $disableUpdateUI = false;

  //--------------------------------------------------------------------------------------------------------------------

  componentDidMount() {
    this.init(this.props);
  }

  componentWillUnmount() {
    this.stopAutoplayTimer();
    this.stopScrollToBaseTimer();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props !== nextProps) {
      this.init(nextProps, this.props);
    }

    return true;
  }

  //--------------------------------------------------------------------------------------------------------------------

  init(props, prevProps) {
    let isResetItems = false;

    if (
      prevProps == null ||
      Util.isPropsChanged(props, prevProps, ['items', 'itemWidth', 'loop', 'loopCloneCount', 'loopSingleItem'])
    ) {
      if (this.$width != null) {
        if (props.itemWidth !== prevProps.itemWidth) {
          this.$realItemWidth = this.getRealItemWidth(this.$width, props.itemWidth);
        }

        isResetItems = true;

        this.makeItems(props);
      }
    }

    if (!isResetItems) {
      if (
        prevProps == null ||
        Util.isPropsChanged(props, prevProps, [
          'itemAlign',
          'itemScaleAlign',
          'activeItemScale',
          'activeItemOpacity',
          'inactiveItemScale',
          'inactiveItemOpacity',
          'inactiveItemOffset',
        ])
      ) {
        this.nextTickUpdateUI();
      }
    }

    if (prevProps == null || Util.isPropsChanged(props, prevProps, ['autoplayDelay'])) {
      this.$autoplayDelayed = false;
    }

    if (prevProps == null || Util.isPropsChanged(props, prevProps, ['autoplay', 'autoplayDelay', 'autoplayInterval'])) {
      if (props.autoplay) {
        this.nextTick(() => {
          this.startAutoplayTimer();
        });
      } else {
        this.stopAutoplayTimer();
      }
    }

    if (
      prevProps != null &&
      Util.isPropsChanged(props, prevProps, [
        'showPaginate',
        'paginateStyle',
        'paginateDotStyle',
        'paginateActiveDotStyle',
      ])
    ) {
      this.forceUpdate();
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  reset() {
    this.stopScrollToBaseTimer();
    this.stopAutoplayTimer();

    this.$scrollViewRef = null;
    this.$scrollContentSize = null;
    this.$lastScrollPos = null;
    this.$lastActiveChangeBaseItemIndex = 0;
    this.$lastActiveChangingBaseItemIndex = 0;

    this.setState({
      items: null,
      baseItemIndex: 0,
      baseItemCount: 0,
      contentOffset: {},
    });
  }

  makeItems(props) {
    const {
      initItemIndex: propsInitItemIndex,
      items: propsItems,
      loop,
      loopSingleItem,
      loopCloneCount,
      showPaginate,
    } = props;
    const {items: stateItems} = this.state;

    this.stopScrollToBaseTimer();

    if (propsItems == null || propsItems.length === 0) {
      this.reset();
    } else {
      // 원본 아이템
      const baseItems = propsItems.map((item, index) => ({
        data: item,
        baseIndex: index,
        height: 0,
      }));

      // 시작 아이템 Index
      let initItemIndex = 0;

      if (stateItems != null && stateItems.length > 0) {
        const lastScrollPos = this.$lastScrollPos || 0;
        const lastItemIndex = Math.round(this.getItemIndex(lastScrollPos));
        if (Util.isIndexIn(lastItemIndex, stateItems.length)) {
          initItemIndex = stateItems[lastItemIndex].baseIndex;
        }
      } else {
        initItemIndex = propsInitItemIndex;
      }

      if (initItemIndex < 0) {
        initItemIndex = 0;
      } else if (initItemIndex >= baseItems.length) {
        initItemIndex = baseItems.length - 1;
      }

      // 아이템
      let items = [...baseItems];
      let baseItemIndex = 0;

      // Loop 시 아이템 추가
      if (loop && (items.length > 1 || loopSingleItem)) {
        const maxIndex = baseItems.length - 1;
        for (let i = 0; i < loopCloneCount; i += 1) {
          let unshiftIndex = maxIndex - (i % baseItems.length);
          const shiftIndex = Math.abs(i % baseItems.length);

          items.unshift({...baseItems[unshiftIndex]});
          items.push({...baseItems[shiftIndex]});
        }

        baseItemIndex = loopCloneCount;
      }

      // 아이템의 ref 및 위치 설정
      items = items.map((item, index) => ({
        ...item,
        ref: React.createRef(),
        x: index * this.$width,
      }));

      // 시작 위치
      const initScrollPos = (baseItemIndex + initItemIndex) * this.$width;
      const contentOffset = this.makeContentOffset(initScrollPos);

      this.setState(
        {
          items,
          baseItemIndex,
          baseItemCount: baseItems.length,
          contentOffset,
        },
        () => {
          if (isIos) {
            if (this.$lastScrollPos !== initScrollPos) {
              setTimeout(() => {
                this.scrollTo(baseItemIndex + initItemIndex, false);
              }, 100);
            } else {
              this.nextTickUpdateUI();
            }
          } else {
            if (this.$lastScrollPos !== initScrollPos) {
              setTimeout(() => {
                this.scrollTo(baseItemIndex + initItemIndex, false);
              }, 100);
            } else {
              this.nextTickUpdateUI();
            }
          }
          if (showPaginate && this.$paginateRef.current) {
            this.$paginateRef.current.setActiveIndex(initItemIndex);
          }
        },
      );
    }
  }

  nextTickUpdateUI() {
    this.nextTick(() => {
      this.updateUI();
    });
  }

  updateUI() {
    if (this.$disableUpdateUI) {
      return;
    }

    const {autoplay, showPaginate, onItemIndexChanging, onItemIndexChange} = this.props;
    const {items, baseItemIndex} = this.state;

    if (items == null) return;

    if (this.$lastScrollPos == null && baseItemIndex * this.$width !== 0) {
      this.scrollTo(baseItemIndex, false);
    } else {
      if (this.$lastScrollPos == null) {
        this.$lastScrollPos = 0;
      }

      // 아이템 transform 설정
      items.forEach((item, index) => {
        item.transform = this.getItemTransform(this.$lastScrollPos, index);
        if (item.ref.current) {
          item.ref.current.setTransform(item.transform);
        }
      });

      // 페이지 UI - Active Index 업데이트
      // onItemIndexChanging, onItemIndexChange 이벤트 발생
      const itemIndex = this.getItemIndex(this.$lastScrollPos);
      const isExactItemIndex = this.isExactItemIndex(itemIndex);
      const nearItemIndex = Math.round(itemIndex);

      if (isExactItemIndex) {
        if (Util.isIndexIn(itemIndex, items.length)) {
          const baseItemIndex = items[itemIndex].baseIndex;
          if (baseItemIndex !== this.$lastActiveChangeBaseItemIndex) {
            if (onItemIndexChange) onItemIndexChange(baseItemIndex);
            this.$lastActiveChangeBaseItemIndex = baseItemIndex;
          }
          if (baseItemIndex !== this.$lastActiveChangingBaseItemIndex) {
            if (onItemIndexChanging) onItemIndexChanging(baseItemIndex);
            this.$lastActiveChangingBaseItemIndex = baseItemIndex;
          }
        }
      } else if (Util.isIndexIn(nearItemIndex, items.length)) {
        const baseItemIndex = items[nearItemIndex].baseIndex;
        if (baseItemIndex !== this.$lastActiveChangingBaseItemIndex) {
          if (showPaginate && this.$paginateRef.current) {
            this.$paginateRef.current.setActiveIndex(baseItemIndex);
          }
          if (onItemIndexChanging) onItemIndexChanging(baseItemIndex);

          this.$lastActiveChangingBaseItemIndex = baseItemIndex;
        }
      }

      // Loop 일 때, 복사 아이템으로 이동하면, 원본 아이템으로 이동하는 Timer 시작
      this.startScrollToBaseTimer();

      // 자동 스크롤 Timer 시작
      if (isExactItemIndex && autoplay) {
        this.startAutoplayTimer();
      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  startScrollToBaseTimer = () => {
    this.stopScrollToBaseTimer();

    if (!this.$scrollDragging) {
      if (this.$scrollViewRef && this.canLoop()) {
        this.$scrollToBaseTimer = setTimeout(
          () => {
            this.$scrollToBaseTimer = null;

            const {loopCloneCount, inactiveItemScale, inactiveItemOffset} = this.props;
            const {items, baseItemCount} = this.state;

            const itemIndex = this.getItemIndex(this.$lastScrollPos);

            if (this.isExactItemIndex(itemIndex)) {
              const item = items[itemIndex];

              if (item && itemIndex !== loopCloneCount + item.baseIndex) {
                const toActiveItemIndex = loopCloneCount + items[itemIndex].baseIndex;
                const toActiveItem = items[toActiveItemIndex];

                // 활성 아이템의 transform 설정
                toActiveItem.transform = this.getItemTransform(toActiveItem.x, toActiveItemIndex);
                if (!isIos && toActiveItem.ref.current) {
                  toActiveItem.ref.current.setTransform(toActiveItem.transform);
                }

                // 사이드 비활성 아이템의 transform 설정
                [toActiveItemIndex - 1, toActiveItemIndex + 1].forEach((sideInactiveItemIndex) => {
                  if (Util.isIndexIn(sideInactiveItemIndex, items.length)) {
                    const sideInactiveItem = items[sideInactiveItemIndex];
                    sideInactiveItem.transform = this.getItemTransform(toActiveItem.x, sideInactiveItemIndex);
                    if (!isIos && sideInactiveItem.ref.current && itemIndex !== sideInactiveItemIndex) {
                      sideInactiveItem.ref.current.setTransform(sideInactiveItem.transform);
                    }
                  }
                });

                if (!isIos && inactiveItemOffset !== 0) {
                  // 안드로이드에서 사이드 비활성 아이템의 깜박임 방지
                  // 원본 아이템이 3개 이상이면 깜박이지 않음
                  // loopCloneCount 가 2 미만이면 깜박임

                  if (baseItemCount <= 2) {
                    let lr2Index, lr2TransformBaseIndex;
                    if (toActiveItemIndex > itemIndex) {
                      lr2Index = toActiveItemIndex + (baseItemCount + 1);
                      lr2TransformBaseIndex = lr2Index - 1;
                    } else {
                      lr2Index = toActiveItemIndex - (baseItemCount + 1);
                      lr2TransformBaseIndex = lr2Index + 1;
                    }

                    if (Util.isIndexIn(lr2Index, items.length)) {
                      const lr2Item = items[lr2Index];
                      if (lr2Item.ref.current) {
                        lr2Item.transform = this.getItemTransform(items[lr2TransformBaseIndex].x, lr2Index);
                        if (toActiveItemIndex > itemIndex) {
                          lr2Item.transform.translateX -= (this.$width / inactiveItemScale) * (baseItemCount * 2);
                        } else {
                          lr2Item.transform.translateX += (this.$width / inactiveItemScale) * (baseItemCount * 2);
                        }
                        lr2Item.ref.current.setTransform(lr2Item.transform);
                      }
                    }
                  }
                }

                if (isIos) {
                  this.setState({
                    contentOffset: this.makeContentOffset(toActiveItem.x),
                  });
                } else {
                  // this.$disableUpdateUI = true;

                  this.nextTickScrollTo(toActiveItemIndex, false);
                }
              }
            }
          },
          // Android 는 터치 해제 시 100 Millisecond 안에 onScroll 다시 이벤트하는 경우가 있음
          isIos ? 10 : 100,
        );
      }
    }
  };

  stopScrollToBaseTimer = () => {
    if (this.$scrollToBaseTimer) {
      clearTimeout(this.$scrollToBaseTimer);
      this.$scrollToBaseTimer = null;
    }
  };

  //--------------------------------------------------------------------------------------------------------------------

  getItemIndex(scrollPos) {
    return Number((scrollPos / this.$width).toFixed(toFixedFractionDigits));
  }

  isExactItemIndex(itemIndex) {
    return itemIndex === Math.floor(itemIndex);
  }

  getItemTransform(scrollPos, itemIndex) {
    const {
      itemScaleAlign,
      activeItemScale,
      activeItemOpacity,
      inactiveItemScale,
      inactiveItemOffset,
      inactiveItemOpacity,
    } = this.props;
    const {items} = this.state;

    if (!Util.isIndexIn(itemIndex, items.length)) return null;

    const item = items[itemIndex];
    const itemHeight = item.ref.current.getContentSize().height;

    let delta = null;
    let scale = activeItemScale;
    let translateDelta = scrollPos;
    let translateX = 0;
    let translateY = 0;
    let opacity = activeItemOpacity;

    if (item.x < scrollPos) {
      if (item.x >= scrollPos - this.$width * 1.5) {
        delta = 1 - (scrollPos - item.x) / this.$width;
      } else {
        delta = 0;
        translateDelta = item.x + this.$width;
      }
    } else if (item.x > scrollPos) {
      if (item.x <= scrollPos + this.$width) {
        delta = 1 - (item.x - scrollPos) / this.$width;
      } else {
        delta = 0;
        translateDelta = item.x - this.$width;
      }
    }

    if (delta != null) {
      scale = inactiveItemScale + (activeItemScale - inactiveItemScale) * delta;
      opacity = inactiveItemOpacity + (activeItemOpacity - inactiveItemOpacity) * delta;

      const scaledItemWidth = this.$realItemWidth * scale;
      translateX =
        (((this.$width - scaledItemWidth) / 2 / scale + inactiveItemOffset) * (translateDelta - item.x)) / this.$width;
    }

    if (itemHeight > 0) {
      switch (itemScaleAlign) {
        case 'top':
          translateY = -(itemHeight - itemHeight * scale) / 2 / scale;
          break;
        case 'bottom':
          translateY = (itemHeight - itemHeight * scale) / 2 / scale;
          break;
      }
    }

    const zIndex = itemIndex === Math.round(scrollPos / this.$width) ? 2 : 1;

    return {scale, translateX, translateY, zIndex, opacity};
  }

  getRealItemWidth(width, itemWidth) {
    let finalItemWidth = itemWidth || width;
    if (typeof itemWidth === 'string') {
      if (itemWidth.includes('%')) {
        finalItemWidth = width * (Number(itemWidth.replace(/%/g, '')) / 100);
      } else {
        finalItemWidth = Number(itemWidth);
      }
    }
    return finalItemWidth;
  }

  //--------------------------------------------------------------------------------------------------------------------

  startAutoplayTimer() {
    this.stopAutoplayTimer();

    const {autoplayDelay, autoplayInterval} = this.props;

    this.$autoplayTimer = setTimeout(
      () => {
        this.$autoplayTimer = null;
        this.$autoplayDelayed = true;

        const itemIndex = this.getItemIndex(this.$lastScrollPos);
        if (this.isExactItemIndex(itemIndex)) {
          const {items} = this.state;
          if (items) {
            const toIndex = (itemIndex + 1) % items.length;
            this.scrollTo(toIndex);
          }
        }
      },
      this.$autoplayDelayed ? autoplayInterval : autoplayDelay + autoplayInterval,
    );
  }

  stopAutoplayTimer() {
    if (this.$autoplayTimer) {
      clearTimeout(this.$autoplayTimer);
      this.$autoplayTimer = null;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  canLoop() {
    const {loop, loopSingleItem} = this.props;
    const {items} = this.state;
    return loop && items && items.length > 0 && (loopSingleItem || items.length > 1);
  }

  nextTickScrollTo(index, animated) {
    this.nextTick(() => {
      this.scrollTo(index, animated);
    });
  }

  scrollTo(index, animated = true) {
    if (this.$scrollViewRef) {
      const x = index * this.$width;
      if (x <= this.$scrollContentSize) {
        this.$scrollViewRef.scrollTo({
          x: index * this.$width,
          y: 0,
          animated,
        });
      }
    }
  }

  makeContentOffset(x) {
    const {contentOffset} = this.state;
    if (contentOffset.x === x) {
      // 기존 값과 같으면 UI가 onScroll 이벤트가 발생하지 않기 때문에 처리
      return {x: x + 0.00000000001, y: 0};
    } else {
      return {x, y: 0};
    }
  }

  nextTick(cb) {
    setImmediate(cb);
  }

  //--------------------------------------------------------------------------------------------------------------------

  activeItem(index, animated = true) {
    const {baseItemCount, baseItemIndex} = this.state;
    if (Util.isIndexIn(index, baseItemCount)) {
      this.scrollTo(baseItemIndex + index, animated);
    }
  }

  activeNextItem(animated = true) {
    const itemIndex = Math.round(this.getItemIndex(this.$lastScrollPos)) + 1;
    const {items} = this.state;
    if (Util.isIndexIn(itemIndex, items.length)) {
      this.scrollTo(itemIndex, animated);
    }
  }

  activePrevItem(animated = true) {
    const itemIndex = Math.round(this.getItemIndex(this.$lastScrollPos)) - 1;
    const {items} = this.state;
    if (Util.isIndexIn(itemIndex, items.length)) {
      this.scrollTo(itemIndex, animated);
    }
  }

  getActiveItemIndex() {
    const itemIndex = Math.round(this.getItemIndex(this.$lastScrollPos)) - 1;
    const {items} = this.state;
    if (Util.isIndexIn(itemIndex, items.length)) {
      return items[itemIndex].baseIndex;
    } else {
      return items[items.length - 1].baseIndex;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  handleContainerLayout = (e) => {
    if (e.nativeEvent && e.nativeEvent.layout) {
      const width = e.nativeEvent.layout.width;

      if (width !== this.$width) {
        const {itemWidth} = this.props;
        this.$width = width;
        this.$realItemWidth = this.getRealItemWidth(width, itemWidth);

        this.makeItems(this.props);
      }
    }

    const {onLayout} = this.props;
    if (onLayout) onLayout(e);
  };

  handleScrollViewLayout = () => {
    this.updateUI();
  };

  handleScroll = ({nativeEvent}) => {
    if (nativeEvent) {
      const x = nativeEvent.contentOffset.x;
      if (this.$lastScrollPos !== x) {
        this.$lastScrollPos = x;

        this.updateUI();
      }
    }
  };

  handleScrollBeginDrag = () => {
    this.$scrollDragging = true;
    this.stopAutoplayTimer();
    this.stopScrollToBaseTimer();
  };

  handleScrollEndDrag = () => {
    this.$scrollDragging = false;

    if (this.isExactItemIndex(this.getItemIndex(this.$lastScrollPos))) {
      this.updateUI();
    }
  };

  handleContentSizeChange = (contentSize) => {
    this.$scrollContentSize = contentSize;
    this.updateUI();
  };

  //--------------------------------------------------------------------------------------------------------------------

  render() {
    const {
      style,
      itemAlign,
      items: propsItems,
      onItemRender,
      showPaginate,
      paginateStyle,
      paginateDotStyle,
      paginateActiveDotStyle,
      onPaginateDotRender,
    } = this.props;
    const {items, baseItemCount, contentOffset} = this.state;

    const renderItems = propsItems.map((item, index) => onItemRender && onItemRender(item, index));

    let itemJustifyContent;
    switch (itemAlign) {
      case 'middle':
        itemJustifyContent = 'center';
        break;
      case 'bottom':
        itemJustifyContent = 'flex-end';
        break;
      default:
        itemJustifyContent = 'flex-start';
        break;
    }

    return (
      <View style={[styles.container, style]} onLayout={this.handleContainerLayout}>
        {items && (
          <>
            <ScrollView
              ref={(ref) => (this.$scrollViewRef = ref)}
              style={styles.scrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              decelerationRate="fast"
              pagingEnabled
              contentOffset={contentOffset}
              onLayout={this.handleScrollViewLayout}
              onScroll={this.handleScroll}
              onScrollBeginDrag={this.handleScrollBeginDrag}
              onScrollEndDrag={this.handleScrollEndDrag}
              onContentSizeChange={this.handleContentSizeChange}>
              {items.map((item, index) => (
                <SwiperItem
                  ref={item.ref}
                  key={index}
                  style={{
                    width: this.$width,
                    justifyContent: itemJustifyContent,
                  }}
                  transform={item.transform}>
                  <View style={{width: this.$realItemWidth || this.$width}}>{renderItems[item.baseIndex]}</View>
                  {showIndexText && <Text style={styles.indexText}>{index}</Text>}
                </SwiperItem>
              ))}
            </ScrollView>
            {showPaginate && (
              <SwiperPaginate
                ref={this.$paginateRef}
                style={paginateStyle}
                total={baseItemCount}
                dotStyle={paginateDotStyle}
                activeDotStyle={paginateActiveDotStyle}
                onDotRender={onPaginateDotRender}
              />
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollView: {},
  indexText: {
    position: 'absolute',
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: 3,
  },
});

export default Swiper;
