# Automated Workflow Orchestration

This document defines how the AI agent should orchestrate the workflow after project initialization, ensuring a smooth progression through all development phases with minimal user intervention.

## Workflow Execution Model

The workflow orchestration follows a state machine model where:
- Each phase has entry conditions, tasks, and exit criteria
- The AI agent autonomously transitions between phases
- Progress is tracked in the Memory Bank
- The to-do list is continuously updated

## Phase Transition Logic

```javascript
function orchestrateWorkflow() {
  // Always check Memory Bank first
  const memoryBank = readFile('.cursor/memory_bank.json');
  const currentPhase = memoryBank.progress.currentPhase;
  const projectType = memoryBank.project.type;
  
  // Load the appropriate workflow
  const workflow = readFile(`workflows/${projectType}/standard_workflow.md`);
  const phases = parseWorkflowPhases(workflow);
  
  // Find current phase in workflow
  const phaseIndex = phases.findIndex(phase => phase.name === currentPhase);
  const currentPhaseDetails = phases[phaseIndex];
  
  // Check if current phase is complete
  if (isPhaseComplete(currentPhaseDetails, memoryBank)) {
    // Transition to next phase
    const nextPhase = phases[phaseIndex + 1];
    
    // Update Memory Bank with new phase
    updateMemoryBank('.cursor/memory_bank.json', {
      progress: {
        currentPhase: nextPhase.name,
        completedTasks: [...memoryBank.progress.completedTasks, currentPhase],
        currentTask: getFirstTask(nextPhase),
        nextTasks: getUpcomingTasks(nextPhase, 3)
      }
    });
    
    // Log phase transition
    logPhaseTransition(currentPhase, nextPhase.name);
    
    // Begin next phase
    executePhase(nextPhase);
  } else {
    // Continue current phase
    continuePhaseExecution(currentPhaseDetails, memoryBank);
  }
}
```

## Task Execution Process

```javascript
function executeTask(task, phaseContext) {
  // Check Memory Bank before executing task
  const memoryBank = readFile('.cursor/memory_bank.json');
  
  // Load relevant instructions based on task type
  const instructions = loadInstructionsForTask(task);
  
  // Execute the task following instructions
  const result = performTask(task, instructions, memoryBank);
  
  // Update Memory Bank with task results
  updateMemoryBank('.cursor/memory_bank.json', {
    progress: {
      currentTask: task.name,
      taskStatus: 'in_progress'
    },
    files: {
      created: [...memoryBank.files.created, ...result.createdFiles],
      pending: memoryBank.files.pending.filter(file => !result.createdFiles.includes(file))
    }
  });
  
  // Commit changes if appropriate
  if (shouldCommitChanges(task, result)) {
    commitChanges(`${task.type}: ${task.name}`);
  }
  
  // Update to-do list
  updateTodoList('docs/to_do_list.md', task, 'completed');
  
  // Return task result
  return result;
}
```

## Continuous Monitoring and Adaptation

The AI agent continuously monitors the project state and adapts the workflow as needed:

```javascript
function monitorAndAdapt() {
  // Check Memory Bank
  const memoryBank = readFile('.cursor/memory_bank.json');
  
  // Analyze current project state
  const projectState = analyzeProjectState(memoryBank);
  
  // Check for issues or blockers
  const issues = identifyIssues(projectState);
  
  if (issues.length > 0) {
    // Attempt to resolve issues
    const resolutions = resolveIssues(issues);
    
    // Update Memory Bank with issue resolutions
    updateMemoryBank('.cursor/memory_bank.json', {
      issues: {
        identified: issues,
        resolved: resolutions.resolved,
        pending: resolutions.pending
      }
    });
    
    // If there are unresolved issues that block progress
    if (resolutions.pending.some(issue => issue.blocking)) {
      // Notify user only if absolutely necessary
      notifyUserOfBlockingIssue(resolutions.pending.find(issue => issue.blocking));
    }
  }
  
  // Check if workflow needs adaptation
  if (shouldAdaptWorkflow(projectState)) {
    // Adapt workflow to current project state
    adaptWorkflow(projectState);
  }
}
```

## Phase-Specific Orchestration

### Development Phase Orchestration

```javascript
function orchestrateDevelopmentPhase(phase, memoryBank) {
  // Load development instructions
  const devInstructions = readFile('instructions/development/development_instructions.md');
  
  // Get tasks for this phase
  const tasks = getTasksForPhase(phase);
  
  // Execute each task in sequence
  for (const task of tasks) {
    // Check if task dependencies are met
    if (areTaskDependenciesMet(task, memoryBank)) {
      // Execute the task
      const result = executeTask(task, {
        phase: phase,
        instructions: devInstructions
      });
      
      // Check if task was successful
      if (!result.success) {
        // Handle task failure
        handleTaskFailure(task, result);
        break;
      }
    } else {
      // Log dependency issue
      logDependencyIssue(task);
      break;
    }
  }
}
```

### Testing Phase Orchestration

```javascript
function orchestrateTestingPhase(phase, memoryBank) {
  // Load testing instructions
  const testInstructions = readFile('instructions/testing/testing_instructions.md');
  
  // Get tasks for this phase
  const tasks = getTasksForPhase(phase);
  
  // Execute each task in sequence
  for (const task of tasks) {
    // Execute the testing task
    const result = executeTask(task, {
      phase: phase,
      instructions: testInstructions
    });
    
    // If tests fail
    if (!result.success) {
      // Fix the issues
      const fixResult = fixTestingIssues(result.issues);
      
      // Update Memory Bank with fixes
      updateMemoryBank('.cursor/memory_bank.json', {
        testing: {
          issues: result.issues,
          fixes: fixResult.fixes
        }
      });
      
      // Re-run the tests
      const retestResult = executeTask(task, {
        phase: phase,
        instructions: testInstructions
      });
      
      // If still failing after fixes
      if (!retestResult.success) {
        // Handle persistent test failure
        handlePersistentTestFailure(task, retestResult);
        break;
      }
    }
  }
}
```

### Deployment Phase Orchestration

```javascript
function orchestrateDeploymentPhase(phase, memoryBank) {
  // Load deployment instructions
  const deployInstructions = readFile('instructions/deployment/deployment_instructions.md');
  
  // Get tasks for this phase
  const tasks = getTasksForPhase(phase);
  
  // Execute each task in sequence
  for (const task of tasks) {
    // Execute the deployment task
    const result = executeTask(task, {
      phase: phase,
      instructions: deployInstructions
    });
    
    // If deployment fails
    if (!result.success) {
      // Roll back if necessary
      if (shouldRollback(result)) {
        performRollback(task, result);
      }
      
      // Handle deployment failure
      handleDeploymentFailure(task, result);
      break;
    }
  }
  
  // Verify deployment
  const verificationResult = verifyDeployment();
  
  // Update Memory Bank with deployment status
  updateMemoryBank('.cursor/memory_bank.json', {
    deployment: {
      status: verificationResult.success ? 'successful' : 'failed',
      url: verificationResult.deploymentUrl,
      issues: verificationResult.issues
    }
  });
}
```

## Workflow Adaptation Strategies

The AI agent can adapt the workflow based on project needs:

1. **Adding Tasks**: When new requirements are identified
   ```javascript
   function addTasksToWorkflow(newTasks) {
     // Get current to-do list
     const todoList = readFile('docs/to_do_list.md');
     
     // Add new tasks to appropriate sections
     const updatedTodoList = addTasksToTodoList(todoList, newTasks);
     
     // Write updated to-do list
     writeFile('docs/to_do_list.md', updatedTodoList);
     
     // Update Memory Bank
     updateMemoryBank('.cursor/memory_bank.json', {
       progress: {
         nextTasks: [...getNextTasks(), ...newTasks]
       }
     });
   }
   ```

2. **Changing Task Order**: When dependencies change
   ```javascript
   function reorderTasks(taskIds, newOrder) {
     // Get current to-do list
     const todoList = readFile('docs/to_do_list.md');
     
     // Reorder tasks
     const updatedTodoList = reorderTasksInTodoList(todoList, taskIds, newOrder);
     
     // Write updated to-do list
     writeFile('docs/to_do_list.md', updatedTodoList);
     
     // Update Memory Bank
     updateMemoryBank('.cursor/memory_bank.json', {
       progress: {
         nextTasks: getNextTasksInNewOrder(newOrder)
       }
     });
   }
   ```

3. **Skipping Tasks**: When tasks are deemed unnecessary
   ```javascript
   function skipTasks(taskIds, reason) {
     // Get current to-do list
     const todoList = readFile('docs/to_do_list.md');
     
     // Mark tasks as skipped
     const updatedTodoList = markTasksAsSkipped(todoList, taskIds, reason);
     
     // Write updated to-do list
     writeFile('docs/to_do_list.md', updatedTodoList);
     
     // Update Memory Bank
     updateMemoryBank('.cursor/memory_bank.json', {
       progress: {
         skippedTasks: [...getSkippedTasks(), ...taskIds.map(id => ({ id, reason }))]
       }
     });
   }
   ```

## User Interaction Model

The AI agent minimizes user interactions but requests input when absolutely necessary:

```javascript
function requestUserInput(issue) {
  // Check if user input is absolutely necessary
  if (!isUserInputAbsolutelyNecessary(issue)) {
    // Try to resolve without user input
    return resolveWithoutUserInput(issue);
  }
  
  // Prepare clear options for user
  const options = generateClearOptions(issue);
  
  // Request user input with context
  const userInput = requestInputFromUser(issue.description, options);
  
  // Update Memory Bank with user decision
  updateMemoryBank('.cursor/memory_bank.json', {
    userDecisions: [...getUserDecisions(), {
      issue: issue,
      decision: userInput,
      timestamp: getCurrentDateTime()
    }]
  });
  
  // Return user input
  return userInput;
}
```

## Workflow Completion

When all phases are complete, the AI agent finalizes the project:

```javascript
function finalizeProject() {
  // Check Memory Bank
  const memoryBank = readFile('.cursor/memory_bank.json');
  
  // Generate final project report
  const report = generateProjectReport(memoryBank);
  
  // Write report to file
  writeFile('docs/project_report.md', report);
  
  // Create final commit
  commitChanges('Project completion: Final documentation and cleanup');
  
  // Update Memory Bank with completion status
  updateMemoryBank('.cursor/memory_bank.json', {
    project: {
      ...memoryBank.project,
      status: 'completed',
      completedAt: getCurrentDateTime()
    }
  });
  
  // Notify user of project completion
  notifyUserOfCompletion(report);
}
```

This orchestration system ensures that the AI agent can autonomously progress through the entire development workflow with minimal user intervention, while maintaining a high level of quality and following best practices.
