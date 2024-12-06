# Drag and Drop Scheduler (App.js)

## Overview
This React application is a dynamic drag-and-drop scheduler designed for managing warehouse operations and flight logistics. It allows users to organize tasks, employees, trucks, and flights across different sections (Brandabschnitte) with real-time visual feedback and deadline monitoring.

## Key Features

### 1. Authentication
- Simple password protection 
- Restricts access to unauthorized users

### 2. Drag and Drop Functionality
- Interactive drag-and-drop interface for:
  - Tasks
  - Employees
  - Trucks
  - Frachter (Cargo flights)
  - PAX (Passenger flights)
  - 3P (Third-party services)

### 3. Deadline Monitoring
- Visual deadline tracking for Frachter
- Color-coded warning system:
  - Blinking red indicators for approaching deadlines
  - Darker red for passed deadlines
- Customizable deadline times per airline

### 4. Employee Status Management
- Track employees who are:
  - Sick
  - On vacation
  - Coming later (with specific times)

### 5. Section Management
- Four main sections (Brandabschnitte 3-6)
- Dynamic subsection creation/removal
- Flexible layout adjustment

### 6. Data Persistence
- Local storage backup
- SharePoint integration for data storage
- Schedule history tracking
- Export functionality to CSV

## Configuration Objects

### Airlines and Deadlines
const frachterDeadlines = {
  'CA': '10:00',
  // Add more airlines and their deadlines here
};

const airlineLogos = {
  'CA': '/air-china-logo-.png',
  'SV': '/Saudi-Arabian-Airlines-Logo.png',
  // Add more airline logos here
};

### Time Slots
const timeSlots = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
const comingLaterTimes = ['09:00', '11:00', '14:00'];

## Visual Feedback System

### Deadline Warning States
1. **Pre-Warning (60-30 minutes before deadline)**
   - Slow blinking (1.5s interval)
   - Light red background

2. **Warning (30-15 minutes before deadline)**
   - Medium blinking (1.0s interval)
   - Red background

3. **Urgent (15-0 minutes before deadline)**
   - Fast blinking (0.5s interval)
   - Bright red background

4. **Passed Deadline**
   - Solid dark red background
   - Bold text
   - No blinking

## Usage Instructions

### Adding New Items
1. Use the input field at the top
2. Select item type from dropdown
3. Click "Hinzufügen" to add

### Managing Sections
- Use "+" to add new subsections
- Use "-" to remove subsections
- Minimum one subsection per Brandabschnitt

### Saving and Loading
- Click "Speichern" to save current state
- Previously saved states appear at bottom
- Click "Laden" to restore a saved state

### Exporting Data
- Use "Daten Exportieren" for CSV export
- Includes all current assignments and employee statuses

## Development Notes

### State Management
- Uses React useState for local state
- Implements useEffect for data persistence
- Maintains history for undo functionality

### Styling
- Gradient backgrounds for visual hierarchy
- Responsive design for different screen sizes
- CSS-in-JS implementation

### Error Handling
- Fallback to local storage when SharePoint fails
- Visual feedback for save/load operations
- Console logging for debugging

## Future Enhancements
1. Additional airline deadlines
2. More sophisticated authentication
3. Real-time collaboration features
4. Enhanced mobile responsiveness
5. Additional export formats

## Dependencies
- React
- SharePoint service integration
- Local storage API
