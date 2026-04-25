# An's Portfolio — Personal Project Showcase

A neo-brutalist portfolio website showcasing projects and case studies.

## Run Locally

```bash
npm install
npm run dev
```

## Adding Projects

Each project has a folder in `public/projects/<slug>/`.  
To add PDF case study files:

1. Drop your PDF(s) into the relevant folder
2. Create a `manifest.json` listing them:

```json
{
  "files": ["part-1.pdf", "part-2.pdf"]
}
```

The portfolio will automatically pick up the files and display them in a PDF viewer modal.

## Project Structure

```
├── public/
│   └── projects/           # Project files (PDFs, images)
│       ├── zalopay-case-study/
│       ├── retrolab/
│       ├── ecommerce-auction/
│       └── rbac-system-design/
├── src/
│   ├── components/         # React components
│   ├── App.tsx             # Root component
│   ├── index.css           # Tailwind + design tokens
│   └── main.tsx            # Entry point
├── index.html
└── vite.config.ts
```

## Tech Stack

- React 19 + TypeScript
- Vite 6
- TailwindCSS 4
- Framer Motion
- Lucide Icons
