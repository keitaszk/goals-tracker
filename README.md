# Goals Tracker

### A goal-tracking project written in JavaScript that helps users break big objectives into smaller steps and monitor their progress through an intuitive interface.

## UI Example
<img src="client/src/assets/ui-example.png" width="800px">

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
### Main Goals
- `GET /mainGoals` — fetch all main goals
- `POST /mainGoals` — create a main goal
- `PUT /mainGoals/:id` — update a main goal
- `DELETE /mainGoals/:id` — delete a main goal
### Subgoals
- `POST /mainGoals/:mainGoalId/subgoals` — create a subgoal
- `PUT /subgoals/:id` — update a subgoal
- `PATCH /subgoals/:id` — toggle a subgoal’s completion status
- `DELETE /subgoals/:id` — delete a subgoal

## Local Setup (Coming Soon)
Instructions for running the client and server locally will be added after deployment.

## Deployment Status
This project is currently under active development.
The app is not deployed yet, so setting it up locally requires installing Node.js, MongoDB, and configuring environment variables manually.

A public deployment is planned.
Once the deployment is ready, this README will be updated with step-by-step setup instructions and usage examples.

## Future Improvements
- Add user authentication
- Deploy with MongoDB Atlas
- Add a horizontal calendar view that displays all main goals

## License
This project is licensed under the MIT License.
