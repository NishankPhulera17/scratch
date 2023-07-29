import React,{useRef,useState} from 'react';
import {View, StyleSheet,PanResponder,Animated,Dimensions,Image, Text, TouchableOpacity} from 'react-native';

const MainScreen = ({navigation}) => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [sprit, setSprit] = useState(require('../../assets/catScratch.png'))
  
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    console.log(width)
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          const { moveX, moveY } = gestureState;
          console.log(gestureState)
          // Get the dimensions of the yellow view
          const yellowViewWidth = width; // Replace this with the actual width of the yellow view
          const yellowViewHeight = 0.5*height; // Replace this with the actual height of the yellow view
  
          // Get the dimensions of the blue box
          const boxWidth = 100;
          const boxHeight = 100;
  
          // Calculate the boundaries for the blue box to stay within the yellow view
          const minX = 0;
          const maxX = yellowViewWidth;
          const minY = 0;
          const maxY = yellowViewHeight - boxHeight;
  
          // Calculate the new position of the box
          const x = moveX - boxWidth ;
          const y = moveY - boxHeight ;
          
          
  
          // Check if the box is going out of bounds in the X direction
          if (x < minX) {
            pan.x.setValue(minX);
            setX(minX)
          } else if (x > maxX) {
            pan.x.setValue(maxX);
            setX(maxX)
          } else {
            pan.x.setValue(x);
            setX(x)
          }
  
          // Check if the box is going out of bounds in the Y direction
          if (y < minY) {
            pan.y.setValue(minY);
            setY(minY)
          } else if (y > maxY) {
            pan.y.setValue(maxY);
            setY(maxY)
          } else {
            pan.y.setValue(y);
            setY(y)
          }
        },
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      }),
    ).current;

    const SpritBox=()=>{
      const heightBox=0.18*height
      console.log("Height",heightBox)
      return(
        <View style={{height:heightBox,width:'30%',borderRadius:10,borderWidth:1,borderColor:'grey',marginBottom:20,backgroundColor:"white",marginLeft:10,alignItems:"center",justifyContent:'flex-start'}}>
          <TouchableOpacity style={{position:"absolute",right:-10,top:-10}}>
          <Image style={{height:40,width:40,resizeMode:'contain',borderRadius:20}} source={require('../../assets/delete.jpg')}></Image>
          </TouchableOpacity>
          <Image style={{height:60,width:60,resizeMode:"contain",marginTop:20}} source={sprit}></Image>
          <TouchableOpacity onPress={()=>{navigation.navigate("ActionScreen")}} style={{backgroundColor:"#7461e3",height:40,width:'100%',position:"absolute",bottom:0,alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:'white',fontSize:14}}>ADD ACTIONS</Text>
          </TouchableOpacity>
        </View>
      )
    }
    
    return (
        
    <View style={{alignItems:"center",justifyContent:"flex-start",height:'100%'}}>
        <View style={{height:'60%',width:width,marginBottom:10,elevation:10,backgroundColor:"#7461e3"}}>
        <Animated.Image
        source={require('../../assets/catScratch.png')}
        resizeMode={'contain'}
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          height:100,
          width:100
        }}
        {...panResponder.panHandlers}>
           </Animated.Image>
        </View>
        <View style={{height:'16%',width:'100%',backgroundColor:"white",alignItems:"center",justifyContent:"flex-start",flexDirection:"row",elevation:10}}>
          <Text style={{color:"black",fontSize:18,fontWeight:'bold',marginLeft:20}}>Sprit : {sprit}</Text>
          <Text style={{color:"black",fontSize:18,fontWeight:'bold',marginLeft:80}}>X : {Math.floor(x)}</Text>
          <Text style={{color:"black",fontSize:18,fontWeight:'bold',marginLeft:80}}>Y : {Math.floor(y)}</Text>
        </View>
        <View style={{height:'24%',width:'100%',backgroundColor:'#DDDDDD',alignItems:'center',justifyContent:'flex-start',flexDirection:"row"}}>
          <SpritBox></SpritBox>
        </View>
     
    </View>
  );
    
}

const styles = StyleSheet.create({})

export default MainScreen;
