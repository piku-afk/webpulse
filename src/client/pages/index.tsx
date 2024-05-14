import { Container, Title } from '@mantine/core';

export const getMeta = () => ({
  title: 'WebPulse Home',
});

export default () => {
  return (
    <Container>
      <Title>Fastify + Vite + Mantine + SSR</Title>
    </Container>
  );
};
