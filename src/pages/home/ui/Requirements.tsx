import React, {FC} from 'react';
import {View} from 'react-native'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { CustomText, H1, H2, H3, T, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';

  export const Requirements: FC = () => {

    const { home } = Lang()

    return (


        <Container className='mt-8 pb-6 bg-[#29aae2]'>

            <CustomText type='h1' className='text-center mt-8 text-white'>{home.trebovaniaKZaiomsiku}</CustomText>
            <Underline className='border-b-white' />
            
            <View className='flex flex-row'>

                <View className='p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 ml-2 mr-4 rounded-full bg-[#30c1ff]'>
                  <IconIonicons name="man-sharp" size={24} color="#fff" />
                </View>

                <View>
                  <CustomText type='h3' className='text-white'>{home.vozrast}</CustomText>
                  <T className='text-[#eee] leading-5'>{home.vozrastOt}</T>
                </View>

            </View>
            
            <View className='flex flex-row'>

                <View className='p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 ml-2 mr-4 rounded-full bg-[#30c1ff]'>
                  <IconIonicons name="flag" size={24} color="#fff" />
                </View>

                <View>
                  <CustomText type='h3' className='text-white'>{home.grajdanstvoRespubliki}</CustomText>
                  <T className='text-[#eee] pr-8 leading-5'>{home.kreditiPredostavliaiutsia}</T>
                </View>

            </View>
            
            <View className='flex flex-row'>

                <View className='p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 ml-2 mr-4 rounded-full bg-[#30c1ff]'>
                  <IconMaterial name="cellphone-play" size={24} color="#fff" />
                </View>

                <View>
                  <CustomText type='h3' className='text-white'>{home.mobilniiTelefon}</CustomText>
                  <T className='text-[#eee] pr-8 leading-5'>{home.nalicieMobilinogo}</T>
                </View>

            </View>



        </Container>
        

    )

  }

  