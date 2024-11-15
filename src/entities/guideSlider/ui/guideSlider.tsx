import React, {FC, useRef} from 'react';
import { Text, View, ScrollView, Image } from 'react-native'
import { Poliline } from './polyline';

export const GuideSlider: FC = () => {
  

    const scrollxRef = useRef(null);
    const scrollyRef = useRef(null);

    const scrollxToPosition = () => {
        scrollxRef.current?.scrollTo({ x: 100, y: 0, animated: true });
      };

    const scrollyToPosition = () => {
        scrollyRef.current?.scrollTo({ x: 0, y: 200, animated: true });
      };

    return (

    <View>

        <ScrollView className='max-h-[320px]' ref={scrollxRef} horizontal>

            <View className='flex flex-col relative'>

                <Image className='max-h-80 w-[800px]' source={require('../../../shared/assets/lovka.png')} />

                <Poliline className='absolute' points='10,60 15,100 10,140 5,180 10,220 15,260' strokeWidth='1' color='red' />
                <Poliline className='absolute' points='20,60 25,100 20,140 15,180 20,220 25,260' strokeWidth='1' color='red' />


                
            </View>


        </ScrollView>


        <ScrollView ref={scrollyRef} className='w-full h-24'>
            <Text>title</Text>
            <Text>title 2</Text>
            <Text>title 3</Text>
            <Text>title 4</Text>
            <Text onPress={scrollxToPosition}>title 5</Text>
            <Text>title 6</Text>
            <Text>title 7</Text>
            <Text>title 8</Text>
            <Text>title 9</Text>
            <Text>title 10</Text>
        </ScrollView>

    </View>


    );
}