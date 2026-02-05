import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, Translations, getTranslation } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('id'); // Default Indonesian
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage for saved preference
        const savedLang = localStorage.getItem('language') as Language | null;
        if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        // Update html lang attribute
        document.documentElement.lang = lang;
    };

    const t = getTranslation(language);

    // Provide a default value during SSR
    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ language: 'id', setLanguage, t: getTranslation('id') }}>
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
