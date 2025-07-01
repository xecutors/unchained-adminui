import React from 'react';

type ShopInfo = {
  version: string;
  defaultLanguageIsoCode: string;
  country: {
    isoCode: string;
    defaultCurrencyCode: string;
  };
  language: {
    isoCode: string;
  };
};

export default function ShopInfoCard({ shopInfo }: { shopInfo: ShopInfo }) {
  const items = [
    { label: 'Default Locale', value: shopInfo?.defaultLanguageIsoCode },
    { label: 'Language', value: shopInfo?.language?.isoCode },
    { label: 'Country', value: shopInfo?.country?.isoCode },
    { label: 'Currency', value: shopInfo?.country?.defaultCurrencyCode },
    { label: 'Version', value: shopInfo?.version },
  ];

  return (
    <div className="inline-block rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-4 space-y-2">
      <h3 className="text-base font-medium text-gray-900 mb-2">Shop Info</h3>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {items.map(({ label, value }) => (
          <li key={label} className="flex flex-col">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
