import TextsList from '../TextsList';

export const renderTexts = (data: any) =>
  data?.texts ? <TextsList texts={data.texts} /> : null;
