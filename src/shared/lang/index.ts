import LocalizedStrings from 'react-native-localization';

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

    // to get the current device interface language
    // strings.getInterfaceLanguage()

    strings.setLanguage('en')

    return strings;
}