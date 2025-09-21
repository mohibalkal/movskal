import { AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
import { useTranslation } from 'react-i18next';

const DMCANotice = () => {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence mode="wait">
      <div className="container mx-auto p-4 flex justify-center"> {/* Centering container */}
        <Card className="w-full max-w-4xl glass"> {/* Apply Card and glass effect */}
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('dmcaNotice.title', 'DMCA Notice')}</CardTitle> {/* Use CardTitle */}
          </CardHeader>
          <CardContent className="prose prose-invert"> {/* Apply prose to content */}

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">{t('dmcaNotice.importantNotice.title', 'Important Notice')}</h2>
              <p className="text-white/80">
                {t('dmcaNotice.importantNotice.description', 'This is an educational demonstration project that does not host any content. All content is fetched from third-party APIs. DMCA notices should be directed to the respective content owners or hosting services.')}
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">{t('dmcaNotice.sections.ourRole.title', 'Our Role')}</h2>
            <p className="mb-4">
              {t('dmcaNotice.sections.ourRole.description', 'This application is a frontend demonstration that:')}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('dmcaNotice.sections.ourRole.items.0', 'Does not host or store any media content')}</li>
              <li>{t('dmcaNotice.sections.ourRole.items.1', 'Uses third-party APIs for educational purposes only')}</li>
              <li>{t('dmcaNotice.sections.ourRole.items.2', 'Has no control over the content provided by these APIs')}</li>
              <li>{t('dmcaNotice.sections.ourRole.items.3', 'May be discontinued at any time')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">{t('dmcaNotice.sections.thirdPartyContent.title', 'Third-Party Content')}</h2>
            <p className="mb-4">
              {t('dmcaNotice.sections.thirdPartyContent.description', 'For any copyright concerns:')}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('dmcaNotice.sections.thirdPartyContent.items.0', 'Identify the specific content in question')}</li>
              <li>{t('dmcaNotice.sections.thirdPartyContent.items.1', 'Contact the actual hosting service or content owner')}</li>
              <li>{t('dmcaNotice.sections.thirdPartyContent.items.2', 'Submit DMCA notices to the appropriate content provider')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">{t('dmcaNotice.sections.contactInformation.title', 'Contact Information')}</h2>
            <p className="mb-4">
              {t('dmcaNotice.sections.contactInformation.content', 'While we do not host content, if you have questions about our educational demonstration, contact us at:')}
              <br />
              {t('dmcaNotice.sections.contactInformation.email', 'Email: demo@example.com (for demonstration purposes only)')}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{t('dmcaNotice.disclaimer.title', 'Disclaimer')}</h3>
              <p className="text-white/80">
                {t('dmcaNotice.disclaimer.content', 'We are not responsible for any content displayed through third-party APIs. This is purely an educational demonstration of frontend development techniques.')}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
              <p className="text-white/80">
                {t('dmcaNotice.lastUpdated', 'Last updated: March 26, 2025')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatePresence>
  );
};

export default DMCANotice;
