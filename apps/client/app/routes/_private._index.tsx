import { Container, Title } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Webpulse' },
    {
      name: 'description',
      content:
        'WebPulse is a performance monitoring system designed to track and visualize website performance metrics over time.',
    },
  ];
};

const Home = () => {
  return (
    <Container>
      <Title order={1}>Remix + Mantine + Vite</Title>
    </Container>
  );
};

export default Home;
