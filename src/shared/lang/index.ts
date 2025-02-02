import LocalizedStrings from 'react-native-localization';
import { useLanguageStore } from 'store/languageStore';

import { ru } from './ru';
import { en } from './en';

let strings = new LocalizedStrings({
    ru: {
        ...ru,
    },
    en: {
        ...en,
    },
})

export const Lang = () => {

    const language = useLanguageStore((state) => state.language)
    strings.setLanguage(language);
    return strings;
};