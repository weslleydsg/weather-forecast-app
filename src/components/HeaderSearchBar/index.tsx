import React, { forwardRef, memo, useLayoutEffect } from 'react';
import { TextInput, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from './styles';

interface Props {
  value?: string;
  autoFocus?: boolean;
  onChangeText?(text: string): void;
  onFocus?(): void;
}

const HeaderSearchBar = forwardRef<TextInput, Props>(
  ({ value = '', autoFocus = false, onChangeText, onFocus }: Props, ref) => {
    useLayoutEffect(() => {
      if (!autoFocus || !ref) return;
      const { current } = ref as React.RefObject<TextInput>;
      current?.focus();
    }, [autoFocus, ref]);

    return (
      <View style={styles.container}>
        <Searchbar
          ref={ref}
          style={styles.searchBar}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
      </View>
    );
  },
);

export default memo(HeaderSearchBar);
