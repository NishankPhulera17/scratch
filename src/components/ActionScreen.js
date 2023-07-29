import React, {useRef,useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text,Dimensions} from 'react-native';

const ActionScreen = () => {
    let operations=[]
    
    const height = Dimensions.get('window').height
    const width =Dimensions.get('window').width
    console.log("width",width,"height",height)
    
    // const setDragged=()=>{
    //     setIsDraggedToRight(false)
    // }

    const positionDraggableComponent=(operation,action,by)=>{
        // console.log(operation,action,by)
        operations.push({
            "operation":operation,
            "action":action,
            "by":by
        })
        // if(xvalue>(0.5*width) )
        // {
        //     setIsDraggedToRight(true)
            
        // }
        // else if (xvalue<(0.5*width) )
        // {
        //     setIsDraggedToRight(false)
        // }
        jsonObject = operations.map(JSON.stringify);
        uniqueSet = new Set(jsonObject);
        uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    
        console.log(uniqueArray);
    }
    

    const DraggableComponent=(props)=>{
        const pan = useRef(new Animated.ValueXY()).current;
        
        
        
        const panResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove:  (evt, gestureState) => {
            // console.log(gestureState)
            const {moveX,moveY} = gestureState;
            // console.log(gestureState)
            

            // Get the dimensions of the Screen view
          
  
          // Get the dimensions of the purple box
          const boxWidth = 0.35*width;
          const boxHeight = 50;
  
          // Calculate the boundaries for the blue box to stay within the yellow view
          const minX = 0;
          const maxX = width-200;
          const minY = 0;
          const maxY = height - 150;
  
          // Calculate the new position of the box
          const x = moveX - boxWidth ;
          const y = moveY - boxHeight ;
          
          
  
          // Check if the box is going out of bounds in the X direction
          if (x < minX) {
            pan.x.setValue(minX);  
          } 
          else if (x > maxX) {
            pan.x.setValue(maxX);
            positionDraggableComponent(props.operation,props.action,props.by)
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
                <View style={styles.box} />
                
              </Animated.View>
           
          );
    }
    return (
        <View style={{height:"100%",width:"100%"}}>
            
            <View style={{height:'100%',width:"50%",backgroundColor:"white"}}>
            <DraggableComponent operation="move" action="X" by={50}  positionDraggableComponent={positionDraggableComponent}></DraggableComponent>
            <DraggableComponent operation="move" action="Y" by={50}  positionDraggableComponent={positionDraggableComponent}></DraggableComponent>
            </View>
            <View style={{height:'100%',width:"50%",backgroundColor:"#DDDDDD"}}></View>

            

            
            
        </View>
    );
}

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
    marginTop:20,
    marginLeft:30,
    height: 50,
    width: '70%',
    backgroundColor: '#7461e3',
    borderRadius: 5,
  },
});

export default ActionScreen;
