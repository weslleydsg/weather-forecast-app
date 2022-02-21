export type FavoritesCities = string[];

export type SettingsLang = string;

export type SettingsUnit = string;

export type DeviceStorageKeys = 'favorites' | 'settings.lang' | 'settings.unit';

export type DeviceStorageData = FavoritesCities | SettingsLang | SettingsUnit;
