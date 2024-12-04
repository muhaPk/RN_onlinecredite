import React, {FC, useState, useCallback, useEffect} from 'react';
import { Container } from 'shared/ui/Container/Container';
import { H1, H3, T, T2, Underline } from 'shared/ui/CustomText/CustomText';
import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_USER } from 'shared/api/graphql/queries/user';
import { useFocusEffect } from '@react-navigation/native';

export const Cabinet: FC = () => {


    return (

        <Container>

            <H1 className='mx-auto mt-6'>Личный кабинет</H1>
            <Underline />

            {/* <H3 className='mt-8 mb-4 mx-auto center'>{data.user.name}</H3>
            <H3 className='mt-8 mb-4 mx-auto center'>{data.user.email}</H3>
            <H3 className='mt-8 mb-4 mx-auto center'>{data.user.phone}</H3> */}

        </Container>


    );
}