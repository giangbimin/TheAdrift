import { SETTINGS } from '../../constants';
import { en } from '../../lang/en';
import { vi } from '../../lang/vi';

type SupportedLanguages = 'en' | 'vi';

class TranslationManager {
    private static instance: TranslationManager;
    private currentLang: SupportedLanguages = SETTINGS.DEFAULT_LANG as SupportedLanguages;
    private translations: Record<SupportedLanguages, any> = { en, vi };

    private constructor() { }

    public static getInstance(): TranslationManager {
        if (!TranslationManager.instance) {
            TranslationManager.instance = new TranslationManager();
        }
        return TranslationManager.instance;
    }

    public setLanguage(lang: SupportedLanguages) {
        this.currentLang = lang;
    }

    public getCurrentLanguage(): SupportedLanguages {
        return this.currentLang;
    }

    public t(key: string): string {
        return this.translations[this.currentLang][key] || key;
    }

    public toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'vi' : 'en';
    }
}

export const translationManager = TranslationManager.getInstance();
export const t = (key: string) => translationManager.t(key);
