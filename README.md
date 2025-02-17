# Next.js Marketing Website

This project is a marketing website built with [Next.js](https://nextjs.org), designed for high performance, scalability, and seamless user experience. It leverages modern web technologies to ensure a smooth and optimized experience.

## Getting Started

To set up and run the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (Version: `v22.13.1`)
- **Firebase Database** (for data storage and management)
- **React.js / Next.js** (for front-end development)
- **Tailwind CSS** (for styling and design)

### Installation

Clone the repository and navigate to the project folder:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the development server with the following command:

```bash
npm run dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can modify the main page by editing `app/page.js`. Changes will reflect automatically upon saving.

## Deployment

The project is designed to be deployed on [Vercel](https://vercel.com), the official deployment platform for Next.js.

To deploy the application:

1. Ensure your Vercel account is set up.
2. Push your code to a GitHub repository.
3. Connect your repository to Vercel.
4. Deploy the project via the Vercel dashboard.

For more details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

To explore Next.js further, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – Comprehensive guide on Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – Interactive tutorials to get started with Next.js.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) – Contribute or explore Next.js development.

## Project Requirements

- **Technology Stack:**

  - Next.js (React.js framework)
  - Tailwind CSS (for styling)
  - Firebase Database (for backend and data storage)
  - Node.js (Version: `v22.13.1`)

- **Deployment:**
  - The project **must** be deployed on Vercel for production use.

## GitHub Workflow

The project follows a structured Git workflow with two primary branches:

- **main** – This is the production branch. Only the project lead has permission to push changes directly to this branch.
- **dev** – This is the development branch where new features and fixes are integrated before moving to the main branch.

### Contribution Workflow

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
2. **Create a new feature branch from `dev` (for junior developers):**
   ```bash
   git checkout -b feature-branch-name dev
   ```
3. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push changes to the remote repository:**
   ```bash
   git push origin feature-branch-name
   ```
5. **Create a pull request (PR) to merge changes into `dev`.**
6. **Once approved, the project lead will review and merge `dev` into `main`.**

---

### License

This project is licensed under the MIT License. Feel free to contribute and improve upon it.
# inspiregroup
