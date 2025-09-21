import { AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence mode="wait">
      <div className="container mx-auto p-4 flex justify-center"> {/* Centering container */}
        <Card className="w-full max-w-4xl glass"> {/* Apply Card and glass effect */}
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('termsOfService.title', 'Terms of Service')}</CardTitle> {/* Use CardTitle */}
          </CardHeader>
          <CardContent className="prose prose-invert"> {/* Apply prose to content */}
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">{t('termsOfService.educationalNotice.title', 'Educational Demonstration Notice')}</h2>
              <p className="text-white/80">
                {t('termsOfService.educationalNotice.description', 'This application is strictly an educational demonstration project. We do not host, store, or distribute any media content. All content is fetched from third-party APIs for demonstration purposes only.')}
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.acceptance.title', '1. Acceptance of Terms')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.acceptance.content', 'By accessing and using this educational demonstration, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this application.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.serviceDescription.title', '2. Service Description')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.serviceDescription.content', 'This is a frontend demonstration project that interfaces with third-party APIs to showcase programming concepts and techniques. The service may be discontinued at any time without notice.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.disclaimer.title', '3. Disclaimer of Responsibility')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.disclaimer.content', 'We are not responsible for any content displayed through third-party APIs. We do not verify, endorse, or take responsibility for any content shown through our demonstration interface.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.thirdPartyContent.title', '4. Third-Party Content')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.thirdPartyContent.content', 'All media content displayed is sourced from third-party APIs. Rights to such content belong to their respective owners. We do not claim ownership of any media content displayed through our interface.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.noWarranties.title', '5. No Warranties')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.noWarranties.content', 'This service is provided "as is" without any warranties of any kind. We do not guarantee the availability, accuracy, or continuity of the service as this is purely for educational demonstration.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.limitationOfLiability.title', '6. Limitation of Liability')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.limitationOfLiability.content', 'We shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use this educational demonstration.')}
            </p>

            <h2 className="text-2xl font-semibold mb-3">{t('termsOfService.sections.changesToTerms.title', '7. Changes to Terms')}</h2>
            <p className="mb-4">
              {t('termsOfService.sections.changesToTerms.content', 'We reserve the right to modify these terms at any time without prior notice. Continued use of the service after any such changes constitutes your acceptance of the new terms.')}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
              <p className="text-white/80">
                {t('termsOfService.lastUpdated', 'Last updated: March 26, 2025')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatePresence>
  );
};

export default TermsOfService;
