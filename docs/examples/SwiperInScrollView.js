import React, {useState} from 'react';
import {Platform, ScrollView, View, Image, Button} from 'react-native';
import BitSwiper from 'react-native-bit-swiper';

const isIos = Platform.OS === 'ios';
const Images = [require(`./img/item_1.jpg`), require(`./img/item_2.jpg`), require(`./img/item_3.jpg`)];

const SwiperInScrollViewExample = () => {
  const [disableScrollViewPanResponder, setDisableScrollViewPanResponder] = useState(true);

  const handleScrollBeginDrag = () => {
    setDisableScrollViewPanResponder(false);
  };

  const handleScrollEndDrag = () => {
    setDisableScrollViewPanResponder(true);
  };

  return (
    <ScrollView
      disableScrollViewPanResponder={isIos && disableScrollViewPanResponder}
      onScrollBeginDrag={isIos && handleScrollBeginDrag}
      onScrollEndDrag={isIos && handleScrollEndDrag}>
      <BitSwiper
        items={['Item 1', 'Item 2', 'Item 3']}
        itemWidth="80%"
        inactiveItemScale={0.8}
        inactiveItemOpacity={0.5}
        inactiveItemOffset={30}
        loop
        autoplay
        autoplayInterval={1000}
        onItemRender={(item, index) => (
          <View key={index} style={{height: 150}}>
            <Image source={Images[index]} style={{width: '100%', height: '100%'}} />
          </View>
        )}
      />
      <Button title="Button" onPress={() => console.log('Button press!')} />
    </ScrollView>
  );
};

export default SwiperInScrollViewExample;
