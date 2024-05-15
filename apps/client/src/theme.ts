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
});
