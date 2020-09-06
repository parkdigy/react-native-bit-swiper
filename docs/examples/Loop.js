import React from 'react';
import {View, Image} from 'react-native';
import BitSwiper from 'react-native-bit-swiper';

const Images = [require(`./img/item_1.jpg`), require(`./img/item_2.jpg`), require(`./img/item_3.jpg`)];

const LoopExample = () => {
  return (
    <BitSwiper
      items={['Item 1', 'Item 2', 'Item 3']}
      itemWidth="80%"
      inactiveItemScale={0.8}
      inactiveItemOpacity={0.5}
      inactiveItemOffset={30}
      loop // 루프 사용
      onItemRender={(item, index) => (
        <View key={index} style={{height: 150}}>
          <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
        </View>
      )}
    />
  );
};

export default LoopExample;
