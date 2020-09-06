import React from 'react';
import {View, Image} from 'react-native';
import BitSwiper from 'react-native-bit-swiper';

const Images = [require(`./img/item_1.jpg`), require(`./img/item_2.jpg`), require(`./img/item_3.jpg`)];

const ItemAlignExample = () => {
  return (
    <BitSwiper
      items={['Item 1', 'Item 2', 'Item 3']}
      itemWidth="80%"
      itemAlign="top"
      inactiveItemOffset={30}
      loop
      onItemRender={(item, index) => (
        <View key={index} style={{height: [150, 180, 200][index]}}>
          <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
        </View>
      )}
    />
  );
};

export default ItemAlignExample;
