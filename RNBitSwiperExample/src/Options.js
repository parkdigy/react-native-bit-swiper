import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Switch, Text} from 'react-native';
import OptionItem from './OptionItem';

const windowWidth = Dimensions.get('window').width;
const halfWindowWidth = Math.round((windowWidth * 0.6) / 50) * 50;

const newRadioItem = (label, value) => {
  return {label, value};
};

const Options = ({
  itemWidth,
  onItemWidthChange,
  itemAlign,
  onItemAlignChange,
  itemScaleAlign,
  onItemScaleAlignChange,
  activeItemScale,
  onActiveItemScaleChange,
  activeItemOpacity,
  onActiveItemOpacityChange,
  inactiveItemScale,
  onInactiveItemScaleChange,
  inactiveItemOpacity,
  onInactiveItemOpacityChange,
  inactiveItemOffset,
  onInactiveItemOffsetChange,
  loop,
  onLoopChange,
  loopCloneCount,
  onLoopCloneCountChange,
  loopSingleItem,
  onLoopSingleItemChange,
  autoplay,
  onAutoplayChange,
  autoplayDelay,
  onAutoplayDelayChange,
  autoplayInterval,
  onAutoplayIntervalChange,
  showPaginate,
  onShowPaginateChange,
  customPaginateDot,
  onCustomPaginateDotChange,
}) => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
      <Text style={styles.optionTitle}>Item</Text>

      {/* itemWidth */}
      <OptionItem
        title="itemWidth"
        titleHelp="default: 100%"
        radioValue={itemWidth}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem('70%', '70%'),
          newRadioItem('80%', '80%'),
          newRadioItem('90%', '90%'),
          newRadioItem(halfWindowWidth, halfWindowWidth),
        ]}
        onRadioChange={onItemWidthChange}
      />

      {/* itemAlign */}
      <OptionItem
        title="itemAlign"
        titleHelp="default: top"
        radioValue={itemAlign}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem('top', 'top'),
          newRadioItem('middle', 'middle'),
          newRadioItem('bottom', 'bottom'),
        ]}
        onRadioChange={onItemAlignChange}
      />

      {/* itemScaleAlign */}
      <OptionItem
        title="itemScaleAlign"
        titleHelp="default: middle"
        radioValue={itemScaleAlign}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem('top', 'top'),
          newRadioItem('middle', 'middle'),
          newRadioItem('bottom', 'bottom'),
        ]}
        onRadioChange={onItemScaleAlignChange}
      />

      <Text style={styles.optionTitle}>Active Item</Text>

      {/* activeItemScale */}
      <OptionItem
        title="activeItemScale"
        titleHelp="default: 1"
        radioValue={activeItemScale}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(0.5, 0.5),
          newRadioItem(0.8, 0.8),
          newRadioItem(0.9, 0.9),
          newRadioItem(1, 1),
        ]}
        onRadioChange={onActiveItemScaleChange}
      />

      {/* activeItemOpacity */}
      <OptionItem
        title="activeItemOpacity"
        titleHelp="default: 1"
        radioValue={activeItemOpacity}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(0.2, 0.2),
          newRadioItem(0.5, 0.5),
          newRadioItem(0.8, 0.8),
          newRadioItem(1, 1),
        ]}
        onRadioChange={onActiveItemOpacityChange}
      />

      <Text style={styles.optionTitle}>Inactive Item</Text>

      {/* inactiveItemScale */}
      <OptionItem
        title="inactiveItemScale"
        titleHelp="default: 1"
        radioValue={inactiveItemScale}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(0.5, 0.5),
          newRadioItem(0.8, 0.8),
          newRadioItem(0.9, 0.9),
          newRadioItem(1, 1),
        ]}
        onRadioChange={onInactiveItemScaleChange}
      />

      {/* inactiveItemOpacity */}
      <OptionItem
        title="inactiveItemOpacity"
        titleHelp="default: 1"
        radioValue={inactiveItemOpacity}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(0.2, 0.2),
          newRadioItem(0.5, 0.5),
          newRadioItem(0.8, 0.8),
          newRadioItem(1, 1),
        ]}
        onRadioChange={onInactiveItemOpacityChange}
      />

      {/* inactiveItemOffset */}
      <OptionItem
        title="inactiveItemOffset"
        titleHelp="default: 0"
        radioValue={inactiveItemOffset}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(5, 5),
          newRadioItem(10, 10),
          newRadioItem(20, 20),
          newRadioItem(30, 30),
        ]}
        onRadioChange={onInactiveItemOffsetChange}
      />

      <Text style={styles.optionTitle}>Loop</Text>

      {/* loop */}
      <OptionItem title="loop" titleHelp="default: false" row>
        <Switch value={loop} onChange={() => onLoopChange(!loop)} />
      </OptionItem>

      {/* loopSingleItem */}
      <OptionItem title="loopSingleItem" titleHelp="default: false" row>
        <Switch value={loopSingleItem} onChange={() => onLoopSingleItemChange(!loopSingleItem)} />
      </OptionItem>

      {/* loopCloneCount */}
      <OptionItem
        title="loopCloneCount"
        titleHelp="default: 4"
        radioValue={loopCloneCount}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(2, 2),
          newRadioItem(3, 3),
          newRadioItem(4, 4),
          newRadioItem(5, 5),
        ]}
        onRadioChange={onLoopCloneCountChange}
      />

      <Text style={styles.optionTitle}>Autoplay</Text>

      {/* autoplay */}
      <OptionItem title="autoplay" titleHelp="default: false" row>
        <Switch value={autoplay} onChange={() => onAutoplayChange(!autoplay)} />
      </OptionItem>

      {/* autoplayDelay */}
      <OptionItem
        title="autoplayDelay"
        titleHelp="default: 1000"
        radioValue={autoplayDelay}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(1000, 1000),
          newRadioItem(2000, 2000),
          newRadioItem(3000, 3000),
          newRadioItem(5000, 5000),
        ]}
        onRadioChange={onAutoplayDelayChange}
      />

      {/* autoplayInterval */}
      <OptionItem
        title="autoplayInterval"
        titleHelp="default: 3000"
        radioValue={autoplayInterval}
        radioItems={[
          newRadioItem('None', undefined),
          newRadioItem(1000, 1000),
          newRadioItem(2000, 2000),
          newRadioItem(3000, 3000),
          newRadioItem(5000, 5000),
        ]}
        onRadioChange={onAutoplayIntervalChange}
      />

      <Text style={styles.optionTitle}>Paginate</Text>

      {/* showPaginate */}
      <OptionItem title="showPaginate" titleHelp="default: true" row>
        <Switch value={showPaginate} onChange={() => onShowPaginateChange(!showPaginate)} />
      </OptionItem>

      {/* customPaginateDot */}
      <OptionItem title="Use custom paginate dot" row>
        <Switch value={customPaginateDot} onChange={() => onCustomPaginateDotChange(!customPaginateDot)} />
      </OptionItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default Options;
