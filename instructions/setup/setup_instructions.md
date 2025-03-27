# Setup Instructions

This document provides detailed instructions for the AI agent on how to set up a new project using the Universal AI Development System.

## Initial Project Setup

When a new project begins, follow these steps in sequence:

1. Read the project description from `core/init/project_description.md` to understand the requirements.

2. Create a Memory Bank file at `.cursor/memory_bank.json` using the template from `core/memory/memory_bank_template.json`.

3. Analyze the project requirements to determine the most appropriate project type (frontend, backend, fullstack, mobile, or data).

4. Based on the project type, select the corresponding workflow from the `workflows/[type]/standard_workflow.md`.

5. Create the appropriate directory structure for the project:
   ```
   project_root/
   ├── src/               # Source code
   ├── docs/              # Documentation
   ├── tests/             # Test files
   ├── config/            # Configuration files
   ├── scripts/           # Utility scripts
   └── .cursor/           # Cursor-specific files including Memory Bank
   ```

6. Initialize Git repository with the configuration from `configs/git/git_config_template.json`.

7. Set up MCP servers according to `configs/mcp/mcp_config_template.json`, ensuring that browser-tool and GitHub MCP are properly configured.

8. Create a detailed to-do list at `docs/to_do_list.md` based on the selected workflow and the template from `core/init/todo_list_template.md`.

## Environment Configuration

1. Determine the appropriate technology stack based on the project requirements and best practices.

2. Set up the development environment with necessary dependencies, frameworks, and tools.

3. Configure linting, formatting, and testing tools to ensure code quality.

4. Set up the appropriate database or data storage solution if required.

5. Configure authentication and authorization mechanisms if needed.

6. Set up logging and monitoring tools.

7. Configure deployment environments (development, staging, production).

## Yolo Mode Activation

1. Activate Yolo mode at the beginning of the project to enable maximum automation.

2. Use the following command to activate Yolo mode:
   ```
   /yolo on
   ```

3. Confirm that Yolo mode is active by checking for the Yolo indicator in the Cursor interface.

4. When in Yolo mode, make autonomous decisions based on best practices and project requirements.

5. Only request user input for critical decisions that significantly impact project direction.

## Memory Bank Usage

1. Always check the Memory Bank before taking any action to maintain context and consistency.

2. Update the Memory Bank after completing each significant task with:
   - New files created
   - Decisions made
   - Progress updates
   - References to important resources

3. Use the Memory Bank to track the current state of the project, including:
   - Current phase of development
   - Completed tasks
   - Pending tasks
   - Technical decisions
   - Architecture decisions

4. Ensure that the Memory Bank contains references to all created files and when to use them.

5. The Memory Bank should be the single source of truth for the project state.

## Browser Tool Integration

1. Ensure that the browser-tool MCP is running before starting development.

2. Use the browser tool to:
   - Test frontend components
   - Debug JavaScript code
   - Monitor network requests
   - Capture console logs
   - Take screenshots of UI components

3. When encountering frontend issues, always check the browser console logs through the browser tool.

4. Use the browser tool to verify that the application works correctly in a browser environment.

## GitHub Integration

1. Use the GitHub MCP for repository management.

2. Follow the Git workflow defined in `configs/git/git_config_template.json`.

3. Make regular commits at logical breakpoints with descriptive commit messages.

4. Use the appropriate branch naming conventions as defined in the Git configuration.

5. Create pull requests for major features or changes.

6. Ensure that all code is properly committed and pushed to the repository.

Remember to always follow the progressive information flow as described in `core/system_information_flow.md` to ensure that you have access to the right information at the right time.
