# Project Initialization Sequence

This document defines the exact sequence of steps that the AI agent should follow when initializing a new project using the Universal AI Development System.

## Initialization Command

The initialization sequence begins when the user executes the following command in Cursor:

```
Initialize project based on project_description.md
```

## Step-by-Step Initialization Sequence

### Phase 1: Analysis and Planning

1. **Read Project Description**
   ```javascript
   // Read the project description file
   const projectDescription = readFile('core/init/project_description.md');
   
   // Analyze the content to understand requirements
   const requirements = analyzeRequirements(projectDescription);
   ```

2. **Determine Project Type**
   ```javascript
   // Based on requirements, determine the most appropriate project type
   const projectType = determineProjectType(requirements);
   // Possible values: 'frontend', 'backend', 'fullstack', 'mobile', 'data'
   ```

3. **Select Workflow**
   ```javascript
   // Select the appropriate workflow based on project type
   const workflowPath = `workflows/${projectType}/standard_workflow.md`;
   const workflow = readFile(workflowPath);
   ```

4. **Create Memory Bank**
   ```javascript
   // Create directory for Cursor-specific files if it doesn't exist
   createDirectory('.cursor');
   
   // Load the memory bank template
   const memoryBankTemplate = readFile('core/memory/memory_bank_template.json');
   
   // Initialize memory bank with project details
   const memoryBank = initializeMemoryBank(memoryBankTemplate, {
     projectName: extractProjectName(projectDescription),
     projectType: projectType,
     description: summarizeProject(projectDescription),
     createdAt: getCurrentDateTime(),
     lastUpdated: getCurrentDateTime()
   });
   
   // Write memory bank to file
   writeFile('.cursor/memory_bank.json', memoryBank);
   ```

### Phase 2: Project Structure Setup

5. **Create Directory Structure**
   ```javascript
   // Create standard directories based on project type
   const directories = getDirectoriesForProjectType(projectType);
   
   // Create each directory
   directories.forEach(dir => createDirectory(dir));
   ```

6. **Initialize Git Repository**
   ```javascript
   // Load Git configuration template
   const gitConfig = readFile('configs/git/git_config_template.json');
   
   // Initialize Git repository
   initGitRepository(gitConfig);
   
   // Create initial .gitignore file
   createGitignore(projectType);
   
   // Make initial commit
   commitChanges('Initial project setup by AI agent');
   ```

7. **Configure MCP Servers**
   ```javascript
   // Load MCP configuration template
   const mcpConfig = readFile('configs/mcp/mcp_config_template.json');
   
   // Create MCP configuration file
   writeFile('config/mcp.json', mcpConfig);
   
   // Start required MCP servers
   startMcpServers(mcpConfig);
   ```

### Phase 3: Project Documentation

8. **Create To-Do List**
   ```javascript
   // Create docs directory if it doesn't exist
   createDirectory('docs');
   
   // Load to-do list template
   const todoTemplate = readFile('core/init/todo_list_template.md');
   
   // Generate detailed to-do list based on workflow
   const todoList = generateTodoList(todoTemplate, workflow, requirements);
   
   // Write to-do list to file
   writeFile('docs/to_do_list.md', todoList);
   ```

9. **Create Project README**
   ```javascript
   // Generate README content based on project description
   const readmeContent = generateReadme(projectDescription, projectType);
   
   // Write README to file
   writeFile('README.md', readmeContent);
   ```

10. **Create Technical Documentation Structure**
    ```javascript
    // Create documentation files based on project type
    const docFiles = getDocFilesForProjectType(projectType);
    
    // Create each documentation file
    docFiles.forEach(file => {
      const template = getDocTemplate(file.type);
      const content = generateDocContent(template, requirements);
      writeFile(`docs/${file.name}`, content);
    });
    ```

### Phase 4: Development Environment Setup

11. **Select Technology Stack**
    ```javascript
    // Determine appropriate technology stack based on requirements
    const techStack = determineTechStack(requirements, projectType);
    
    // Update memory bank with selected technology stack
    updateMemoryBank('.cursor/memory_bank.json', {
      architecture: {
        frontend: techStack.frontend,
        backend: techStack.backend,
        deployment: techStack.deployment
      }
    });
    ```

12. **Initialize Project Dependencies**
    ```javascript
    // Create appropriate configuration files based on tech stack
    createConfigFiles(techStack);
    
    // Initialize package manager
    initializePackageManager(techStack);
    
    // Install core dependencies
    installDependencies(techStack.coreDependencies);
    ```

13. **Configure Development Tools**
    ```javascript
    // Set up linting and formatting
    setupLinting(techStack);
    
    // Configure testing framework
    setupTestingFramework(techStack);
    
    // Set up build tools
    setupBuildTools(techStack);
    ```

### Phase 5: Initial Code Setup

14. **Create Initial Code Structure**
    ```javascript
    // Generate initial code files based on project type and tech stack
    const initialFiles = getInitialFiles(projectType, techStack);
    
    // Create each file
    initialFiles.forEach(file => {
      const template = getCodeTemplate(file.type);
      const content = generateCode(template, requirements);
      writeFile(file.path, content);
    });
    ```

15. **Set Up Testing Environment**
    ```javascript
    // Create test directory structure
    createTestDirectories(projectType);
    
    // Set up test configuration
    setupTestConfig(techStack);
    
    // Create initial test files
    createInitialTests(projectType, techStack);
    ```

16. **Commit Initial Code**
    ```javascript
    // Stage all changes
    stageChanges();
    
    // Commit changes
    commitChanges('Set up initial project structure and dependencies');
    ```

### Phase 6: Finalization

17. **Update Memory Bank with Project Status**
    ```javascript
    // Update memory bank with initialization completion status
    updateMemoryBank('.cursor/memory_bank.json', {
      progress: {
        currentPhase: 'Development',
        completedTasks: ['Project Initialization'],
        currentTask: getNextTask(todoList),
        nextTasks: getUpcomingTasks(todoList, 3)
      },
      files: {
        created: listCreatedFiles(),
        pending: []
      }
    });
    ```

18. **Generate Initialization Report**
    ```javascript
    // Create initialization report
    const report = generateInitializationReport(projectType, techStack, todoList);
    
    // Write report to file
    writeFile('docs/initialization_report.md', report);
    ```

19. **Notify User of Completion**
    ```javascript
    // Generate completion message
    const message = generateCompletionMessage(projectType, techStack);
    
    // Display message to user
    notifyUser(message);
    ```

## Error Handling

At each step in the initialization sequence, the AI agent should:

1. Check if the operation was successful
2. If an error occurs:
   - Log the error details
   - Attempt to resolve the issue automatically
   - If resolution is not possible, provide clear error information to the user
   - Update the Memory Bank with error details

## Post-Initialization

After completing the initialization sequence, the AI agent should:

1. Activate Yolo mode if not already active
2. Begin following the workflow for the selected project type
3. Start implementing the first task from the to-do list
4. Regularly update the Memory Bank and to-do list as progress is made

This initialization sequence ensures that all projects start with a consistent structure and follow best practices from the beginning.
