import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return <h1>{t('not_found')}</h1>;
};

export default NotFound;
