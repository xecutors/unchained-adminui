import CopilotCurrencyList, {
  CurrencyItemCompact,
} from '../CopilotCurrencyList';

export const renderSingleCurrency = (data: any) =>
  data?.currency ? <CurrencyItemCompact currency={data.currency} /> : null;

export const renderMultipleCurrencies = (data: any) =>
  data?.currencies ? (
    <CopilotCurrencyList currencies={data.currencies} />
  ) : null;
