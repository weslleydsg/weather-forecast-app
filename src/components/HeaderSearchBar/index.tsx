import React, { forwardRef, memo, useLayoutEffect } from 'react';
import { TextInput, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

interface Props {
  value?: string;
  autoFocus?: boolean;
  onChangeText?(text: string): void;
  onFocus?(): void;
}

const HeaderSearchBar = forwardRef<TextInput, Props>(
  ({ value = '', autoFocus = false, onChangeText, onFocus }: Props, ref) => {
    const { spacings } = useTheme();

    useLayoutEffect(() => {
      if (!autoFocus || !ref) return;
      const { current } = ref as React.RefObject<TextInput>;
      current?.focus();
    }, [autoFocus, ref]);

    return (
      <View style={{ marginLeft: spacings.large, width: '80%' }}>
        <Searchbar
          ref={ref}
          style={{ height: 36, elevation: 2 }}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
      </View>
    );
  },
);

export default memo(HeaderSearchBar);
