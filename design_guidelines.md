# Budget Analyzer Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Mint and YNAB financial dashboard aesthetics, focusing on clean, trustworthy financial interfaces with clear data visualization and intuitive categorization systems.

## Color Palette
**Light Mode:**
- Primary: 145 63% 49% (financial green #2ECC71)
- Secondary: 204 70% 53% (trust blue #3498DB) 
- Warning: 4 90% 58% (overspend red #E74C3C)
- Background: 210 17% 98% (light grey #F8F9FA)
- Text: 210 29% 24% (dark slate #2C3E50)
- Accent: 283 39% 53% (insight purple #9B59B6)

**Dark Mode:**
- Primary: 145 63% 55%
- Secondary: 204 70% 60%
- Warning: 4 90% 65%
- Background: 210 29% 12%
- Text: 210 17% 85%
- Accent: 283 39% 65%

## Typography
- **Primary Font**: Inter via Google Fonts CDN
- **Fallback**: Roboto
- **Hierarchy**: 
  - Headers: font-bold (600-700 weight)
  - Body: font-medium (400-500 weight)
  - Captions: font-light (300 weight)

## Layout System
**Spacing Units**: Use Tailwind spacing primitives of 4, 6, 8, and 12 (p-4, m-6, gap-8, etc.)
- Cards: p-6 with rounded-lg borders
- Section spacing: mb-8 between major components
- Grid gaps: gap-6 for responsive layouts

## Component Library

### Navigation
- Horizontal tab navigation with 4 main sections
- Active state with primary color underline
- Clean, minimal styling with hover states

### Cards
- Elevated cards with subtle shadows (shadow-sm)
- Rounded corners (rounded-lg)
- Light borders in light mode, darker in dark mode
- Consistent p-6 padding

### Data Visualization
- Chart.js integration with custom color scheme
- Pie charts for category breakdowns
- Bar charts for spending trends
- Progress bars for budget tracking with color-coded states

### Forms
- Clean input fields with focus states
- File upload dropzones with drag-and-drop styling
- Button hierarchy: primary (filled), secondary (outline)

### Budget Indicators
- Progress rings/bars showing budget usage
- Color-coded alerts (green: under budget, yellow: approaching limit, red: over budget)
- Prominent percentage displays

## Key Design Principles
1. **Financial Trust**: Clean, professional aesthetic that builds confidence
2. **Data Clarity**: Charts and numbers are the hero elements
3. **Quick Insights**: Important financial data visible at a glance
4. **Responsive Design**: Mobile-friendly for on-the-go budget checking
5. **Accessibility**: High contrast ratios and clear hierarchy

## Page-Specific Guidelines

### Home (Budget Overview)
- Dashboard-style layout with key metrics in cards
- Budget progress indicators prominently displayed
- Recent transaction summaries

### Upload
- Clean file dropzone with clear CTAs
- Text input area for SMS/email content
- Processing states and success feedback

### Analysis
- Category breakdown with visual emphasis
- Sortable transaction lists
- Filter controls for date ranges

### Reports
- Chart-focused layout with export capabilities
- Time period selectors
- Comparative analysis views

## No Images Required
This application focuses on data visualization through charts and clean interface elements rather than photographic content. The visual impact comes from well-designed charts, progress indicators, and clean typography.