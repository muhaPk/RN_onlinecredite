import React, {FC, useState} from 'react';
import {View} from 'react-native'
import { CustomText, H1, H2, H3, T, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import Slider from "react-native-a11y-slider";
import { Lang } from 'shared/lang';
import { calculateSliderData } from '../lib/calculateSliderData';

  export const Calculate: FC = () => {

      const { home } = Lang()

    const [sum, setSum] = useState(4000)
    const [nrMonth, setNrMonth] = useState(3)

    const handleSum = (value: number) => setSum(value)
    const handlePeriod = (value: number) => setNrMonth(value)


    const {refound, comission, interestRate, monthlyPayment} = calculateSliderData(sum, nrMonth)



    return (


            <Container className='my-8 px-4'>

                <CustomText type='h1' className='text-center'>{home.kalkulatorKredita}</CustomText>
                <Underline />


                <Slider 
                    min={2000} 
                    max={50000} 
                    increment={1000}
                    markerColor='#29aae2'
                    values={[sum]} 
                    onChange={(value: number[]) => handleSum(value[0])} 
                    labelStyle={{backgroundColor: '#29aae2', borderColor: 'transparent'}}
                    labelTextStyle={{color: 'white'}}
                />

                <Slider 
                    min={1} 
                    max={48} 
                    increment={1}
                    markerColor='#29aae2' 
                    values={[nrMonth]} 
                    onChange={(value: number[]) => handlePeriod(value[0])} 
                    labelStyle={{backgroundColor: '#29aae2', borderColor: 'transparent'}}
                    labelTextStyle={{color: 'white'}}
                />
                    


                <View className='w-full mt-4 flex flex-row justify-between'>
                    <T>{home.summaVozvrata}</T>
                    <T>{refound} MDL</T>
                </View>

                <View className='w-full mt-2 flex flex-row justify-between'>
                    <T>{home.summaKredita}</T>
                    <T>{sum} MDL</T>
                </View>

                <View className='w-full mt-2 flex flex-row justify-between'>
                    <T>{home.komissionnie}</T>
                    <T>{comission}</T>
                </View>

                <View className='w-full mt-2 flex flex-row justify-between'>
                    <T>{home.procantnaiaStavka}</T>
                    <T>{interestRate}</T>
                </View>

                <View className='w-full mt-2 flex flex-row justify-between'>
                    <T>{home.ejemesiacniiPlatej}</T>
                    <T>{monthlyPayment}</T>
                </View>

            </Container>
        

    )

  }

  