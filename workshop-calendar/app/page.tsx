import { client } from '@/sanity/client'
import { WORKSHOPS_QUERY, WORKSHOPS_BY_QUARTER_QUERY, AVAILABLE_QUARTERS_QUERY } from '@/sanity/queries'
import { Workshop } from '@/lib/types'
import { FilterableCalendar } from '@/components/FilterableCalendar'
import { QuarterFilter } from '@/components/QuarterFilter'

// Make this page dynamic so it re-fetches on each request
export const dynamic = 'force-dynamic'
// Enable ISR with 60 second revalidation
export const revalidate = 60

interface HomePageProps {
  searchParams: Promise<{ quarter?: string; year?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { quarter, year } = await searchParams

  // Fetch workshops from Sanity - filtered by quarter/year if provided
  let workshops: Workshop[]

  if (quarter && year) {
    workshops = await client.fetch<Workshop[]>(
      WORKSHOPS_BY_QUARTER_QUERY,
      { quarter, year: parseInt(year) }
    )
  } else {
    workshops = await client.fetch<Workshop[]>(WORKSHOPS_QUERY)
  }

  // Fetch available quarters (unique combinations of quarter/year that have workshops)
  const allQuarters = await client.fetch<Array<{ quarter: 'fall' | 'winter' | 'spring'; year: number }>>(
    AVAILABLE_QUARTERS_QUERY
  )

  // Remove duplicates and sort
  const availableQuarters = Array.from(
    new Map(allQuarters.map(item => [`${item.quarter}-${item.year}`, item])).values()
  ).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year // Sort by year descending
    // Sort quarters: spring > winter > fall within same year
    const quarterOrder = { spring: 3, winter: 2, fall: 1 }
    return quarterOrder[b.quarter] - quarterOrder[a.quarter]
  })

  return (
    <div className="min-h-screen bg-background pb-32 pt-26 sm:pt-15">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#6a39EC] dark:text-primary-400 mb-3">
            Web Impact Workshops
          </h1>
          <p className="text-lg text-black dark:text-gray-400">
            Workshop calendar for coding, design, and collabs
          </p>
        </header>

        {/* Quarter Filter */}
        <div className="flex justify-center">
          <QuarterFilter availableQuarters={availableQuarters} />
        </div>

        {/* Filterable Calendar */}
        <FilterableCalendar workshops={workshops} />
      </div>
    </div>
  )
}
