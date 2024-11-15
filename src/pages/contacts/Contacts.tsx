import React, {FC} from 'react';
import { View, Linking } from 'react-native'
import { useForm } from "react-hook-form";
import { CustomInput } from 'shared/ui/input/input'
import email from 'react-native-email';
import { EMAIL } from 'shared/config/consts';
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton';
import { Container } from 'shared/ui/Container/Container';
import { H1, H3, T, T2, Underline } from 'shared/ui/CustomText/CustomText';

export const Contacts: FC = () => {


    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            message: '',
        }
    });

    const onSubmit = (data: any) => {

        email([EMAIL], {
            subject: 'Test',
            body: data.message,
          }).catch(console.error);
    };


    return (

        <Container>

            <H1 className='mx-auto mt-6'>Контакты</H1>
            <Underline />


            <View className='items-center'>
                <T>O.C.N."ONLINE CREDIT" SRL</T>
                <T>(+373) 60371300</T>
                <T>online-credit.md@mail.ru</T>
                <T2 className='mt-4'>Мун. Кишинёв, бд. Мирча чел Бэтрын, 12/2, оф.301 (маг. Тирас) 4 этаж</T2>
                <T2 className='mt-2'>Режим работы: Пн. - Пт. 9:00 - 18:00 Суб. - 9:00 - 17:00 Вс.- 10:00 - 17:00</T2>
            </View>

            <H3 className='mt-8 mb-4 mx-auto center'>Написать нам</H3>


                <CustomInput control={control} errors={errors} placeholder="Имя" name="name" />
                <CustomInput control={control} errors={errors} placeholder="Телефон" name="phone" />
                <CustomInput control={control} errors={errors} type='textarea' placeholder="Сообщение" name="message" className='mb-4' />

                <SubmitButton title="Отирпвить" onPress={handleSubmit(onSubmit)} />

        </Container>


    );
}