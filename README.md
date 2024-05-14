# WebPulse

WebPulse is a performance monitoring system designed to track and visualize website performance metrics over time. It leverages Lighthouse for performance audits and stores the collected data securely in a PostgreSQL database. Additionally, WebPulse provides a suite of applications for managing the auditing process and presenting performance insights.

## Components

- **Client** - The client application offers a user-friendly interface for visualizing website performance metrics. It utilizes charts and graphs to present the data in an easily understandable format.
- **Server** - The server application is responsible for processing performance audits collected by Lighthouse, securely storing the data in the PostgreSQL database, and facilitating communication between the client and database.
- **Runner** - The runner application automates the process of conducting performance audits on websites using Lighthouse. It periodically checks the specified websites and collects performance data for analysis.

## Additional Notes

- WebPulse is actively maintained and welcomes contributions from the community.
- For detailed information about configuration options and available functionalities, please refer to the codebase.
