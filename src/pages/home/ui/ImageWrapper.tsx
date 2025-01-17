import React, {FC} from 'react';
import {View, Image} from 'react-native'
import { CustomText, H1, H2, H3, T } from 'shared/ui/CustomText/CustomText';
import Vector from 'shared/assets/vector.svg'
import { Lang } from 'shared/lang';

  export const ImageWrapper: FC = () => {

    const { home } = Lang()

    return (


      <View className='w-9/12 mx-auto'>
        <View className='flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#29aae2]'>

            <Image className='w-full h-[200px] align-middle rounded-t-lg' source={require('../../../shared/assets/card.jpg')} />
            
            <View className='-mt-[94px]'>
                <Vector />
            </View>
            <View className='p-6 mb-4'>
                <T className='text-white'>{home.kreditiMogut}</T>
            </View>

        </View>
      </View>
        

    )

  }

  