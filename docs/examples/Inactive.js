import React from 'react';
import {View, Image} from 'react-native';
import BitSwiper from 'react-native-bit-swiper';

const Images = [require(`./img/item_1.jpg`), require(`./img/item_2.jpg`), require(`./img/item_3.jpg`)];

const InactiveExample = () => {
  return (
    <BitSwiper
      items={['Item 1', 'Item 2', 'Item 3']}
      itemWidth="80%" // 활성 아이템의 넓이
      inactiveItemScale={0.8} // 비활성 아이템의 스케일
      inactiveItemOpacity={0.5} // 비활성 아이템의 투명도
      inactiveItemOffset={30} // 비활성 아이템 표시 넓이
      onItemRender={(item, index) => (
        <View key={index} style={{height: 150}}>
          <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
        </View>
      )}
    />
  );
};

export default InactiveExample;
