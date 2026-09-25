# CVCreator

A professional CV creation tool built with Angular, TypeScript, HTML, and CSS.

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


