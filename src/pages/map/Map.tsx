import React, {FC} from 'react';
import { View, Linking } from 'react-native'
import { useForm } from "react-hook-form";
import { CustomInput } from 'shared/ui/input/input'
import email from 'react-native-email';
import { EMAIL } from 'shared/config/consts';
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton';
import { Container } from 'shared/ui/Container/Container';
import { H1, H3, T, T2, Underline } from 'shared/ui/CustomText/CustomText';


export const Map: FC = () => {


    return (

        <Container>

            <H1 className='mx-auto mt-6'>Map</H1>
            <Underline />

        </Container>


    );
}