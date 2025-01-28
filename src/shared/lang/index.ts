import LocalizedStrings from 'react-native-localization';
import { languageVar } from './model/languageVar';

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
    strings.setLanguage(languageVar());
    return strings;
};