import { useState, useEffect, useCallback } from 'react';
import { Language, Translations, getTranslation } from '@/lib/translations';

/**
 * Custom hook for translations with reactive language switching
 * Listens for 'languageChange' events and re-renders when language changes
 */
export function useTranslation() {
    const [language, setLanguage] = useState<Language>('id');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Get initial language from localStorage
        const savedLang = localStorage.getItem('language') as Language | null;
        if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
            setLanguage(savedLang);
        }

        // Listen for language changes
        const handleLanguageChange = (e: CustomEvent<Language>) => {
            setLanguage(e.detail);
        };

        window.addEventListener('languageChange', handleLanguageChange as EventListener);

        return () => {
            window.removeEventListener('languageChange', handleLanguageChange as EventListener);
        };
    }, []);

    const t = getTranslation(language);

    const switchLanguage = useCallback((newLang: Language) => {
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
        document.documentElement.lang = newLang;
        window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
    }, []);

    return {
        language,
        t,
        switchLanguage,
        isEnglish: language === 'en',
        isIndonesian: language === 'id',
        mounted,
    };
}

export default useTranslation;
