import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import RNBitSwiper from 'react-native-bit-swiper';
import Button from './Button';
import Options from './Options';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const newItem = (label, backgroundColor) => ({
  label,
  backgroundColor,
});

const MainView = () => {
  const swiperRef = useRef();

  //--------------------------------------------------------------------------------------------------------------------

  const [items, setItems] = useState([
    newItem('Item 1', getRandomColor()),
    newItem('Item 2', getRandomColor()),
    newItem('Item 3', getRandomColor()),
  ]);
  const [itemWidth, setItemWidth] = useState();
  const [itemAlign, setItemAlign] = useState('top');
  const [itemScaleAlign, setItemScaleAlign] = useState('middle');
  const [activeItemScale, setActiveItemScale] = useState();
  const [activeItemOpacity, setActiveItemOpacity] = useState();
  const [inactiveItemScale, setInactiveItemScale] = useState();
  const [inactiveItemOpacity, setInactiveItemOpacity] = useState();
  const [inactiveItemOffset, setInactiveItemOffset] = useState();
  const [loop, setLoop] = useState(false);
  const [loopCloneCount, setLoopCloneCount] = useState();
  const [loopSingleItem, setLoopSingleItem] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [autoplayDelay, setAutoplayDelay] = useState();
  const [autoplayInterval, setAutoplayInterval] = useState();
  const [showPaginate, setShowPaginate] = useState(true);
  const [customPaginateDot, setCustomPaginateDot] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  //--------------------------------------------------------------------------------------------------------------------

  const addItem = () => {
    setItems([...items, newItem(`Item ${items.length + 1}`, getRandomColor())]);
  };

  const removeItem = () => {
    items.pop();
    setItems([...items]);
  };

  //--------------------------------------------------------------------------------------------------------------------

  const handleItemRender = ({label, backgroundColor}, index) => {
    return (
      <View key={index} style={[styles.swiperItem, {backgroundColor}]}>
        <View style={styles.swiperItemInner}>
          <Text style={styles.swiperItemText}>{label}</Text>
        </View>
      </View>
    );
  };

  const handleItemIndexChange = (index) => {
    setActiveItemIndex(index);
  };

  const handlePaginateDotRender = (index, active) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        style={active ? styles.customActiveDot : styles.customDot}
        onPress={() => {
          if (swiperRef.current) {
            swiperRef.current.activeItem(index);
          }
        }}>
        <Text style={active ? styles.customActiveDotText : styles.customDotText}>{index + 1}</Text>
      </TouchableOpacity>
    );
  };

  //--------------------------------------------------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.swiperWrap}>
        {/* swiper */}
        <RNBitSwiper
          ref={swiperRef}
          items={items}
          itemWidth={itemWidth}
          itemAlign={itemAlign}
          itemScaleAlign={itemScaleAlign}
          activeItemScale={activeItemScale}
          activeItemOpacity={activeItemOpacity}
          inactiveItemScale={inactiveItemScale}
          inactiveItemOpacity={inactiveItemOpacity}
          inactiveItemOffset={inactiveItemOffset}
          loop={loop}
          loopCloneCount={loopCloneCount}
          loopSingleItem={loopSingleItem}
          autoplay={autoplay}
          autoplayDelay={autoplayDelay}
          autoplayInterval={autoplayInterval}
          showPaginate={showPaginate}
          onItemRender={handleItemRender}
          onItemIndexChange={handleItemIndexChange}
          onPaginateDotRender={customPaginateDot ? handlePaginateDotRender : null}
        />
      </View>

      {/* buttons */}
      <View style={styles.buttons}>
        <Button style={styles.smallButton} textColor="white" onPress={() => swiperRef.current.activePrevItem()}>
          &lt;
        </Button>
        <Button style={styles.button} onPress={() => addItem()}>
          + Add Item
        </Button>
        <Button style={styles.button} onPress={() => removeItem()}>
          - Remove Item
        </Button>
        <Button style={styles.smallButton} textColor="white" onPress={() => swiperRef.current.activeNextItem()}>
          &gt;
        </Button>
      </View>

      {/* info */}
      <View style={styles.infoWrap}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Items: </Text>
          <Text style={styles.infoText}>{items && items.length}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Active: </Text>
          <Text style={styles.infoText}>{activeItemIndex}</Text>
        </View>
      </View>

      {/* options */}
      <Options
        itemWidth={itemWidth}
        onItemWidthChange={(value) => setItemWidth(value)}
        itemAlign={itemAlign}
        onItemAlignChange={(value) => setItemAlign(value)}
        itemScaleAlign={itemScaleAlign}
        onItemScaleAlignChange={(value) => setItemScaleAlign(value)}
        activeItemScale={activeItemScale}
        onActiveItemScaleChange={(value) => setActiveItemScale(value)}
        activeItemOpacity={activeItemOpacity}
        onActiveItemOpacityChange={(value) => setActiveItemOpacity(value)}
        inactiveItemScale={inactiveItemScale}
        onInactiveItemScaleChange={(value) => setInactiveItemScale(value)}
        inactiveItemOpacity={inactiveItemOpacity}
        onInactiveItemOpacityChange={(value) => setInactiveItemOpacity(value)}
        inactiveItemOffset={inactiveItemOffset}
        onInactiveItemOffsetChange={(value) => setInactiveItemOffset(value)}
        loop={loop}
        onLoopChange={(value) => setLoop(value)}
        loopCloneCount={loopCloneCount}
        onLoopCloneCountChange={(value) => setLoopCloneCount(value)}
        loopSingleItem={loopSingleItem}
        onLoopSingleItemChange={(value) => setLoopSingleItem(value)}
        autoplay={autoplay}
        onAutoplayChange={(value) => setAutoplay(value)}
        autoplayDelay={autoplayDelay}
        onAutoplayDelayChange={(value) => setAutoplayDelay(value)}
        autoplayInterval={autoplayInterval}
        onAutoplayIntervalChange={(value) => setAutoplayInterval(value)}
        showPaginate={showPaginate}
        onShowPaginateChange={(value) => setShowPaginate(value)}
        customPaginateDot={customPaginateDot}
        onCustomPaginateDotChange={(value) => setCustomPaginateDot(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  // swiper
  swiperWrap: {
    width: '100%',
    minHeight: 180,
  },
  swiperItem: {
    height: 150,
  },
  swiperItemInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  swiperItemText: {
    color: 'white',
  },

  // buttons
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: -5,
  },
  button: {flex: 1, marginHorizontal: 5},
  smallButton: {marginHorizontal: 5, width: 40, backgroundColor: '#20a8d8'},
  smallButtonText: {color: 'white'},

  // info
  infoWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .2)',
  },
  infoItem: {
    paddingRight: 10,
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 13,
  },
  infoTitle: {
    color: 'gray',
    fontSize: 13,
  },

  // options
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContentContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  optionTitle: {
    color: '#0abda0',
    fontWeight: 'bold',
    marginTop: 10,
  },

  // custom dot
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

export default MainView;
