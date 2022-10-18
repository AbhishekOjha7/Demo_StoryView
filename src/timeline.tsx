import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
const {height, width} = Dimensions.get('window');
const StoryView = () => {
  const [content, setcontent] = useState<any>([
    {
      status: 0,
      type: 'image',
      content: require('./assets/images/status1.jpeg'),
    },
    {
      status: 0,
      type: 'image',
      content: require('./assets/images/status2.jpeg'),
    },
    {
      status: 0,
      type: 'image',
      content: require('./assets/images/status3.jpeg'),
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeline = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.timing(timeline, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  };
  const next = () => {
    if (currentIndex != content.length - 1) {
      let tempData = content;
      tempData[currentIndex].status = 1;
      setcontent(tempData);
      setCurrentIndex(currentIndex + 1);
      timeline.setValue(0);
    } else {
      close();
    }
  };

  const previos = () => {
    if (currentIndex - 1 >= 0) {
      let tempData = content;
      tempData[currentIndex - 1].status = 0;
      setcontent(tempData);
      setCurrentIndex(currentIndex - 1);
      timeline.setValue(0);
    } else {
      close();
    }
  };

  const close = () => {
    timeline.setValue(0);
  };
  return (
    <View style={styles.mainContainerStyle}>
      <Image
        source={content[currentIndex].content}
        style={{height: height, width: width}}
        onLoadEnd={() => {
          timeline.setValue(0);
          startAnimation();
        }}
      />
      <View style={styles.timelineBarStyle}>
        {content.map((_item: any, index: any) => {
          return (
            <View
              style={{
                flex: 1,
                height: 3,
                marginHorizontal: 4,
                backgroundColor: 'lightgrey',
                flexDirection: 'row',
              }}>
              <Animated.View
                style={{
                  flex:
                    currentIndex == index ? timeline : content[index].status,
                  height: 3,
                  backgroundColor: 'green',
                }}></Animated.View>
            </View>
          );
        })}
      </View>
      <View style={styles.profileNcloseViewStyle}>
        <TouchableOpacity style={{marginRight: 20}}>
          <Image
            style={{height: 35, width: 35}}
            source={require('./assets/images/man.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            close();
          }}
          style={{marginRight: 20}}>
          <Image
            style={{
              height: 35,
              width: 35,
              tintColor: 'white',
              resizeMode: 'contain',
            }}
            source={require('./assets/images/close.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.touchableViewStyle}>
        <TouchableOpacity
          style={{width: width / 3.3, height: height}}
          onPress={() => {
            previos();
          }}>
          <View></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: width / 3.3, height: height}}
          onPress={() => {
            next();
          }}>
          <View></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryView;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
  touchableViewStyle: {
    top: 100,
    width: width,
    height: height,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineBarStyle: {
    top: 10,
    width: width,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  lightlineVieStyle: {
    flex: 1,
    height: 3,
    marginHorizontal: 4,
    backgroundColor: 'lightgrey',
  },
  profileNcloseViewStyle: {
    width: width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 30,
    marginLeft: 10,
  },
});
