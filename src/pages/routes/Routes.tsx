import React, {FC} from 'react';
import { Container } from 'shared/ui/Container/Container';
import { H1, H3, T, T2, Underline } from 'shared/ui/CustomText/CustomText';
import { GuideSlider } from 'entities/guideSlider/ui/guideSlider';

export const Routes: FC = () => {


    return (

        <Container>

            <H1 className='mx-auto mt-6'>Routes</H1>
            <Underline />

            <GuideSlider />
            

        </Container>


    );
}