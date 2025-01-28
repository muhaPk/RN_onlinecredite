import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { languageVar } from '../lang/model/languageVar';
import { Lang } from 'shared/lang';

export const useLanguageEffect = () => {
  const currentLanguage = useReactiveVar(languageVar);

  useEffect(() => {
    const strings = Lang();
    strings.setLanguage(currentLanguage)
  }, [currentLanguage]);
};
