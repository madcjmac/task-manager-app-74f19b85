import React, { useState } from 'react';
import { PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';

function AddTaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim(), priority, dueDate || null);
      setTaskText('');
      setPriority('medium');
      setDueDate('');
      setIsExpanded(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!taskText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Priority Selection */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                        priority === p 
                          ? priorityColors[p] 
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date (Optional)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setTaskText('');
                  setPriority('medium');
                  setDueDate('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddTaskForm;