import { AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
import { useTranslation } from 'react-i18next';

const ContentRemoval = () => {
  const { t } = useTranslation();
  return (
    <AnimatePresence mode="wait">
      <div className="container mx-auto p-4 flex justify-center"> {/* Centering container */}
        <Card className="w-full max-w-4xl glass"> {/* Apply Card and glass effect */}
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('contentRemoval.title', 'Content Removal')}</CardTitle> {/* Use CardTitle */}
          </CardHeader>
          <CardContent className="prose prose-invert"> {/* Apply prose to content */}

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">{t('contentRemoval.educationalNotice.title', 'Educational Project Notice')}</h2>
              <p className="text-white/80">
                {t('contentRemoval.educationalNotice.description', 'This is an educational demonstration project. We do not host or store any media content. All content removal requests should be directed to the appropriate content owners or hosting services.')}
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">{t('contentRemoval.sections.understandingRole.title', 'Understanding Our Role')}</h2>
            <p className="mb-4">
              {t('contentRemoval.sections.understandingRole.description', 'As an educational frontend demonstration:')}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('contentRemoval.sections.understandingRole.items.0', 'We do not host any media content')}</li>
              <li>{t('contentRemoval.sections.understandingRole.items.1', 'Content is displayed through third-party APIs')}</li>
              <li>{t('contentRemoval.sections.understandingRole.items.2', 'We have no control over the content provided by these services')}</li>
              <li>{t('contentRemoval.sections.understandingRole.items.3', 'This project is for educational purposes only')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">{t('contentRemoval.sections.howToRemove.title', 'How to Remove Content')}</h2>
            <p className="mb-4">
              {t('contentRemoval.sections.howToRemove.description', 'If you wish to have content removed:')}
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>{t('contentRemoval.sections.howToRemove.steps.0', 'Identify the specific content in question')}</li>
              <li>{t('contentRemoval.sections.howToRemove.steps.1', 'Determine which third-party service is hosting the content')}</li>
              <li>{t('contentRemoval.sections.howToRemove.steps.2', 'Contact the appropriate content host or owner directly')}</li>
              <li>{t('contentRemoval.sections.howToRemove.steps.3', 'Follow their content removal procedures')}</li>
            </ol>

            <h2 className="text-2xl font-semibold mb-3">{t('contentRemoval.sections.thirdPartyServices.title', 'Third-Party Services')}</h2>
            <p className="mb-4">
              {t('contentRemoval.sections.thirdPartyServices.content', 'Content removal requests should be directed to the respective content owners or hosting services. We cannot process content removal requests as we do not host or control any media content.')}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{t('contentRemoval.sections.importantNote.title', 'Important Note')}</h3>
              <p className="text-white/80">
                {t('contentRemoval.sections.importantNote.content', 'This application may be discontinued at any time as it exists solely for educational and demonstration purposes. We are not responsible for any content displayed through third-party APIs.')}
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">{t('contentRemoval.sections.contact.title', 'Contact')}</h2>
            <p className="mb-4">
              {t('contentRemoval.sections.contact.content', 'For questions about this educational demonstration, contact:')}
              <br />
              {t('contentRemoval.sections.contact.email', 'Email: demo@example.com (for demonstration purposes only)')}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
              <p className="text-white/80">
                {t('contentRemoval.lastUpdated', 'Last updated: March 26, 2025')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatePresence>
  );
};

export default ContentRemoval;
