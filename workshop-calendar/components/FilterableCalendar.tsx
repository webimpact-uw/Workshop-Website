'use client'

import { useState } from 'react'
import { Workshop } from '@/lib/types'
import { groupByDate } from '@/lib/utils'
import { FilterState, filterWorkshops, initialFilterState, hasActiveFilters } from '@/lib/filterWorkshops'
import { FilterPanel } from './FilterPanel'
import { CalendarView } from './calendar/CalendarView'

interface FilterableCalendarProps {
  workshops: Workshop[]
}

export function FilterableCalendar({ workshops }: FilterableCalendarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState)

  const filteredWorkshops = filterWorkshops(workshops, filters)
  const groupedWorkshops = groupByDate(filteredWorkshops)

  return (
    <>
      <FilterPanel filters={filters} onFiltersChange={setFilters} />

      {hasActiveFilters(filters) && filteredWorkshops.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No workshops match your filters
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your selection to find more workshops.
          </p>
        </div>
      ) : (
        <CalendarView groupedWorkshops={groupedWorkshops} />
      )}
    </>
  )
}
