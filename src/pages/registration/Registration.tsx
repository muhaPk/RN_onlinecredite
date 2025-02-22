import React, {FC, useRef} from 'react';
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { useForm } from "react-hook-form";
import { H1, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';
import { CREATE_USER } from 'shared/api/graphql/mutations/user';
import { CHECK_IS_PHONE_UNIQUE } from 'shared/api/graphql/queries/user';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from "shared/hooks/useNavigate";

export const Registration: FC = () => {

    const { form, registration } = Lang()
    const { navigateToPage } = useNavigate();

    const [createUser] = useMutation(CREATE_USER);
    const [checkIsPhoneUnique] = useLazyQuery(CHECK_IS_PHONE_UNIQUE);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            id_passport: '',
            email: '',
            phone: '',
            name: '',
            surname: '',
        }
    });

    const checkPhoneUniqueness = async (phone: string) => {
        const result = await checkIsPhoneUnique({ variables: { phone } });
        return result.data.user === null;
    }

    const onSubmit = async (data: any) => {
        const { id_passport, email, phone, name, surname } = data;

        // const isUnique = await checkPhoneUniqueness(phone);
        // console.log('isUnique: ' + isUnique)
        // if (!isUnique) {
        //     console.log('Phone number is already in use.');
        //     return;
        // }

        try {
            await createUser({ variables: { id_passport, email, phone, name, surname } });
            reset({ id_passport: '', phone: '', name: '', surname: '' })
            navigateToPage("Login");
            
        } catch (error: any) {
            error && console.log('error ' + JSON.stringify(error, null, 2))
            console.log("Error", error.message)
        }

    };


    return (

    <Container>


        <H1 className='mx-auto mt-6'>{registration.registratia}</H1>
        <Underline />

        <CustomInput icon iconName='email' control={control} errors={errors} placeholder={form.inputs.email} name="email" />
        <CustomInput icon iconName='vcard' control={control} errors={errors} placeholder={form.inputs.idnp} name="id_passport" />
        <CustomInput icon iconName='phone-alt' iconSize={20} control={control} errors={errors} placeholder={form.inputs.phone} name="phone" />
        <CustomInput icon iconName='user' control={control} errors={errors} placeholder={form.inputs.name} name="name" />
        <CustomInput icon iconName='user' control={control} errors={errors} placeholder={form.inputs.surname} name="surname" />

        <SubmitButton className='mt-4' title={form.buttons.registration} onPress={handleSubmit(onSubmit)} fullWidth />
        <LinkButton className='mt-2' page='Login' title={form.buttons.login} colorStyle='light' />

        
    </Container>


    );
}