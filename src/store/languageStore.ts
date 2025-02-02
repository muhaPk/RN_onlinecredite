import {create} from 'zustand'
import LocalizedStrings from 'react-native-localization';

interface languageStore {
  language: string
  setLanguage: (lang: string) => void
}

// const defaultLanguage = new LocalizedStrings({}).getInterfaceLanguage()
// console.log('defaultLanguage ' + defaultLanguage)

export const useLanguageStore = create<languageStore>((set) => ({

    language: 'ru',
    setLanguage: (lang) => set({ language: lang })

}))