import React, {FC} from 'react';
import {View, Text} from 'react-native'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { CustomText, H1, H2, H3, T } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import VectorInvers from 'shared/assets/vectorInvers.svg';
import { Lang } from 'shared/lang';
import { useReactiveVar } from '@apollo/client';
import { languageVar } from 'shared/lang/model/languageVar';

export const Intro: FC = () => {

  const { home, form } = Lang()

  return (

    <>

      <Container className='bg-[#29aae2] py-4'>

        <CustomText type='h1' className='text-center text-2xl my-4 text-white'>{home.creditZa} <Text className='text-[#29aae2] bg-white'>{home.minut}</Text></CustomText>
        <T className='text-center mb-4 text-white'>{home.zapolnite}</T>
        <LinkButton page='Registration' title={form.buttons.fill} colorStyle='light' />

      </Container>

    
      <VectorInvers />

    </>

  )

}