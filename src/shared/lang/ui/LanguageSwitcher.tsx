import React, {FC} from 'react';
import { Text, View, Pressable } from 'react-native';
import Ru from 'shared/assets/vector/ru.svg'
import Us from 'shared/assets/vector/us.svg'
import { T2 } from 'shared/ui/CustomText/CustomText';
import { Lang } from 'shared/lang';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'

import { useLanguageStore } from 'store/languageStore';

interface LanguageSwitcherProps {
    update: () => void;
  }

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({update}) => {

  const language = useLanguageStore(state => state.language)
  const setLanguage = useLanguageStore(state => state.setLanguage)

  const { menu } = Lang()

  const switchLanguage = (lang: string) => {
    setLanguage(lang)
    update()
  }
  

  return (
    <View className='p-2'>

        <Pressable onPress={() => switchLanguage('ru')} className='flex-row justify-start items-center my-2'>
            <Ru className='mx-2' />
            <T2 className='ml-2'>{menu.ru}</T2>
            {
                language === 'ru' &&
                    <View className='ml-auto mr-2'>
                        <FontAwesomeIcons name='check' color='#333' />
                    </View>
            }
        </Pressable>

        <Pressable onPress={() => switchLanguage('en')} className='flex-row justify-start items-center my-2'>
            <Us className='mx-2' />
            <T2 className='ml-2'>{menu.en}</T2>
            {
                language === 'en' &&
                    <View className='ml-auto mr-2'>
                        <FontAwesomeIcons name='check' color='#333' />
                    </View>
            }
        </Pressable>
        
    </View>
  );
};
