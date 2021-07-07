import React, { useEffect, useState } from 'react';
import backgroundImg from "../background.jpg"
import faker from "faker"
import {
  Text,
  View,
  Animated,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';

var data=[...Array(30).keys()].map(()=>{
return{
  image:faker.image.avatar(),
  name:faker.name.findName(),
  des:faker.lorem.words(10)
}
})
const ScrollYAnimated= () => {

  const scrollY=useState(new Animated.Value(0))[0]

  useEffect(()=>{
    console.log(scrollY)
  },[scrollY])

  function renderCard({item,index}){
    const inputRange=[-1,0,110*index,110*(index+2)]
    const scale=scrollY.interpolate({
      inputRange,
      outputRange:[1,1,1,0]
    })
    const inputOpacityRange=[-1,0,110*index,110*(index+1)]
    const opacity=scrollY.interpolate({
      inputRange:inputOpacityRange,
      outputRange:[1,1,1,0]
    })
    return (
      <Animated.View style={{...styles.card,transform:[{scale}],opacity:opacity}}>
        <Image
        style={{width:50,height:50,borderRadius:50/2}}
        source={{uri:item.image}}
        />
        <View style={{width:'70%',marginLeft:10}}>
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
            y: scrollY
          }
        }
        
      }],{useNativeDriver:true}
      )}
      showsVerticalScrollIndicator={false}
      style={{width:'90%'}}
      data={data}
      renderItem={renderCard}
      keyExtractor={(item,i)=>i.toString()}
      />
    </View>
  );
};

const styles=StyleSheet.create({
  card:{
    backgroundColor:'rgba(255,255,255,0.7)',
    width:'100%',
    alignItems:'center',
    marginVertical:5,
    borderRadius:7,
    flexDirection:'row',
    paddingLeft:10,
    height:100

  }
})


export default ScrollYAnimated;
