import React, {useRef} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BitSwiper from 'react-native-bit-swiper';

const Images = [require(`./img/item_1.jpg`), require(`./img/item_2.jpg`), require(`./img/item_3.jpg`)];

const CustomPaginateExample = () => {
  const swiperRef = useRef();

  return (
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
          <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
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
          <Text style={active ? styles.customActiveDotText : styles.customDotText}>{index + 1}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

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

export default CustomPaginateExample;
