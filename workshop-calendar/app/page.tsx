import { client } from '@/sanity/client'
import { WORKSHOPS_QUERY } from '@/sanity/queries'
import { Workshop } from '@/lib/types'
import { groupByDate } from '@/lib/utils'
import { CalendarView } from '@/components/calendar/CalendarView'

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function HomePage() {
  // Fetch workshops from Sanity
  const workshops = await client.fetch<Workshop[]>(WORKSHOPS_QUERY)

  // Group workshops by date (chronological with gaps filled in)
  const groupedWorkshops = groupByDate(workshops)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-3">
            Web Impact Workshops
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Workshop calendar for coding, design, and collaboration
          </p>
        </header>

        {/* Calendar */}
        <CalendarView groupedWorkshops={groupedWorkshops} />
      </div>
    </div>
  )
}
