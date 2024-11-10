# HexaTask 🗂️

HexaTask is a modular and scalable task management system that implements **hexagonal architecture** (also known as "Ports and Adapters") on the backend. Using **Express.js**, it provides a robust REST API to create, update, delete, and view tasks, as well as assign tags, priorities, and due dates.

## Features 🚀

- **Task Management**: Create, edit, delete, and view tasks. 📝
- **Tags and Priorities**: Assign tags and priorities to tasks for better organization. 🏷️
- **Due Dates**: Set due dates for tasks. 📅
- **Hexagonal Architecture**: Clear separation of business logic from external interfaces, enabling greater flexibility and scalability. 🔄
- **React Frontend**: Interactive user interface built with React to visualize and manage tasks via the API. 🌐
- **Scalability and Modularity**: Allows easy integration with various databases and external services without affecting the business logic. 🔧

## Architecture 🏛️

Hexagonal architecture isolates the core of the application (business logic) from external technologies like databases, communication frameworks, or services. This makes the system easy to maintain, scale, and modify.

### Backend ⚙️

- **Express.js**: Web server that handles the API routes. 🌐
- **Hexagonal Architecture**: Business logic is separated from input (REST API) and output (databases, external services) interfaces. 🔐

### Frontend 💻

- **React**: JavaScript framework used to build a dynamic user interface that consumes the backend API and displays task management features. ⚡

## Contributions 🤝

Contributions are welcome! If you have any improvements, fixes, or suggestions, please open an _issue_ or submit a _pull request_. 💡
