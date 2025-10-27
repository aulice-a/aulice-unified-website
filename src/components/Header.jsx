// src/components/Header.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <header className="text-center py-4 px-5 bg-[#1a365d] text-white">
      <nav className="mb-4 space-x-4 text-sm">
        <a href="/" className="hover:underline">{t('home')}</a>
        <a href="/about" className="hover:underline">{t('about')}</a>
        <a href="/pricing" className="hover:underline">{t('pricing')}</a>
        <a href="/lexicon" className="hover:underline">{t('argot')}</a>
        <a href="/teacher" className="hover:underline">{t('teacher')}</a>
        <a href="/contact" className="hover:underline">{t('contact')}</a>
      </nav>
    </header>
  );
};

export default Header;