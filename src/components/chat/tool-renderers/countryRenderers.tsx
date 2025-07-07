import CopilotCountryList, { CountryItemCompact } from '../CopilotCountryList';

export const renderSingleCountry = (data: any) =>
  data?.country ? <CountryItemCompact country={data.country} /> : null;

export const renderMultipleCountries = (data: any) =>
  data?.countries ? <CopilotCountryList countries={data.countries} /> : null;
