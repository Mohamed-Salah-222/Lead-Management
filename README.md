# Lead Management App

A full-stack application for managing sales leads, built with Next.js, Node.js, Express, and MongoDB.

## Features

- **Add New Leads**: Create leads with name, email, and status
- **View All Leads**: Display leads in a clean, organized list
- **Status Management**: Track leads through different stages (New, Engaged, Proposal Sent, Closed-Won, Closed-Lost)
- **Real-time Updates**: Automatic refresh and instant feedback
- **Input Validation**: Prevent duplicate emails and ensure required fields
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- RESTful API design
- CORS enabled for cross-origin requests

### Frontend

- **Next.js** (React framework)
- **Axios** for API communication
- Modern React hooks (useState, useEffect)
- Responsive CSS styling

## API Endpoints

- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Retrieve all leads (sorted by newest first)

## Lead Schema

Each lead contains:

- **name** (string, required) - Lead's full name
- **email** (string, required, unique) - Lead's email address
- **status** (enum) - Current lead status:
  - New (default)
  - Engaged
  - Proposal Sent
  - Closed-Won
  - Closed-Lost
- **createdAt** (timestamp) - Automatically generated

## How to Run Locally

### Prerequisites

- Node.js (v14 or higher)
- MongoDB connection (local or cloud)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone [your-repo-url]
cd lead-management-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
touch .env
```

Add the following to your `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

```bash
# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

Open your browser and go to `http://localhost:3000`

## Environment Variables

### Backend (.env)

- `MONGODB_URI` - Your MongoDB connection string (required)
- `PORT` - Server port (optional, defaults to 5000)

### Frontend (.env.local)

- `NEXT_PUBLIC_API_URL` - Backend API URL (optional, defaults to http://localhost:5000/api)

## Project Structure

```
lead-management-app/
├── backend/
│   ├── server.js          # Main server file with API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── pages/
│   │   └── index.js      # Main application page
│   ├── styles/
│   │   └── globals.css   # Application styling
│   ├── package.json      # Frontend dependencies
│   └── .env.local        # Frontend environment variables
└── README.md             # This file
```

## Usage

1. **Adding a Lead**: Fill out the form with name and email (status is optional, defaults to "New")
2. **Viewing Leads**: All leads display automatically with their current status
3. **Refreshing Data**: Click the "Refresh" button to reload leads from the database
4. **Status Colors**: Each status has a different background color for easy identification

## Error Handling

- **Duplicate Emails**: Prevents adding leads with existing email addresses
- **Required Fields**: Form validation ensures name and email are provided
- **API Errors**: User-friendly error messages for server issues
- **Loading States**: Visual feedback during form submission and data loading

## Development Notes

- Backend uses Mongoose for MongoDB operations with proper schema validation
- Frontend implements optimistic UI updates for better user experience
- CORS is configured to allow requests from the frontend
- All inputs are sanitized (trimmed, lowercase emails)
- Responsive design works on various screen sizes

## Future Enhancements

- Edit/Delete lead functionality
- Advanced filtering and search
- Lead activity tracking
- Export leads to CSV
- User authentication
- Pagination for large datasets

---

**Developed by Mohamed** - Full Stack Developer Assessment
