import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask, filter, searchTerm }) {
  if (tasks.length === 0) {
    const getEmptyMessage = () => {
      if (searchTerm) {
        return `No tasks found matching "${searchTerm}"`;
      }
      
      switch (filter) {
        case 'active':
          return 'No active tasks! Great job staying on top of things.';
        case 'completed':
          return 'No completed tasks yet. Start checking off some tasks!';
        default:
          return 'No tasks yet. Add your first task above to get started!';
      }
    };

    return (
      <div className="p-12 text-center">
        <div className="text-6xl mb-4">
          {searchTerm ? '🔍' : filter === 'completed' ? '✅' : '📝'}
        </div>
        <p className="text-gray-500 text-lg">{getEmptyMessage()}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
}

export default TaskList;