import CopilotLanguageList, {
  LanguageItemCompact,
} from '../CopilotLanguageList';

export const renderSingleLanguage = (data: any) =>
  data?.language ? <LanguageItemCompact language={data.language} /> : null;

export const renderMultipleLanguages = (data: any) =>
  data?.languages ? <CopilotLanguageList languages={data.languages} /> : null;
