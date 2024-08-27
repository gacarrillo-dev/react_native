import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'defaultSemiBold';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      style={[
        { backgroundColor, color },
        type === 'default' ? styles.default : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        style,
      ]}
      placeholderTextColor={useThemeColor({ light: lightColor, dark: darkColor }, 'text')}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  defaultSemiBold: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontWeight: '600',
  },
});
