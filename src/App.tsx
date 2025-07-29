import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (taskText, priority = 'medium') => {
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      dueDate: null
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Edit task
  const editTask = (taskId, newText, newPriority, newDueDate) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              text: newText, 
              priority: newPriority,
              dueDate: newDueDate 
            }
          : task
      )
    );
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter and search term
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !task.completed) || 
      (filter === 'completed' && task.completed);
    
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Task Area */}
          <div className="lg:col-span-2 space-y-6">
            <AddTaskForm onAddTask={addTask} />
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <FilterTabs 
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  activeTasks={activeTasks}
                  completedTasks={completedTasks}
                />
              </div>
              
              <TaskList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
                filter={filter}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TaskStats
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              activeTasks={activeTasks}
            />
            
            {completedTasks > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                <button
                  onClick={clearCompleted}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Completed ({completedTasks})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;