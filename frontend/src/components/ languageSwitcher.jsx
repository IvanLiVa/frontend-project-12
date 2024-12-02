import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        {i18n.language.toUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage('en')}>EN</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('ru')}>RU</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
