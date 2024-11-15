import LocalizedStrings from 'react-native-localization';

import { ru } from './ru';
import { ro } from './ro';

let strings = new LocalizedStrings({
    ru: {
        ...ru,
    },
    ro: {
        ...ro,
    },
})

export const Lang = () => {

    // to get the current device interface language
    // strings.getInterfaceLanguage()

    strings.setLanguage('ru')

    return strings;
}