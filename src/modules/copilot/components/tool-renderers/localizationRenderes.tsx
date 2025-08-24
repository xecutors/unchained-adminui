import copilotCount from '../copilotCount';
import CopilotCountryList, { CountryItemCompact } from '../CopilotCountryList';
import CopilotCurrencyList, {
  CurrencyItemCompact,
} from '../CopilotCurrencyList';
import CopilotLanguageList, {
  LanguageItemCompact,
} from '../CopilotLanguageList';
import { createActionMappings } from './shared/createRenderer';

const SHARED_ACTIONS = ['CREATE', 'UPDATE', 'REMOVE', 'GET'];

const localizationDisplayMap = {
  COUNTRY: {
    ...createActionMappings(SHARED_ACTIONS, CountryItemCompact),
    LIST: CopilotCountryList,
    COUNT: copilotCount('COUNTRY'),
  },
  CURRENCY: {
    ...createActionMappings(SHARED_ACTIONS, CurrencyItemCompact),
    LIST: CopilotCurrencyList,
    COUNT: copilotCount('CURRENCY'),
  },
  LANGUAGE: {
    ...createActionMappings(SHARED_ACTIONS, LanguageItemCompact),
    LIST: CopilotLanguageList,
    COUNT: copilotCount('LANGUAGE'),
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
