import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, View } from 'react-native';
import {
  ActivityIndicator,
  Card,
  Headline,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import environment from '~/config/environment';
import { useSettings } from '~/contexts/useSettings';
import { GetWeekForecast } from '~/services/api/weather';
import { Coord, ForecastDay } from '~/types';
import { formatWeekday } from '~/utils/FormatDate';
import styles from './styles';

interface Props {
  coord: Coord;
}

function WeatherForecastByCoord({ coord }: Props) {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const { unitSuffix } = useSettings();
  const { isFetching, data } = GetWeekForecast(coord);
  const current = data?.data?.current;
  const [todayForecast, ...weekForecast] = data?.data?.daily ?? [];

  const getIconImage = (icon: string) => (
    <Image
      source={{
        uri: `${environment.weatherImgUrl}/${icon}.png`,
      }}
      style={{
        width: theme.iconSizes.weather,
        height: theme.iconSizes.weather,
      }}
    />
  );

  const weekWeekday = useMemo(() => {
    const weekdays: string[] = [];
    const date = new Date();
    weekdays.push(formatWeekday(i18n.language, date));
    for (let index = 0; index < 7; index += 1) {
      date.setDate(date.getDate() + 1);
      weekdays.push(formatWeekday(i18n.language, date));
    }
    return weekdays;
  }, [i18n.language]);

  const ListHeaderComponent = current && (
    <View style={{ marginTop: theme.spacings.large }}>
      <View style={styles.header}>
        <View>
          <View style={styles.row}>
            {getIconImage(current.weather[0].icon)}
            <Headline>{`${Math.round(current.temp)} ${unitSuffix}`}</Headline>
          </View>
          <View style={styles.row}>
            <Subheading>{`${Math.round(
              todayForecast.temp.max,
            )} ${unitSuffix}`}</Subheading>
            <Subheading> - </Subheading>
            <Subheading>{`${Math.round(
              todayForecast.temp.min,
            )} ${unitSuffix}`}</Subheading>
          </View>
        </View>
        <View>
          <Headline>{weekWeekday[0]}</Headline>
          <Subheading>{current.weather[0].description}</Subheading>
        </View>
      </View>
    </View>
  );

  const keyExtractor = (_: ForecastDay, index: number) => `${index}`;

  const renderItem = ({
    item,
    index,
  }: {
    item: ForecastDay;
    index: number;
  }) => {
    return (
      <Card style={{ marginTop: theme.spacings.large }}>
        <Card.Content style={styles.cardContent}>
          <View>
            <Title>{weekWeekday[index + 1]}</Title>
            <View style={styles.iconText}>
              {getIconImage(item.weather[0].icon)}
              <Paragraph>{item.weather[0].description}</Paragraph>
            </View>
          </View>
          <View style={styles.cardTempView}>
            <Subheading>{`${Math.round(
              item.temp.max,
            )} ${unitSuffix}`}</Subheading>
            <Subheading> - </Subheading>
            <Subheading>{`${Math.round(
              item.temp.min,
            )} ${unitSuffix}`}</Subheading>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (isFetching) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <FlatList
      data={weekForecast}
      contentContainerStyle={{
        paddingHorizontal: theme.spacings.large,
        paddingBottom: theme.spacings.large,
      }}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

export default memo(WeatherForecastByCoord);
