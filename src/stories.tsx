import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {DATA} from './utils/data';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Stories = () => {
  const SwipeX = useRef(new Animated.Value(0)).current;

  const _renderItem = ({item, index}: any) => {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'black', width: width}}>
        <Text style={{color: 'white'}}>{item.Name}</Text>
        <Image style={{height: height, width: width}} source={item.Status} />
      </SafeAreaView>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList data={DATA} renderItem={_renderItem} horizontal />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({});
