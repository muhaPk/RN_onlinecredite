import React, {FC} from 'react';
import { H1, H2, H3, T } from 'shared/ui/CustomText/CustomText';
import {Ul, Li} from 'shared/ui/CustomTags/CustomTags'
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';

  export const CrediteInformation: FC = () => {

    const { home: {information} } = Lang()

    return (


        <Container className='my-10'>

          <H3 className='text-center mb-6'>{information.title}</H3>
          <T className='text-center mb-6'>{information.description}</T>
          <Ul>
              <Li className='mb-4'>{information.point}</Li>
              <Li className='mb-4'>{information.point2}</Li>
              <Li className='mb-4'>{information.point3}</Li>
              <Li>{information.point4}</Li>
          </Ul>

        </Container>
        

    )

  }

  