# Goals Tracker

### A goal-tracking project written in JavaScript that helps users break big objectives into smaller steps and monitor their progress through an intuitive interface.

## Live Demo

[https://goals-tracker-one.vercel.app/](https://goals-tracker-one.vercel.app/)

## UI Example
<img src="assets/ui-example.png" width="800px">

## Features
- Create main goals with due dates and custom icon
- Add sub-goals under each main goal to break work into smaller steps
- Track progress automatically based on completed sub-goals
- Sidebar navigation for switching between major goals

## Tech Stack
- **Frontend:** React, Material UI
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Other:** REST API structure, JSON handling

## Project Structure
```text
    client/
      src/
        assets/
        components/
        App.jsx
        main.jsx

    server/
      routes/
      models/
      server.js
```

## API Endpoints
### Auth
- `POST /auth/signup` - create an account
- `POST /auth/login` - login and receive a token
### Main Goals
- `GET /mainGoals` — fetch all main goals
- `POST /mainGoals` — create a main goal
- `PUT /mainGoals/:id` — update a main goal
- `DELETE /mainGoals/:id` — delete a main goal
### Subgoals
- `POST /mainGoals/:mainGoalId/subgoals` — create a subgoal
- `PUT /mainGoals/:mainGoalId/subgoals/:id` — update a subgoal
- `PATCH /mainGoals/:mainGoalId/subgoals/:id` — toggle a subgoal’s completion status
- `DELETE /mainGoals/:mainGoalId/subgoals/:id` — delete a subgoal

## Local Setup
### 1. Clone the repository
```bash
git clone https://github.com/keitaszk/goals-tracker.git
cd goals-tracker
```
### 2. Install dependencies
**Backend**
```bash
cd server
npm install
```
**Frontend**
```bash
cd ../client
npm install
```
### 3. Set environment variables
Create a `.env` file inside the **server** directory:
```env
JWT_SECRET=any_string_here
MONGODB_URI=your_mongodb_connection_string
```
Example (MongoDB Atlas):
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/goals-tracker
```
If you have MongoDB installed locally:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/goals-tracker
```
Don't forget to start MongoDB locally before running the server.
### 4. Start the backend server
```bash
cd server
npm run dev
```
The backend will run on: `http://localhost:3000`
### 5. Start the frontend app
```bash
cd client
npm run dev
```
The frontend will run on: `http://localhost:5173`
### 6. Configure the frontend API URL
Inside `client/src/config.js`:
```js
export const BASE_URL = "http://localhost:3000";
```
### 7. Open the application
Open your browser and visit:
```
http://localhost:5173
```
You should now be able to sign up, log in, and use the app fully in your local environment!

## Deployment Status
The application is deployed and publicly accessible.
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

You can access the live version here:
[https://goals-tracker-one.vercel.app/](https://goals-tracker-one.vercel.app/)

## Future Improvements
- Add a horizontal calendar view that displays all main goals

## License
This project is licensed under the MIT License.
