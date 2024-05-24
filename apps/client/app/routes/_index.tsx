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
    <div>
      <h1>Remix + Fastify</h1>
    </div>
  );
};

export default Home;
