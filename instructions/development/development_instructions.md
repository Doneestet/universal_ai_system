# Development Instructions

This document provides detailed instructions for the AI agent on how to develop a project using the Universal AI Development System.

## Code Development Process

When developing code for the project, follow these steps:

1. Always check the Memory Bank before starting any development task to understand the current context and dependencies.

2. Follow the workflow defined for the project type to ensure logical progression of development.

3. For each task in the to-do list:
   - Review the requirements and acceptance criteria
   - Plan the implementation approach
   - Write the code following best practices
   - Test the code to ensure it works as expected
   - Update the Memory Bank with details of the implementation
   - Mark the task as completed in the to-do list

4. Use a test-driven development approach where appropriate:
   - Write tests before implementing features
   - Ensure all tests pass before considering a feature complete
   - Update tests when requirements change

5. Follow the coding standards and best practices for the selected technology stack.

6. Document code as you write it with clear comments and function/method descriptions.

## Frontend Development

When developing frontend components:

1. Create reusable components that follow the single responsibility principle.

2. Implement responsive design to ensure the application works on different screen sizes.

3. Follow accessibility best practices (WCAG guidelines) to ensure the application is usable by everyone.

4. Optimize performance by:
   - Minimizing bundle size
   - Implementing code splitting
   - Using lazy loading for components and routes
   - Optimizing images and assets

5. Implement proper error handling and loading states for all asynchronous operations.

6. Use the browser tool to test and debug frontend components.

## Backend Development

When developing backend services:

1. Implement a clean architecture with clear separation of concerns:
   - Controllers for handling HTTP requests
   - Services for business logic
   - Repositories for data access
   - Models for data representation

2. Use dependency injection to make code more testable and maintainable.

3. Implement proper error handling and validation for all API endpoints.

4. Follow RESTful API design principles or GraphQL best practices as appropriate.

5. Optimize database queries and implement caching where appropriate.

6. Implement proper logging for debugging and monitoring.

7. Ensure all sensitive data is properly secured.

## State Management

For applications requiring state management:

1. Choose the appropriate state management solution based on the project requirements:
   - Context API for simple state management
   - Redux/MobX for complex state management
   - React Query/SWR for server state management

2. Implement a clear state structure with well-defined actions and reducers.

3. Minimize state changes to improve performance.

4. Use selectors to access state to prevent unnecessary re-renders.

5. Implement proper error handling for all state changes.

## API Integration

When integrating with APIs:

1. Create a service layer to abstract API calls from components.

2. Implement proper error handling for all API calls.

3. Use appropriate caching strategies to minimize API calls.

4. Handle authentication and authorization properly.

5. Implement retry logic for failed API calls where appropriate.

6. Document all API endpoints used by the application.

## Database Operations

When working with databases:

1. Design an efficient database schema that minimizes redundancy.

2. Use migrations to manage database schema changes.

3. Implement proper indexing to optimize query performance.

4. Use transactions for operations that require atomicity.

5. Implement proper error handling for all database operations.

6. Ensure sensitive data is properly secured.

## Code Quality and Maintenance

To ensure code quality and maintainability:

1. Follow the DRY (Don't Repeat Yourself) principle to minimize code duplication.

2. Use meaningful variable and function names that clearly indicate their purpose.

3. Keep functions and methods small and focused on a single responsibility.

4. Use comments to explain why code works a certain way, not what it does.

5. Regularly refactor code to improve readability and maintainability.

6. Use linting and formatting tools to maintain consistent code style.

Remember to always follow the progressive information flow as described in `core/system_information_flow.md` and check the Memory Bank before taking any action.
