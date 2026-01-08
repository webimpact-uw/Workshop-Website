'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface QuarterOption {
  quarter: 'fall' | 'winter' | 'spring'
  year: number
  label: string
  value: string
}

interface QuarterFilterProps {
  availableQuarters: Array<{ quarter: 'fall' | 'winter' | 'spring'; year: number }>
}

export function QuarterFilter({ availableQuarters }: QuarterFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all')

  useEffect(() => {
    const quarter = searchParams.get('quarter')
    const year = searchParams.get('year')
    if (quarter && year) {
      setSelectedQuarter(`${quarter}-${year}`)
    } else {
      setSelectedQuarter('all')
    }
  }, [searchParams])

  // Create quarter options from available quarters
  const quarterOptions: QuarterOption[] = availableQuarters
    .filter(({ quarter, year }) => quarter && year) // Filter out any invalid entries
    .map(({ quarter, year }) => {
      const quarterLabel = quarter.charAt(0).toUpperCase() + quarter.slice(1)
      return {
        quarter,
        year,
        label: `${quarterLabel} ${year}`,
        value: `${quarter}-${year}`,
      }
    })

  const handleQuarterChange = (value: string) => {
    setSelectedQuarter(value)

    if (value === 'all') {
      router.push('/')
    } else {
      const [quarter, year] = value.split('-')
      router.push(`/?quarter=${quarter}&year=${year}`)
    }
  }

  return (
    <div className="flex items-center gap-3 mb-8">
      <label htmlFor="quarter-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Filter by Quarter:
      </label>
      <select
        id="quarter-select"
        value={selectedQuarter}
        onChange={(e) => handleQuarterChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option value="all">All Workshops</option>
        {quarterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
