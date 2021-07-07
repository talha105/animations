import React, { useEffect, useRef, useState } from 'react';
import backgroundImg from "./background.jpg"
import faker from "faker"
import {
  Text,
  View,
  Animated,
  FlatList,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

const {width}=Dimensions.get('screen')

var data=[...Array(30).keys()].map(()=>{
return{
  image:faker.image.avatar(),
  name:faker.name.findName(),
  des:faker.lorem.words(10)
}
})
const App= () => {

  const scrollX=useRef(new Animated.Value(0)).current

  function renderCard({item,index}){
    const inputRange=[
      (index-2)*(width-170),
      (index-1)*(width-170),
      index*(width-170)
    ]
    const translateY=scrollX.interpolate({
      inputRange,
      outputRange:[0,-50,0]
    })
    if(item.key){
      return <View style={{width:(width-(width-170))/2}}/>
    }
      return (
        <Animated.View style={{...styles.card,transform:[{translateY}]}}>
          <Image
          style={{width:'100%',height:300,borderTopLeftRadius:10,borderTopRightRadius:10}}
          source={{uri:item.image}}
          />
          <View style={{width:'100%',backgroundColor:'white',padding:10,height:110}}>
            <Text>{item.name}</Text>
            <Text style={{color:'grey'}}>{item.des}</Text>
          </View>
  
        </Animated.View>
      )
  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#f6f6f6'}}>
      <Image
      source={backgroundImg}
      style={StyleSheet.absoluteFillObject}
      blurRadius={10}
      />
      <Animated.FlatList
      onScroll={Animated.event(
        [{ nativeEvent: {
          contentOffset: {
            x: scrollX
          }
        }
        
      }],{useNativeDriver:true}
      )}
      snapToInterval={width-170}
      horizontal
      decelerationRate={0}
      bounces={false}
      data={[{key:true},...data,{key:true}]}
      renderItem={renderCard}
      keyExtractor={(item,i)=>i.toString()}
      />
    </View>
  );
};

const styles=StyleSheet.create({
  card:{
    width:width-180,
    height:'70%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7,
    marginHorizontal:5

  }
})


export default App;
