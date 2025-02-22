import React, {FC, useState} from 'react';
import { Image, View } from 'react-native';
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { Button } from 'shared/ui/Button/Button';
import { useForm } from "react-hook-form";
import { H1, T, T2, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEND_OTP, VERIFY_OTP, GOOGLE_AUTH_MUTATION } from 'shared/api/graphql/mutations/user';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { signInWithGoogle } from 'shared/api/google';
import { useNavigate } from "shared/hooks/useNavigate";


export const Login: FC = () => {
    const [googleAuth] = useMutation(GOOGLE_AUTH_MUTATION);

    const { navigateToPage } = useNavigate();


    const [isOtpSent, setIsOtpSent] = useState(false);
    const [phone, setPhone] = useState('');


    const { form, login } = Lang()

    const { control, handleSubmit, setError, reset, formState: { errors } } = useForm();

    const [sendOtp] = useMutation(SEND_OTP);
    const [verifyOtp] = useMutation(VERIFY_OTP);


    const handleSendOtp = async (data: any) => {

        const { phone } = data;
        try {
            const response = await sendOtp({ variables: { phone } });

            setPhone(phone);
            setIsOtpSent(true);
            reset({ phone: "" })
            
        } catch (error: any) {
            console.log("Error", error.message)
            console.log("Error", JSON.stringify(error, null, 2)); // Log the full error object

        }
    };

    const handleVerifyOtp = async (data: any) => {
        const { code } = data;
        try {
            const response = await verifyOtp({ variables: { phone, otp: code } })
            const { accessToken, refreshToken, userId } = response.data.verifyOtp

            if (!accessToken || !refreshToken) {
                console.error('Missing tokens in response:')
                return
              }

            await AsyncStorage.setItem('accessToken', accessToken)
            await AsyncStorage.setItem('refreshToken', refreshToken)
            await AsyncStorage.setItem('userId', userId.toString())
            reset({ code: "" })
            setIsOtpSent(false);

            navigateToPage("Home");


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
    

    const handleGoogleLogin = async () => {
        const idToken = await signInWithGoogle();

        if (!idToken) return;
    
        try {
          const { data } = await googleAuth({ variables: { token: idToken } });
          console.log('Login Successful', `Token: ${data.googleAuth}`)

          if (data?.googleAuth) {
            await AsyncStorage.setItem('accessToken', data.googleAuth)
          }

        } catch (error) {
          console.error(error);
          console.log('Login Failed', 'Something went wrong')
        }
      };


    return (



    <Container className='pt-20'>


        

        {
            !isOtpSent ? (
                // login
                <>
        
                    <View className='flex-row justify-center'>
                        <IconMaterialIcons 
                            name="supervised-user-circle" 
                            size={90} 
                            color="#29aae2"
                        />
                    </View>

                    <H1 className='mx-auto mt-6 mb-4'>{login.vhod}</H1>

                    {/* <T2 className='mb-3 text-gray-500'>{form.description.phone}</T2> */}

                    <CustomInput 
                        icon
                        iconName='login'
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
            
                    <SubmitButton className='mt-4' title={form.buttons.login} onPress={handleSubmit(handleSendOtp)} fullWidth />

                    <SubmitButton className='mt-4' title={form.buttons.signInWithGoogle} onPress={handleGoogleLogin} fullWidth />
                    
                    

                    <LinkButton className='mt-2' page='Registration' title={form.buttons.registration} colorStyle='light' />
                </>
            ) : (
                // verify otp code
                <>

                    <View className='flex-row justify-center'>
                        <IconMaterialIcons
                            name="sms" 
                            size={90} 
                            color="#29aae2"
                        />
                    </View>

                    <H1 className='mx-auto mt-6'>Верификация</H1>
                    <Underline className='mb-10' />

                    {/* <T2 className='mb-3 text-gray-500'>{form.description.smsCode}</T2> */}

                    <CustomInput 
                        control={control} 
                        errors={errors} 
                        placeholder={form.inputs.code} 
                        name="code"
                        title={form.label.otpCode}
                        rules={{
                            required: 'OTP code is required',
                        }}
                    />
            
                    <SubmitButton className='mt-4' title={form.buttons.verify} onPress={handleSubmit(handleVerifyOtp)} />

                    <Button 
                        className='mt-2' 
                        title={form.buttons.login} 
                        colorStyle='light' 
                        onPress={() => {
                            reset({ phone: '' })
                            setIsOtpSent(false)
                        } } 
                    />
                </>
            )
        }
        

        
    </Container>


    );
}