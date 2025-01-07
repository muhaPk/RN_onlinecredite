import React, {FC, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Steps } from './ui/Steps';
import { Options } from './ui/Options';
import { Calculate } from './ui/Calculate';
import { Requirements } from './ui/Requirements';
import { Intro } from './ui/Intro';
import { ImageWrapper } from './ui/ImageWrapper';
import { CrediteInformation } from './ui/CrediteInformation';

export const Home: FC = () => {

    return (

    <View className=''>

        <Intro />
        <ImageWrapper />
        <Calculate />
        <CrediteInformation />
        <Options />
        <Steps />
        <Requirements />
        
    </View>

    );
}