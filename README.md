Mini-Project-6
<a href="https://codeclimate.com/github/Sukhmandeep04/ProjectsMini/maintainability"><img src="https://api.codeclimate.com/v1/badges/88d8c12f03478b996b4d/maintainability" /></a>

📘 App.js

App Component with Fetching Data

Purpose:

Fetches user data from an API when the component mounts and the "Refresh" button clicks.
Manages loading state to display a loading message while data is being fetched.
Key Elements:

Utilizes the axios library for asynchronous data fetching.
Uses the useState and useEffect hooks to manage component state and lifecycle.
Displays a "Refresh" button and a list of users.
Functionality:

The fetchData function initiates an API request, updates the users state with the response data, and sets the loading state accordingly.
The component renders a "Refresh" button, a loading message while fetching data, and a list of users once the data is loaded.

📘 useApp.js

Purpose:

Displays a list of users using a custom hook (useApp) for managing state and functions related to user data.
Key Elements:

Imports a custom hook (useApp) from an external file to encapsulate the logic for fetching data and managing state.
Uses the users state and handleRefresh function provided by the custom hook.
Functionality:

The component renders a heading, a "Refresh" button, and a list of users.
The custom hook (useApp) abstracts away the logic for fetching data and managing the state, allowing for cleaner and more modular code.
A message indicating that no users are available is displayed if there are no users.
