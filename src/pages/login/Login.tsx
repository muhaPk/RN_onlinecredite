import React, {FC} from 'react';
import { ImageBackground, View } from 'react-native';
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { H1, T, T2 } from 'shared/ui/CustomText/CustomText';
import { Lang } from 'shared/lang';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_AUTH_MUTATION } from 'shared/api/graphql/mutations/user';
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { signInWithGoogle } from 'shared/api/google';


export const Login: FC = () => {
    const [googleAuth] = useMutation(GOOGLE_AUTH_MUTATION);


    const { form } = Lang()


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



            <View className='flex-1 bg-[#222a2d]'>

                <ImageBackground source={require('../../shared/assets/smartphone.jpg')} className='flex-1' resizeMode='cover'></ImageBackground>

                <View className='h-80 clex-col items-center'>
                    <H1 className='text-white text-3xl mb-2'>English Coach</H1>
                    <T2 className='text-white mb-10'>English Coach</T2>
                    <SubmitButton className='' title={form.buttons.signInWithGoogle} onPress={handleGoogleLogin} fullWidth icon={<IconAntDesign name="google" size={24} color="#333" />} />
                </View>

            </View>


    );
}