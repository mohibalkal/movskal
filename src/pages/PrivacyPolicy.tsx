import { AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence mode="wait">
      <div className="container mx-auto p-4 flex justify-center"> {/* Centering container */}
        <Card className="w-full max-w-4xl glass"> {/* Apply Card and glass effect */}
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('privacyPolicy.title', 'Privacy Policy')}</CardTitle> {/* Use CardTitle */}
          </CardHeader>
          <CardContent className="prose prose-invert"> {/* Apply prose to content */}

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">{t('privacyPolicy.educationalNotice.title', 'Educational Demonstration Notice')}</h2>
              <p className="text-white/80">
                {t('privacyPolicy.educationalNotice.description', 'This application is an educational demonstration that uses third-party APIs. We prioritize your privacy while demonstrating frontend development concepts.')}
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.informationCollection.title', '1. Information Collection')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.informationCollection.description', 'We collect minimal information necessary for the educational demonstration:')}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('privacyPolicy.sections.informationCollection.items.0', 'Basic account information (if you choose to create an account)')}</li>
              <li>{t('privacyPolicy.sections.informationCollection.items.1', 'Watch history and preferences (stored locally)')}</li>
              <li>{t('privacyPolicy.sections.informationCollection.items.2', 'Usage analytics for demonstration purposes')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.useOfInformation.title', '2. Use of Information')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.useOfInformation.description', 'The information collected is used solely to:')}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('privacyPolicy.sections.useOfInformation.items.0', 'Demonstrate user authentication features')}</li>
              <li>{t('privacyPolicy.sections.useOfInformation.items.1', 'Showcase personalization capabilities')}</li>
              <li>{t('privacyPolicy.sections.useOfInformation.items.2', 'Improve the educational demonstration')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.thirdPartyServices.title', '3. Third-Party Services')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.thirdPartyServices.content', 'Our demonstration interfaces with third-party APIs. We do not control and are not responsible for their privacy practices. Users should review the privacy policies of these services.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.dataStorage.title', '4. Data Storage')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.dataStorage.content', 'Most user preferences and watch history are stored locally in your browser. Any server-side data may be deleted at any time as this is a demonstration project.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.dataSecurity.title', '5. Data Security')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.dataSecurity.content', 'While we implement reasonable security measures, this is an educational demonstration and should not be used for sensitive information.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.yourRights.title', '6. Your Rights')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.yourRights.description', 'You can:')}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('privacyPolicy.sections.yourRights.items.0', 'Access your stored information')}</li>
              <li>{t('privacyPolicy.sections.yourRights.items.1', 'Delete your account and associated data')}</li>
              <li>{t('privacyPolicy.sections.yourRights.items.2', 'Clear local storage and cookies')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicy.sections.childrensPrivacy.title', '7. Children\'s Privacy')}</h2>
            <p className="mb-4">
              {t('privacyPolicy.sections.childrensPrivacy.content', 'This educational demonstration is not intended for children under 13. We do not knowingly collect information from children under 13.')}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
              <p className="text-white/80">
                {t('privacyPolicy.lastUpdated', 'Last updated: March 26, 2025')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatePresence>
  );
};

export default PrivacyPolicy;
