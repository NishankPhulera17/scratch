import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ActionScreen = ({navigation}) => {
  const [selectedOperation, setSelectedOperation] = useState('Motion');
  const [aliveOperations, setAliveOperations] = useState([]);
  let operations = [];
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  console.log('width', width, 'height', height);
  console.log('alive operations', aliveOperations);
  const deleteDraggableComponent = (operation, action, by) => {
    console.log(operation, action, by);

    operations = operations.filter(op => {
      console.log(typeof op.operation, typeof operation);
      return op.operation !== operation || op.action !== action || op.by !== by;
    });
    console.log(operations);
  };
  const positionDraggableComponent = (operation, action, by) => {
    // console.log(operation,action,by)
    operations.push({
      operation: operation,
      action: action,
      by: by,
    });

    jsonObject = operations.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    operations = uniqueArray;
    console.log(operations);
    // if(xvalue>(0.5*width) )
    // {
    //     setIsDraggedToRight(true)

    // }
    // else if (xvalue<(0.5*width) )
    // {
    //     setIsDraggedToRight(false)
    // }
  };

  const DraggableComponent = props => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // console.log(gestureState)
          const {moveX, moveY} = gestureState;
          // console.log(gestureState)

          // Get the dimensions of the Screen view

          // Get the dimensions of the purple box
          const boxWidth = 0.35 * width;
          const boxHeight = 50;

          // Calculate the boundaries for the blue box to stay within the yellow view
          const minX = 0;
          const maxX = width - 200;
          const minY = 0;
          const maxY = height - 150;

          // Calculate the new position of the box
          const x = moveX - boxWidth;
          const y = moveY - boxHeight;

          // Check if the box is going out of bounds in the X direction
          if (x < minX) {
            pan.x.setValue(minX);
            deleteDraggableComponent(props.operation, props.action, props.by);
          } else if (x > maxX) {
            pan.x.setValue(maxX);
            positionDraggableComponent(props.operation, props.action, props.by);
          }
          //   else if(x>maxX/2)
          //   {
          //
          //   }
          else {
            pan.x.setValue(x);
          }

          // Check if the box is going out of bounds in the Y direction
          if (y < minY) {
            pan.y.setValue(minY);
          } else if (y > maxY) {
            pan.y.setValue(maxY);
          } else {
            pan.y.setValue(y);
          }
        },
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      }),
    ).current;
    return (
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box}>
          <Text style={{color: 'white'}}>
            {props.operation} {props.action}
          </Text>
          {props.by && <Text style={{color: 'white'}}>by {props.by}</Text>}
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#DDDDDD'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          height: '10%',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedOperation('Motion');
            setAliveOperations([...aliveOperations, operations[0]]);
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: '#d82759',
            borderRadius: 25,
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 4}}>
            Motion
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedOperation('Looks');
            setAliveOperations([...aliveOperations, operations[0]]);
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: '#305fcf',
            borderRadius: 25,
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 4}}>
            Looks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedOperation('Sound');
            setAliveOperations([...aliveOperations, operations[0]]);
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: '#558faa',
            borderRadius: 25,
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 4}}>
            Sound
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedOperation('Event');
            setAliveOperations([...aliveOperations, operations[0]]);
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: '#e19f1e',
            borderRadius: 25,
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 4}}>
            Event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedOperation('Control');
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: '#c54d3a',
            borderRadius: 25,
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 4}}>
            Control
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: '80%', width: '50%', backgroundColor: 'white'}}>
        {/* movement------------------------------ */}
        {selectedOperation === 'Motion' && (
          <>
            <DraggableComponent
              operation="move"
              action="X"
              by={50}
              positionDraggableComponent={
                positionDraggableComponent
              }></DraggableComponent>
            <DraggableComponent
              operation="move"
              action="Y"
              by={50}
              positionDraggableComponent={
                positionDraggableComponent
              }></DraggableComponent>
            <DraggableComponent
              operation="rotate"
              action="rotate"
              by={90}
              positionDraggableComponent={
                positionDraggableComponent
              }></DraggableComponent>
            <DraggableComponent
              operation="glide"
              by={50}
              positionDraggableComponent={
                positionDraggableComponent
              }></DraggableComponent>
          </>
        )}

        {/* looks------------------------------ */}

        {selectedOperation === 'Looks' && (
          <>
            <DraggableComponent
              operation="message"
              action="Hi"
              positionDraggableComponent={
                positionDraggableComponent
              }></DraggableComponent>
            <DraggableComponent
              operation="message"
              action="Hi"
              by={2000}
              positionDraggableComponent={
                positionDraggableComponent
              }></DraggableComponent>
          </>
        )}

        {/* sound-------------------------------------------- */}

        {selectedOperation === 'Sound' && (
          <DraggableComponent
            operation="sound"
            action="cat"
            positionDraggableComponent={
              positionDraggableComponent
            }></DraggableComponent>
        )}

        {/* events-------------------------------------------- */}
        {selectedOperation === 'Event' && (
          <DraggableComponent
            operation="event"
            action="catpress"
            positionDraggableComponent={
              positionDraggableComponent
            }></DraggableComponent>
        )}
      </View>

      <View
        style={{
          height: '10%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (aliveOperations === []) {
              console.log(true);
              navigation.navigate('MainScreen', {actions: operations});
            } else {
              navigation.navigate('MainScreen', {actions: aliveOperations});
            }
          }}
          style={{
            height: 40,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            borderRadius: 20,
          }}>
          <Text style={{color: 'white'}}>Add actions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    marginTop: 20,
    marginLeft: 30,
    padding: 10,
    width: '70%',
    backgroundColor: '#7461e3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActionScreen;
