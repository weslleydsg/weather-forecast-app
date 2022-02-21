import React from 'react';
import { useTranslation } from 'react-i18next';
import { Headline, Menu, withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { languages } from '~/../translations';
import { useSettings } from '~/contexts/useSettings';
import styles from './styles';

const SettingsScreen = withTheme(({ theme }) => {
  const { t, i18n } = useTranslation();
  const { unit, changeUnit } = useSettings();
  const currentLanguage = i18n.language;

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  return (
    <SafeAreaView
      style={[styles.screen, { margin: theme.spacings.large }]}
      edges={['top', 'left', 'right']}
    >
      <Headline>{t('common.languageSelector')}</Headline>
      <Menu.Item
        title={t('common.english')}
        onPress={() => changeLanguage(languages.en)}
        disabled={currentLanguage === languages.en}
      />
      <Menu.Item
        title={t('common.portuguese')}
        onPress={() => changeLanguage(languages.pt)}
        disabled={currentLanguage === languages.pt}
      />
      <Headline style={{ marginTop: theme.spacings.large }}>
        {t('common.unitsSelector')}
      </Headline>
      <Menu.Item
        title={t('common.Fahrenheit')}
        onPress={() => changeUnit('imperial')}
        disabled={unit === 'imperial'}
      />
      <Menu.Item
        title={t('common.Celsius')}
        onPress={() => changeUnit('metric')}
        disabled={unit === 'metric'}
      />
    </SafeAreaView>
  );
});

export default SettingsScreen;
