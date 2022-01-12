import React from 'react';
import classNames from 'classnames';

const cssIcons = ['loading'];

const Icon = ({ icon = '', className = '', ...rest }) => {
  const normalizedClassName = classNames(
    'icon',
    `icon--${icon.replace(' ', '-')}`,
    className,
  );

  if (cssIcons.includes(icon))
    return <span className={` ${normalizedClassName}`} />;

  try {
    const Component =
      require(`../../../public/static/img/icon-streamline/${icon}.svg?inline`).default;// eslint-disable-line
    return (
      <span className={` ${normalizedClassName}`}>
        <Component {...rest} />
      </span>
    );
  } catch (e) {
    console.warn(`Icon "${icon}" not found. Maybe add it to cssIcons?`, e); // eslint-disable-line
    return <span className={` ${normalizedClassName}`} />;
  }
};

export default Icon;
