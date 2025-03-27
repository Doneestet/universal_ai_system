# Testing Instructions

This document provides detailed instructions for the AI agent on how to test a project using the Universal AI Development System.

## Testing Philosophy

Testing is a critical part of the development process that ensures the application works as expected and remains stable over time. Follow these principles:

1. Test early and test often throughout the development lifecycle.

2. Implement a comprehensive testing strategy that includes unit tests, integration tests, and end-to-end tests.

3. Aim for high test coverage, especially for critical business logic.

4. Use automated testing to catch regressions quickly.

5. Always check the Memory Bank before writing tests to understand the context and requirements.

## Unit Testing

For unit testing individual components and functions:

1. Test each function and component in isolation, mocking dependencies as needed.

2. Focus on testing behavior rather than implementation details.

3. Write tests for both success and failure scenarios.

4. Use descriptive test names that explain what is being tested and the expected outcome.

5. Structure tests using the Arrange-Act-Assert pattern:
   - Arrange: Set up the test data and conditions
   - Act: Perform the action being tested
   - Assert: Verify the results

6. For frontend components, test:
   - Rendering with different props
   - User interactions (clicks, inputs, etc.)
   - State changes
   - Error handling

7. For backend functions, test:
   - Input validation
   - Business logic
   - Error handling
   - Edge cases

## Integration Testing

For testing how components work together:

1. Test interactions between multiple components or services.

2. Focus on testing the contracts between components.

3. Use realistic test data that mimics production scenarios.

4. Test both success and failure paths, including error handling between components.

5. For frontend integration tests:
   - Test form submissions
   - Test data fetching and state updates
   - Test routing and navigation

6. For backend integration tests:
   - Test API endpoints
   - Test database interactions
   - Test service-to-service communication

## End-to-End Testing

For testing the entire application flow:

1. Test complete user journeys from start to finish.

2. Use a real browser environment for frontend testing.

3. Use a test database that mirrors the production schema.

4. Focus on critical user flows that represent core business value.

5. Test both happy paths and error scenarios.

6. Include tests for:
   - Authentication and authorization
   - Form submissions and validation
   - Navigation between pages
   - Data persistence
   - Error handling and recovery

## Performance Testing

To ensure the application performs well:

1. Test application load time and responsiveness.

2. Test database query performance with realistic data volumes.

3. Test API response times under various loads.

4. Identify and optimize bottlenecks in the application.

5. Use tools like Lighthouse for frontend performance testing.

6. Test memory usage and look for memory leaks.

## Security Testing

To ensure the application is secure:

1. Test for common vulnerabilities:
   - SQL injection
   - Cross-site scripting (XSS)
   - Cross-site request forgery (CSRF)
   - Authentication bypasses
   - Authorization flaws

2. Validate input and output sanitization.

3. Test access control and permissions.

4. Ensure sensitive data is properly encrypted.

5. Test API endpoints for proper authentication and authorization.

## Accessibility Testing

To ensure the application is accessible to all users:

1. Test keyboard navigation throughout the application.

2. Ensure proper use of ARIA attributes and semantic HTML.

3. Test color contrast for text and UI elements.

4. Ensure all interactive elements have accessible names and descriptions.

5. Test with screen readers to ensure content is properly announced.

6. Validate against WCAG 2.1 AA standards.

## Test Automation

To automate the testing process:

1. Set up continuous integration to run tests automatically on code changes.

2. Implement pre-commit hooks to run tests before allowing commits.

3. Generate test reports to track test coverage and results.

4. Set up alerts for test failures.

5. Regularly review and update tests as requirements change.

## Debugging and Fixing Issues

When tests fail:

1. Analyze the test failure to understand the root cause.

2. Reproduce the issue in a development environment.

3. Fix the issue and write a test that specifically addresses the failure case.

4. Verify that all tests pass after the fix.

5. Update the Memory Bank with details of the issue and solution.

6. Mark the related task as completed in the to-do list.

Remember to always follow the progressive information flow as described in `core/system_information_flow.md` and check the Memory Bank before taking any action.
