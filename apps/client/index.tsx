import '@mantine/core/styles.css';

import { createRoot } from 'react-dom/client';

import { createApp } from './app.js';

createRoot(document.getElementById('root')!).render(createApp());
