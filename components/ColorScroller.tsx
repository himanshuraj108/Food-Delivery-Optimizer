'use client';

import { useState } from 'react';
import { Palette, Eye } from 'lucide-react';

interface ColorScrollerProps {
  explorationColor: string;
  pathColor: string;
  onExplorationColorChange: (color: string) => void;
  onPathColorChange: (color: string) => void;
}

const colors = [
  '#fbbf24', // yellow
  '#f59e0b', // amber
  '#f97316', // orange
  '#ef4444', // red
  '#ec4899', // pink
  '#a855f7', // purple
  '#8b5cf6', // violet
  '#6366f1', // indigo
  '#3b82f6', // blue
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#22c55e', // green
  '#84cc16', // lime
];

export default function ColorScroller({
  explorationColor,
  pathColor,
  onExplorationColorChange,
  onPathColorChange,
}: ColorScrollerProps) {
  const [activeTab, setActiveTab] = useState<'exploration' | 'path'>('exploration');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-800">Customize Path Colors</h3>
        </div>
        <p className="text-gray-600">Select colors for path exploration and shortest path visualization</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('exploration')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'exploration'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Exploration Path
          </button>
          <button
            onClick={() => setActiveTab('path')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'path'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Shortest Path
          </button>
        </div>
      </div>

      {/* Color Preview */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Preview:</span>
        </div>
        <div
          className="w-16 h-8 rounded-lg border-2 border-white shadow-md transition-all duration-300"
          style={{ 
            backgroundColor: activeTab === 'exploration' ? explorationColor : pathColor,
            boxShadow: `0 0 20px ${activeTab === 'exploration' ? explorationColor : pathColor}40`
          }}
        />
      </div>

      {/* Color Scroller */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => 
                activeTab === 'exploration' 
                  ? onExplorationColorChange(color)
                  : onPathColorChange(color)
              }
              className={`flex-shrink-0 w-16 h-16 rounded-full border-4 transition-all duration-200 transform hover:scale-110 ${
                (activeTab === 'exploration' ? explorationColor : pathColor) === color
                  ? 'border-gray-800 shadow-lg'
                  : 'border-white shadow-md hover:shadow-lg'
              }`}
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 15px ${color}40`
              }}
            />
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Current Colors Display */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-lg bg-gray-50">
          <div className="text-sm font-medium text-gray-600 mb-2">Exploration Color</div>
          <div
            className="w-full h-8 rounded-md"
            style={{ backgroundColor: explorationColor }}
          />
          <div className="text-xs text-gray-500 mt-2">{explorationColor}</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-gray-50">
          <div className="text-sm font-medium text-gray-600 mb-2">Path Color</div>
          <div
            className="w-full h-8 rounded-md"
            style={{ backgroundColor: pathColor }}
          />
          <div className="text-xs text-gray-500 mt-2">{pathColor}</div>
        </div>
      </div>
    </div>
  );
}