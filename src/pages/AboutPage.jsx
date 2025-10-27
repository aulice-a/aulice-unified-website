// src/pages/AboutPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{t('about')}</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Aulice Academy offers specialized English courses tailored for aspiring professionals in various fields, helping you confidently communicate and excel in your career.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Can You Handle a Crisis in English?</h2>
          <p className="text-gray-700 mb-6">
            Test your skills in our free crisis simulator — no signup required. Experience realistic scenarios and see how you lead under pressure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Specialized English Courses</h2>

          {/* Course List */}
          <div className="space-y-6 mt-8">
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('bankingProfessionals')}</h3>
              <p>{t('bankingDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('logisticsCoordinator')}</h3>
              <p>{t('logisticsDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('miningEngineers')}</h3>
              <p>{t('miningDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('medicalProfessional')}</h3>
              <p>{t('medicalDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('oilGasProfessionals')}</h3>
              <p>{t('oilGasDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('pilotAtcs')}</h3>
              <p>{t('aviationDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('cabinCrew')}</h3>
              <p>{t('cabinDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('aestheticians')}</h3>
              <p>{t('aestheticianDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('legalProfessional')}</h3>
              <p>{t('legalDescription')}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-indigo-700">{t('hotelHospitality')}</h3>
              <p>{t('hotelDescription')}</p>
            </div>
          </div>

          {/* Young Geniuses */}
          <div className="mt-10 p-6 bg-indigo-50 rounded-xl">
            <h3 className="text-xl font-bold text-indigo-800">{t('youngGenius')}</h3>
            <p className="mt-2">{t('youngGeniusDescription')}</p>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              {t('enroll')} →
            </button>
          </div>

          {/* Dream Achiever Plan */}
          <div className="mt-8 p-6 border border-indigo-200 rounded-xl">
            <h3 className="text-xl font-bold text-indigo-800">{t('dreamAchieverPlan')}</h3>
            <p className="mt-2">{t('dreamAchieverDescription')}</p>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              {t('enroll')} →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;