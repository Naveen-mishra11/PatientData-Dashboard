# Patient Management Dashboard

A modern, responsive patient management dashboard built with Next.js, TypeScript, and TailwindCSS. This application provides a comprehensive interface for managing patient information with advanced search, filtering, and sorting capabilities.

## Features

### Core Functionality
- **Local API Endpoint**: Built-in API using Next.js Route Handlers to serve patient data
- **Search & Filter**: Real-time search with debouncing and multiple filter options
- **Sort & Pagination**: Sort by multiple fields with configurable pagination
- **Responsive Design**: Fully responsive layout that works on all devices
- **Two View Modes**: Card view (primary) and Row view (bonus feature)

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Shadcn/UI**: Modern, accessible UI components
- **Performance Optimized**: Efficient data fetching and rendering
- **Error Handling**: Comprehensive error handling and user feedback
- **Accessibility**: Semantic HTML and ARIA labels for screen readers

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Shadcn/UI** (for UI components)
- **Lucide React** (for icons)
- **Radix UI** (for accessible components)

## Project Structure

```
src/
├── app/
│   ├── api/patients/route.ts     # Local API endpoint
│   ├── globals.css               # Global styles
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── PatientCard.tsx           # Card view component
│   ├── PatientRow.tsx            # Row view component
│   ├── SearchInput.tsx           # Search with debouncing
│   ├── FilterControls.tsx        # Filter controls
│   ├── SortControls.tsx          # Sort controls
│   ├── Pagination.tsx            # Pagination component
│   ├── ViewToggle.tsx            # View mode toggle
│   └── ui/                       # Shadcn/UI components
└── lib/
    └── types.ts                  # TypeScript type definitions
```

## Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the application

## API Documentation

### Local API Endpoint

The application includes a local API endpoint at `/api/patients` that serves patient data with the following features:

#### Query Parameters

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 6)
- `search` (string): Search term for patient name or medical issue
- `sortBy` (string): Field to sort by (`patient_name`, `age`, `medical_issue`)
- `sortOrder` (string): Sort order (`asc` or `desc`)
- `filterBy` (string): Filter field (`medical_issue`, `age_range`)
- `filterValue` (string): Filter value

#### Response Format

```json
{
  "patients": [
    {
      "patient_id": 1,
      "patient_name": "John Doe",
      "age": 35,
      "photo_url": "https://example.com/photo.jpg",
      "contact": [
        {
          "address": "123 Main St",
          "number": "555-1234",
          "email": "john@example.com"
        }
      ],
      "medical_issue": "Fever"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 6
}
```

## Usage

### Search
- Type in the search box to search across patient names and medical issues
- Search is debounced by 300ms for optimal performance

### Filters
- **Medical Issue**: Filter by specific medical conditions
- **Age Range**: Filter by age groups (Young: 0-29, Adult: 30-59, Senior: 60+)

### Sorting
- Sort by Patient Name, Age, or Medical Issue
- Toggle between ascending and descending order

### Pagination
- Navigate through pages using the pagination controls
- View statistics showing current page and total items

### View Modes
- **Card View**: Visual card-based layout (default)
- **Row View**: Table-based layout for detailed information

## Data

The application uses a sample dataset with 9 patient records. The data is stored in `data.json` at the project root and includes:

- Patient ID and name
- Age
- Photo URL (with fallback)
- Contact information (address, phone, email)
- Medical issue

## Performance Optimizations

- **Debounced Search**: 300ms debounce to prevent excessive API calls
- **Efficient State Management**: Minimal re-renders with proper state updates
- **Pagination**: Server-side pagination to handle large datasets
- **Conditional Rendering**: View-specific components only render when needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for consistent formatting
- Component-based architecture

### Testing
While not included in this assignment, the application is structured to support:
- Unit tests with Jest
- Component tests with React Testing Library
- End-to-end tests with Playwright

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with default settings

### Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out` (after running `npm run build`)

### Other Platforms
The application can be deployed on any platform that supports Node.js applications.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Contact

For questions or support, please contact the developer.

---

**Built with ❤️ using Next.js**