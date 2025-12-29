import { GroupedWorkshops } from '@/lib/types'
import { DaySection } from './DaySection'

interface CalendarViewProps {
  groupedWorkshops: GroupedWorkshops[]
}

export function CalendarView({ groupedWorkshops }: CalendarViewProps) {
  if (groupedWorkshops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No workshops scheduled yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Check back soon for upcoming workshops!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {groupedWorkshops.map((dayGroup) => (
        <DaySection
          key={dayGroup.date}
          date={dayGroup.date}
          workshops={dayGroup.workshops}
        />
      ))}
    </div>
  )
}
