import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
const MainScreen = ({navigation, route}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [message, setMessage] = useState();
  const [messageTimer, setMessageTimer] = useState(0);
  const [glideTimer, setGlideTimer] = useState(false);
  const [sprit, setSprit] = useState(require('../../assets/catScratch.png'));
  const actions = route.params?.actions;
  // useEffect(() => {

  //   console.log(isFound);
  // }, []);

  Sound.setCategory('Playback');
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  console.log(width);
  var meow = new Sound('meow.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log(
      'duration in seconds: ' +
        meow.getDuration() +
        'number of channels: ' +
        meow.getNumberOfChannels(),
    );
  });
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const {moveX, moveY, dx, dy} = gestureState;
        console.log(gestureState);
        // Get the dimensions of the yellow view
        const yellowViewWidth = width; // Replace this with the actual width of the yellow view
        const yellowViewHeight = 0.6 * height; // Replace this with the actual height of the yellow view

        // Get the dimensions of the blue box
        const boxWidth = 100;
        const boxHeight = 100;

        // Calculate the boundaries for the blue box to stay within the yellow view
        const minX = 0;
        const maxX = yellowViewWidth;
        const minY = 0;
        const maxY = yellowViewHeight - boxHeight;

        // Calculate the new position of the box
        const x = moveX - boxWidth;
        const y = moveY - boxHeight;
        console.log(dx, dy);
        // Check if the box is going out of bounds in the X direction

        if (x < minX) {
          pan.x.setValue(minX);
          setX(minX);
        } else if (x > maxX) {
          pan.x.setValue(maxX);
          setX(maxX);
        } else {
          pan.x.setValue(x);
          setX(x);
        }
        if (y < minY) {
          pan.y.setValue(minY);
          setY(minY);
        } else if (y > maxY) {
          pan.y.setValue(maxY);
          setY(maxY);
        } else {
          pan.y.setValue(y);
          setY(y);
        }

        // Check if the box is going out of bounds in the Y direction
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;
  useEffect(() => {
    meow.setVolume(10);
    return () => {
      meow.release();
    };
  }, []);
  useEffect(() => {
    setGlideTimer(false);
    Animated.timing(pan, {
      toValue: x,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [glideTimer]);

  const playPause = () => {
    console.log('play');
    meow.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const runactions = () => {
    console.log(actions);
    if (actions !== undefined) {
      // const isFound = actions.some(element => {
      //   return element.operation === 'event' && element.action === 'catpress';
      // });
      // if (!isFound) {
      actions.map(item => {
        if (x < width - 50 && y < height) {
          if (item.operation === 'move') {
            console.log('Movement', x, width);

            if (item.action === 'X') {
              pan.x.setValue(x + Number(item.by));
              setX(x + Number(item.by));
            } else {
              pan.y.setValue(y + Number(item.by));
              setY(y + Number(item.by));
            }
          } else if (item.operation === 'rotate') {
            setRotate(rotate + item.by);
          } else if (item.operation === 'message') {
            setMessage(item.action);

            if (item.by !== undefined) {
              setMessageTimer(item.by);
              setTimeout(() => {
                setMessage('');
              }, messageTimer);
            } else {
              setMessage(item.action);
            }
          } else if (item.operation === 'glide') {
            if (item.action === undefined) {
              setX(x + Number(item.by));
              setY(y + Number(item.by));
              setGlideTimer(true);
            }
          } else if (item.operation === 'sound') {
            if (item.action === 'cat') {
              playPause();
              console.log('sound');
            }
          }
        }
      });
      // }
    }
  };

  const SpritBox = () => {
    const heightBox = 0.18 * height;
    console.log('Height', heightBox);
    return (
      <View
        style={{
          height: heightBox,
          width: '30%',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'grey',
          marginBottom: 20,
          backgroundColor: 'white',
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity style={{position: 'absolute', right: -10, top: -10}}>
          <Image
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              borderRadius: 20,
            }}
            source={require('../../assets/delete.jpg')}></Image>
        </TouchableOpacity>
        <Image
          style={{height: 60, width: 60, resizeMode: 'contain', marginTop: 20}}
          source={sprit}></Image>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ActionScreen');
          }}
          style={{
            backgroundColor: '#7461e3',
            height: 40,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 14}}>ADD ACTIONS</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
      }}>
      <View
        style={{
          height: '60%',
          width: width,
          marginBottom: 10,
          elevation: 10,
          backgroundColor: '#7461e3',
        }}>
        <Animated.View
          style={{
            transform: [
              {translateX: pan.x},
              {translateY: pan.y},
              {rotate: `${rotate}deg`},
            ],
            height: 100,
            width: 100,
          }}
          {...panResponder.panHandlers}>
          {message && (
            <View>
              <Image
                source={require('../../assets/message.png')}
                resizeMode={'contain'}
                style={{
                  // transform: [
                  //   {translateX: pan.x},
                  //   {translateY: pan.y},
                  //   {rotate: `${rotate}deg`},
                  // ],
                  height: 120,
                  width: 120,
                  marginLeft: 60,
                }}
                {...panResponder.panHandlers}></Image>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  position: 'absolute',
                  top: 40,
                  left: 74,
                  fontWeight: '700',
                }}>
                {message}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              checkEvent();
            }}></TouchableOpacity>
          <Image
            source={require('../../assets/catScratch.png')}
            resizeMode={'contain'}
            style={{
              // transform: [
              //   {translateX: pan.x},
              //   {translateY: pan.y},
              //   {rotate: `${rotate}deg`},
              // ],
              height: 100,
              width: 100,
            }}
            {...panResponder.panHandlers}></Image>
        </Animated.View>
      </View>
      <View
        style={{height: '8%', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            runactions();
          }}>
          <Text style={{color: 'black'}}>RUN</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          elevation: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          Sprit : {sprit}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 80,
          }}>
          X : {Math.floor(x)}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 80,
          }}>
          Y : {Math.floor(y)}
        </Text>
      </View>
      <View
        style={{
          height: '22%',
          width: '100%',
          backgroundColor: '#DDDDDD',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <SpritBox></SpritBox>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
