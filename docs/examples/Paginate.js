import React from 'react';
import {View, Image} from 'react-native';
import BitSwiper from 'react-native-bit-swiper';

const Images = [require(`./img/item_1.jpg`), require(`./img/item_2.jpg`), require(`./img/item_3.jpg`)];

const PaginateExample = () => {
  return (
    <BitSwiper
      items={['Item 1', 'Item 2', 'Item 3']}
      itemWidth="80%"
      inactiveItemScale={0.8}
      inactiveItemOpacity={0.5}
      inactiveItemOffset={30}
      loop
      // 페이지 스타일
      paginateStyle={{
        marginTop: -20,
      }}
      // 도트 스타일
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
          <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
        </View>
      )}
    />
  );
};

export default PaginateExample;
