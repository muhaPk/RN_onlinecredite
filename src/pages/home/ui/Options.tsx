import React, {FC} from 'react';
import {View} from 'react-native'
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import IconFontAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { CustomText, H1, H2, H3, T } from 'shared/ui/CustomText/CustomText';
import { Lang } from 'shared/lang';

  export const Options: FC = () => {

    const { home } = Lang()

    return (

        <View className='pb-10 pt-6 mt-6 bg-[#f6f6f6]'>

            <View className='w-full flex flex-col mt-8 mb-4 mx-4'>

                <View className='p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-[#29aae2]'>
                    <IconFontAwesome6 
                        name="money-bill-transfer" 
                        size={24} 
                        color="#fff"
                    />
                </View>

                <CustomText type='h3'>{home.poluciaiteDenigi}</CustomText>
                <T>{home.zapolniteZaiavku}</T>
            </View>

            <View className='w-full flex flex-col mt-8 mb-4 mx-4'>
                <View className='p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-[#29aae2]'>
                    <IconEntypo 
                        name="info" 
                        size={24} 
                        color="#fff"
                    />
                </View>
                <CustomText type='h3'>{home.nizkiiProcent}</CustomText>
                <T>{home.procentnaiaStavka}</T>
            </View>

            <View className='w-full flex flex-col mt-8 mb-4 mx-4'>
                <View className='p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-[#29aae2]'>
                    <IconFontAntDesign 
                        name="notification" 
                        size={24} 
                        color="#fff"
                    />
                </View>
                <CustomText type='h3'>{home.bezSkritihPlatejei}</CustomText>
                <T>{home.vseUslovia}</T>
            </View>

        </View>
        

    )

  }

  