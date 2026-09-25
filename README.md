# Harvest CV Studio

AI-assisted CV drafting from an existing text-based PDF, three questionnaire answers and interview notes. A person must review and correct every draft before exporting a Harvest-styled PDF.

## Run locally

1. Install Node.js 20+ and run `npm install`.
2. Set `OPENROUTER_API_KEY` as a server environment variable, or copy `.env.example` to `.env` and replace the example value. Optionally configure `OPENROUTER_MODEL` with a model that supports JSON output.
3. Run `npm start` and open http://localhost:4200. This runs Angular (4200) and the API (3000) together; Angular proxies `/api` to the server.
4. Upload a text-based PDF (5 MB max), answer the three questions, add interview notes, click **Generate Harvest CV**, check/edit the draft, then click **Download reviewed PDF**.

`npm run build` builds only the Angular frontend. Production deployment also requires running `npm run server` behind a reverse proxy forwarding `/api` to the server. **Do not expose the API publicly without authentication, authorization, rate limiting, and a data-retention/privacy review.** An exposed generation endpoint can exhaust OpenRouter credits. The API binds to localhost for development.

## Privacy and accuracy

The PDF is parsed on the server; only extracted text (up to 30,000 characters), questionnaire answers and notes are sent to OpenRouter/model providers on generation. PDF files, answers and drafts are held in memory and are not saved in this app. Do not upload personal data without permission and an approved processing agreement. The API key stays server-side; `.env` is git-ignored. Scanned PDFs require OCR and are currently rejected. OpenRouter output is not fact-checked automatically: confirm all claims and remove sensitive information before sharing. The illustrative preview is not the actual rendered PDF.

## Project Structure

```
CVCreator/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Main component logic
│   │   ├── app.component.html     # Component template
│   │   ├── app.component.css      # Component styles
│   │   └── app.module.ts          # App module configuration
│   ├── index.html                 # Main HTML entry point
│   ├── main.ts                    # Application bootstrap
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # App-specific TypeScript config
├── package.json                   # Dependencies and scripts
└── README.md                       # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher) and npm installed on your machine
- Angular CLI (optional but recommended)

### Installation

1. Navigate to the project directory:
   ```bash
   cd CVCreator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Install Angular CLI globally:
   ```bash
   npm install -g @angular/cli
   ```

### Running the Development Server

Start the development server:
```bash
npm start
```

or

```bash
ng serve
```

The application will be available at: `http://localhost:4200`

The application will automatically reload if you change any source files.

### Building for Production

Build the project for production:
```bash
npm run build
```

or

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Features

- Modern Angular application with TypeScript
- Clean and professional UI
- Responsive design (works on mobile and desktop)
- Component-based architecture
- Two main buttons for creating or uploading CVs
- Professional gradient design
- Ready for feature implementation

## Future Enhancements

- CV creation form component
- File upload functionality
- CV editing interface
- PDF export
- Multiple CV templates
- User authentication
- Routing between pages
- Service layer for data management

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests
- `ng serve` - Alternative command to start dev server

## Notes

- The buttons currently show alerts when clicked
- Component styling is scoped to the component (CSS encapsulation)
- Global styles are in `src/styles.css`
- The development server runs on port 4200 by default

## License

MIT
