<div align="center">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/635d6d2c-e68d-4d45-944a-3e1a3d1cea70">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/59b21970-a4b3-482d-bc52-a83338d7df57">
    <img alt="Agile Xperts Logo"
         src="https://github.com/user-attachments/assets/59b21970-a4b3-482d-bc52-a83338d7df57"
         width="25%">
</picture>

[Website](https://agilexperts.me) | [Why Agile Xperts](#features) | [Getting Started](#installation) | [Contributing](#contributing)

</div>

This is the main source code repository for **Agile Xperts**. It is a collaborative platform designed for developers to connect, manage, and contribute to projects aligned with their skillsets.

## Features

- **Project Management**: Create, join, and manage projects with ease.
- **Responsive UI**: Built with Next.js and React for a smooth user experience across devices.
- **GitHub Integration**: Automatically sync project repositories to keep everything up-to-date.
- **Supabase Backend**: Secure, real-time data handling and user authentication for peace of mind.
- **Real-time Collaboration**: Integrated chat and team interaction tools for seamless communication.
- **Points System**: Earn and track contributions for community recognition, and `build a developer portfolio`.


## Installation

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v16+)
- Supabase account (for database setup)
- GitHub account (for repository integration)

### Cloning the Repository
```bash
git clone https://github.com/a7medalyapany/agile-xperts.git
cd agile-xperts
```

### Environment Variables

Set up the following environment variables in a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Important Note on GitHub Authentication

Enable GitHub authentication as a provider. Follow the instructions in the Supabase documentation [here](https://supabase.com/docs/guides/auth/social-login/auth-github).

## Database Setup

1. Install Supabase CLI or use Supabase Studio for database management.
2. Run all SQL migrations located under `/supabase/migrations/`:
   ```bash
   psql -U your_username -d your_database -f supabase/migrations/*.sql
   ```
   **Alternatively**, you can run these SQL files manually in the Supabase SQL editor in your dashboard.

3. Seed the database by running:
   ```bash
   psql -U your_username -d your_database -f supabase/seed.sql
   ```

## Running the App

After setting up the environment variables and database, start the development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the app.


## Contributing

We welcome contributions! Follow these steps to contribute to the project:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your fork and submit a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Contribution Guidelines:
- Ensure your code follows best practices and is well-documented.
- Write tests for any new functionality to ensure reliability.

## License

Agile Xperts is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Contact
- Join our community on Discord: [Discord Link](https://discord.gg/fazpBP9WPd).
- For questions or support, feel free to reach out to the project maintainer at [ahmedalyapany1@gmail.com](mailto:ahmedalyapany@gmail.com)
