import { useRouter } from 'next/router';

const LocaleSwitcher = () => {
  const { pathname, asPath, query, push, locale, locales } = useRouter();

  const handleOnChange = (e) => {
    e.stopPropagation();
    push({ pathname, query }, asPath, {
      locale: e.target.value,
    });
  };

  if (locales?.length < 2) return null;

  return (
    <div className="mr-auto">
      <select
        className="cursor-pointer rounded-md border-slate-300 py-1 pr-8 text-sm lg:py-1 lg:pr-10 text-black dark:text-white  dark:bg-slate-400"
        value={locale}
        onChange={handleOnChange}
      >
        {locales?.map((language) => (
          <option key={language} value={language}>
            {new Intl.DisplayNames([locale], {
              type: 'language',
            }).of(language)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
