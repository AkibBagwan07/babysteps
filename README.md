### BabySteps: Milestone Tracker & Community Tips

BabySteps is a modern parenting companion that supports users through preconception and pregnancy. This feature module lets users log personal pregnancy milestones and engage with a supportive community by sharing and receiving helpful tips.

### Live Links

- Frontend (Vercel): https://babysteps-nine.vercel.app

- Backend (Render): https://babysteps-rjfl.onrender.com

- Source Code: https://github.com/AkibBagwan07/babysteps.git

### Features
 Track personal milestones (e.g., "First ultrasound", "Started prenatal vitamins")

 View a personalized timeline of milestones with notes

 View and contribute community tips for each milestone

 Like helpful tips (1 like per user via localStorage)

 Authentication via JWT (mocked user-based access)

 Personalized content based on pregnancy start date

### Tech Stack

FRONTEND - React + Vite
BACKEND - Node.js + Express
Database - MongoDB
Auth - JWT (localStorage)
Styling - Tailwind CSS

###  Installation & Running Locally

git clone https://github.com/AkibBagwan07/babysteps.git
cd babysteps

### Backend Setup
cd server
npm install

Create a .env file in /server
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

npm run dev

### Frontend Setup
cd ../client
npm install
npm run dev

### Authentication

JWT-based authentication
Token stored in localStorage
Protected routes using a custom PrivateRoute component

### API Endpoints

POST /api/auth/register – Register a user

POST /api/auth/login – Login and receive token

GET /api/milestones – List user milestones

POST /api/milestones – Create a milestone

GET /api/tips/:milestoneId – Get tips for a milestone

POST /api/tips/:milestoneId – Add a new tip

PUT /api/tips/:tipId/like – Like a tip

### Future planning/improvements

- Real-time tip updates (via Socket.IO)
- Multi-user milestone sharing (e.g., with a partner)
- Tip upvotes/downvotes
- Email-based authentication

### This project is developed as part of a fullstack assessment.



