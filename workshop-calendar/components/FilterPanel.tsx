'use client'

import { FilterState, hasActiveFilters, initialFilterState } from '@/lib/filterWorkshops'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const workshopTypeOptions = [
  { value: 'coding', label: 'Coding', activeClass: 'bg-[#8b5cf6] text-white' },
  { value: 'design', label: 'Design', activeClass: 'bg-[#ec4899] text-white' },
  { value: 'collab', label: 'Collab', activeClass: 'bg-[#14b8a6] text-white' },
  { value: 'pm', label: 'PM', activeClass: 'bg-[#f59e0b] text-white' },
]

const audienceOptions = [
  { value: 'member', label: 'Member Only' },
  { value: 'public', label: 'Public' },
]

const skillLevelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'advanced', label: 'Advanced' },
]

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleWorkshopType = (type: string) => {
    const newTypes = filters.workshopTypes.includes(type)
      ? filters.workshopTypes.filter((t) => t !== type)
      : [...filters.workshopTypes, type]
    onFiltersChange({ ...filters, workshopTypes: newTypes })
  }

  const toggleAudience = (audience: string) => {
    // If already selected, deselect (set to null)
    const newAudience = filters.audience === audience ? null : audience
    onFiltersChange({ ...filters, audience: newAudience })
  }

  const toggleSkillLevel = (level: string) => {
    const newLevels = filters.skillLevels.includes(level)
      ? filters.skillLevels.filter((l) => l !== level)
      : [...filters.skillLevels, level]
    onFiltersChange({ ...filters, skillLevels: newLevels })
  }

  const clearFilters = () => {
    onFiltersChange(initialFilterState)
  }

  const activeFilterCount =
    filters.workshopTypes.length +
    (filters.audience ? 1 : 0) +
    filters.skillLevels.length

  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-primary-600 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <svg
            className={cn(
              'w-4 h-4 text-gray-400 transition-transform',
              isExpanded ? 'rotate-180' : ''
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Filter options - expandable */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-5 border-t border-gray-100 dark:border-gray-700 pt-4">
            {/* Workshop Type */}
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {workshopTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleWorkshopType(option.value)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full transition-all',
                      filters.workshopTypes.includes(option.value)
                        ? option.activeClass
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Audience
              </label>
              <div className="flex flex-wrap gap-1.5">
                {audienceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleAudience(option.value)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full transition-all',
                      filters.audience === option.value
                        ? 'bg-[#3b82f6] text-white'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Level
              </label>
              <div className="flex flex-wrap gap-1.5">
                {skillLevelOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleSkillLevel(option.value)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full transition-all',
                      filters.skillLevels.includes(option.value)
                        ? 'bg-gray-800 text-white dark:bg-gray-500 dark:text-white'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear button */}
            {hasActiveFilters(filters) && (
              <button
                onClick={clearFilters}
                className="w-full text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 py-1 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
