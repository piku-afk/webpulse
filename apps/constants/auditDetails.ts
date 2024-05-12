import type { Database } from '@prisma/dbTypes.js';

type AuditDetails = Database['public']['Tables']['audit_details']['Row'];

export const auditDetails: AuditDetails[] = [
  {
    id: 1,
    key: 'first-contentful-paint',
    title: 'First Contentful Paint',
    description:
      'First Contentful Paint marks the time at which the first text or image is painted.',
    documentationLink:
      'https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint',
    unit: 'ms',
  },
  {
    id: 2,
    key: 'largest-contentful-paint',
    title: 'Largest Contentful Paint',
    description:
      'Largest Contentful Paint marks the time at which the largest text or image is painted.',
    documentationLink:
      'https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint',
    unit: 'ms',
  },
  {
    id: 3,
    key: 'first-meaningful-paint',
    title: 'First Meaningful Paint',
    description: 'First Meaningful Paint measures when the primary content of a page is visible.',
    documentationLink:
      'https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint',
    unit: 'ms',
  },
  {
    id: 4,
    key: 'total-blocking-time',
    title: 'Total Blocking Time',
    description:
      'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.',
    documentationLink:
      'https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time',
    unit: 'ms',
  },
  {
    id: 5,
    key: 'cumulative-layout-shift',
    title: 'Cumulative Layout Shift',
    description:
      'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
    documentationLink: 'https://web.dev/articles/cls',
    unit: null,
  },
  {
    id: 6,
    key: 'speed-index',
    title: 'Speed Index',
    description: 'Speed Index shows how quickly the contents of a page are visibly populated.',

    documentationLink: 'https://developer.chrome.com/docs/lighthouse/performance/speed-index',
    unit: null,
  },
];
