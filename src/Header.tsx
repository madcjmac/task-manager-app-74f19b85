import React from 'react';
import { CheckCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <CheckCircleIcon className="h-12 w-12 text-blue-600 mr-3" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Task Manager
        </h1>
      </div>
      <p className="text-gray-600 text-lg mb-6">
        Organize your tasks and boost your productivity
      </p>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </header>
  );
}

export default Header;