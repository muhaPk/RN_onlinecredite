import React, {FC, useState} from 'react';
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { useForm } from "react-hook-form";
import { H1, T, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';



export const Login: FC = () => {


    const [isOtpSent, setIsOtpSent] = useState(false);


    const { form, login } = Lang()

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log('message')
        console.log(data)
    };


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
            
                    <SubmitButton className='mt-4' title={form.buttons.login} onPress={handleSubmit(onSubmit)} />
                </>
            ) : (
                <>
                    <CustomInput control={control} errors={errors} placeholder={form.inputs.phone} name="code" />
            
                    <SubmitButton className='mt-4' title={form.buttons.verify} onPress={handleSubmit(onSubmit)} />
                </>
            )
        }
        <LinkButton className='mt-2' page='Registration' title={form.buttons.registration} styleColor='light' />

        
    </Container>


    );
}