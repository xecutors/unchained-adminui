import CopilotCountryList, { CountryItemCompact } from '../CopilotCountryList';
import CopilotCurrencyList, {
  CurrencyItemCompact,
} from '../CopilotCurrencyList';
import CopilotLanguageList, {
  LanguageItemCompact,
} from '../CopilotLanguageList';

const localizationDisplayMap = {
  COUNTRY: {
    CREATE: CountryItemCompact,
    UPDATE: CountryItemCompact,
    REMOVE: CountryItemCompact,
    GET: CountryItemCompact,
    LIST: CopilotCountryList,
  },
  CURRENCY: {
    CREATE: CurrencyItemCompact,
    UPDATE: CurrencyItemCompact,
    REMOVE: CurrencyItemCompact,
    GET: CurrencyItemCompact,
    LIST: CopilotCurrencyList,
  },
  LANGUAGE: {
    CREATE: LanguageItemCompact,
    UPDATE: LanguageItemCompact,
    REMOVE: LanguageItemCompact,
    GET: LanguageItemCompact,
    LIST: CopilotLanguageList,
  },
};
export const renderLocalizationToolResponses = ({
  localizationType,
  action,
  data,
  ...rest
}) => {
  const Component = localizationDisplayMap?.[localizationType]?.[action];
  return Component ? (
    <Component type={localizationType} {...data} {...rest} />
  ) : null;
};
