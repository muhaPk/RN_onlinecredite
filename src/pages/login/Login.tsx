import React, {FC, useState} from 'react';
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { Button } from 'shared/ui/Button/Button';
import { useForm } from "react-hook-form";
import { H1, T, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEND_OTP, VERIFY_OTP } from 'shared/api/graphql/mutations/user';

const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
        console.log("Error saving token", error);
    }
};


export const Login: FC = () => {


    const [isOtpSent, setIsOtpSent] = useState(false);
    const [phone, setPhone] = useState('');


    const { form, login } = Lang()

    const { control, handleSubmit, setError, reset, formState: { errors } } = useForm();

    const [sendOtp] = useMutation(SEND_OTP);
    const [verifyOtp] = useMutation(VERIFY_OTP);



    const handleSendOtp = async (data: any) => {
        const { phone } = data;
        try {
            await sendOtp({ variables: { phone } });
            setPhone(phone);
            setIsOtpSent(true);
            reset({ phone: "" })
            
        } catch (error: any) {
            console.log("Error", error.message)
        }
    };

    const handleVerifyOtp = async (data: any) => {
        const { code } = data;
        try {
            const response = await verifyOtp({ variables: { phone, otp: code } });
            const token = response.data.verifyOtp.accessToken;

            saveToken(token)
        } catch (error: any) {

            const errorMessage = error.message || '';

            if (errorMessage.includes('Invalid or expired OTP')) {
                setError('code', {
                    type: 'manual',
                    message: 'The OTP is invalid or expired',
                });
            }

            console.log("Error", error.message)
        }
    }
    


    return (

    <Container>


        <H1 className='mx-auto mt-6'>{login.vhod}</H1>
        <Underline />

        {
            !isOtpSent ? (
                <>
                    <CustomInput 
                        control={control} 
                        errors={errors} 
                        placeholder={form.inputs.phone} 
                        name="phone"
                        rules={{
                            pattern: {
                              value: /[^A-Za-z]+$/,
                              message: 'Invalid phone number format',
                            },
                            validate: {
                              required: (value: any) => !!value?.trim() || 'Phone number is required',
                              minLength: (value: any) =>
                                value?.trim().length > 5 || 'Phone number must be at least 6 characters',
                            },
                          }}

                        />
            
                    <SubmitButton className='mt-4' title={form.buttons.login} onPress={handleSubmit(handleSendOtp)} />

                    <LinkButton className='mt-2' page='Registration' title={form.buttons.registration} styleColor='light' />
                </>
            ) : (
                <>
                    <CustomInput 
                        control={control} 
                        errors={errors} 
                        placeholder={form.inputs.code} 
                        name="code"
                        rules={{
                            required: 'OTP code is required',
                        }}
                    />
            
                    <SubmitButton className='mt-4' title={form.buttons.verify} onPress={handleSubmit(handleVerifyOtp)} />

                    <Button className='mt-2' title={form.buttons.login} styleColor='light' onPress={() => setIsOtpSent(false)} />
                </>
            )
        }
        

        
    </Container>


    );
}