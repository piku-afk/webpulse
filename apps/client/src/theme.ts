import { createTheme, type MantineColorsTuple } from '@mantine/core';

const dracula: MantineColorsTuple = [
  '#f6ecff',
  '#e7d6fb',
  '#caabf1',
  '#ac7ce8',
  '#9354e0',
  '#833cdb',
  '#7b2eda',
  '#6921c2',
  '#5d1cae',
  '#501599',
];

export const theme = createTheme({
  colors: {
    dracula,
  },
  headings: {
    fontFamily: "'Inter Variable', sans-serif",
  },
  black: '#101828',
  defaultRadius: 8,
  cursorType: 'pointer',
  components: {
    Button: {
      defaultProps: {
        color: 'dracula',
      },
    },
    TextInput: {
      styles: {
        label: {
          marginBottom: 6,
          fontSize: 14,
        },
      },
    },
    PasswordInput: {
      styles: {
        label: {
          marginBottom: 6,
          fontSize: 14,
        },
      },
    },
  },
});
