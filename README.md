# Portfolio N

A premium personal portfolio website for NSENGIMANA Olivier, built with React, Vite, Tailwind CSS, and Framer Motion.

## Overview

This project showcases:

- Professional profile and hero section
- Projects and case-study style details
- Skills and system design highlights
- Awards and gallery
- Work experience and education
- Contact section and social links
- Theme and interaction-focused UI (animations and micro-interactions)

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion
- React Icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start local development server
- `npm run build`: Create production build in `dist/`
- `npm run preview`: Preview production build locally

## Project Structure

```text
portfolio_N/
	src/
		assets/        # Images and portfolio data
		components/    # Reusable UI components
		sections/      # Page sections (Hero, Skills, Projects, etc.)
		App.jsx        # Main page composition
	index.html
	vite.config.js
```

## Customization

- Update profile content, projects, skills, and labels in `src/assets/data.js`.
- Replace images in the project root or asset folders as needed.
- Adjust styles and visual tokens in your global style files.

## Build For Production

```bash
npm run build
```

The generated static files will be in `dist/` and can be deployed to platforms like Netlify, Vercel, or GitHub Pages.

## License

This project is for personal portfolio use.
