import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Workshop, GroupedWorkshops } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupByDate(workshops: Workshop[]): GroupedWorkshops[] {
  if (workshops.length === 0) {
    return []
  }

  // Sort workshops by date in reverse chronological order (most recent first)
  const sortedWorkshops = [...workshops].sort(
    (a, b) => new Date(b.dateTime || '').getTime() - new Date(a.dateTime || '').getTime()
  )

  // Create a map of date strings to workshops
  const workshopsByDate = new Map<string, Workshop[]>()
  sortedWorkshops.forEach((workshop) => {
    if (!workshop.dateTime) return // Skip workshops without dateTime
    // Parse date in local timezone to avoid off-by-one errors
    const date = new Date(workshop.dateTime)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    if (!workshopsByDate.has(dateStr)) {
      workshopsByDate.set(dateStr, [])
    }
    workshopsByDate.get(dateStr)!.push(workshop)
  })

  // Return only days with workshops (no gaps)
  const result: GroupedWorkshops[] = []
  workshopsByDate.forEach((workshops, dateStr) => {
    result.push({
      date: dateStr,
      workshops,
    })
  })

  // Sort by date in reverse chronological order (most recent first)
  return result.sort((a, b) => b.date.localeCompare(a.date))
}

export function isPastWorkshop(dateTime: string): boolean {
  return new Date(dateTime) < new Date()
}

export function isToday(dateTime: string): boolean {
  const workshopDate = new Date(dateTime)
  const today = new Date()

  return (
    workshopDate.getDate() === today.getDate() &&
    workshopDate.getMonth() === today.getMonth() &&
    workshopDate.getFullYear() === today.getFullYear()
  )
}

export function formatDate(dateTime: string): string {
  return new Date(dateTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(dateTime: string): string {
  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDayHeader(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00') // Add time to avoid timezone issues
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isWeekend(dateStr: string): boolean {
  const date = new Date(dateStr + 'T12:00:00')
  const day = date.getDay()
  return day === 0 || day === 6 // Sunday or Saturday
}
