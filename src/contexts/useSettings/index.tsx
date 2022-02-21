import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DeviceStorage } from '~/utils/DeviceStorage';

type Props = {
  children: React.ReactNode;
};

type Unit = 'imperial' | 'metric';

type UnitSuffix = '°F' | '°C';

export type SettingsProviderContextType = {
  unit: Unit;
  unitSuffix: UnitSuffix;
  changeUnit(unit: Unit): void;
};

const UNIT_STORE_KEY = 'settings.unit';
const SettingsProviderContext = createContext(
  {} as SettingsProviderContextType,
);

function SettingsProvider({ children }: Props): JSX.Element {
  const [unit, setUnit] = useState<Unit>('imperial');
  const [unitSuffix, setUnitSuffix] = useState<UnitSuffix>('°F');

  const storeData = useCallback(async (data: Unit) => {
    await DeviceStorage.storeData(UNIT_STORE_KEY, data);
  }, []);

  const updateUnit = useCallback((newUnit: Unit) => {
    setUnit(newUnit);
    if (newUnit === 'imperial') {
      setUnitSuffix('°F');
    } else {
      setUnitSuffix('°C');
    }
  }, []);

  const changeUnit = useCallback<SettingsProviderContextType['changeUnit']>(
    (newUnit) => {
      storeData(newUnit);
      updateUnit(newUnit);
    },
    [storeData, updateUnit],
  );

  const value = useMemo<SettingsProviderContextType>(
    () => ({
      unit,
      unitSuffix,
      changeUnit,
    }),
    [changeUnit, unit, unitSuffix],
  );

  useEffect(() => {
    async function getSettings() {
      const unitStoredData = await DeviceStorage.getData<Unit>(UNIT_STORE_KEY);
      if (!unitStoredData) return;
      updateUnit(unitStoredData);
    }

    getSettings();
  }, [updateUnit]);

  return (
    <SettingsProviderContext.Provider value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

const useSettings = (): SettingsProviderContextType => {
  const context = useContext(SettingsProviderContext);
  if (!context) {
    throw new Error('useSettings must be used within an SettingsProvider.');
  }
  return context;
};

export { SettingsProvider, useSettings };
