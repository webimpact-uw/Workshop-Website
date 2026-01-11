import { Workshop } from './types'

export interface FilterState {
  workshopTypes: string[]  // multi-select
  audience: string | null  // single-select (null = all)
  skillLevels: string[]    // multi-select
}

export const initialFilterState: FilterState = {
  workshopTypes: [],
  audience: null,
  skillLevels: [],
}

export function filterWorkshops(workshops: Workshop[], filters: FilterState): Workshop[] {
  return workshops.filter((workshop) => {
    // Filter by workshop types (multi-select: match if ANY selected type matches)
    if (filters.workshopTypes.length > 0) {
      const workshopTypes = workshop.workshopType
        ? Array.isArray(workshop.workshopType)
          ? workshop.workshopType
          : [workshop.workshopType]
        : []

      const hasMatchingType = filters.workshopTypes.some((type) =>
        workshopTypes.includes(type as 'coding' | 'design' | 'collab' | 'pm')
      )

      if (!hasMatchingType) return false
    }

    // Filter by audience (single-select: match if workshop has this audience)
    if (filters.audience) {
      if (workshop.audience !== filters.audience) {
        return false
      }
    }

    // Filter by skill levels (exclusive matching)
    // - If only "beginner" selected: show workshops with ONLY beginner (no advanced)
    // - If only "advanced" selected: show workshops with ONLY advanced (no beginner)
    // - If both selected: show workshops that have BOTH beginner AND advanced
    if (filters.skillLevels.length > 0) {
      const workshopSkillLevels = workshop.skillLevel
        ? Array.isArray(workshop.skillLevel)
          ? workshop.skillLevel
          : [workshop.skillLevel]
        : []

      const hasBeginner = workshopSkillLevels.includes('beginner')
      const hasAdvanced = workshopSkillLevels.includes('advanced')
      const wantsBeginner = filters.skillLevels.includes('beginner')
      const wantsAdvanced = filters.skillLevels.includes('advanced')

      if (wantsBeginner && wantsAdvanced) {
        // Both selected: workshop must have BOTH tags
        if (!hasBeginner || !hasAdvanced) return false
      } else if (wantsBeginner) {
        // Only beginner selected: workshop must have beginner but NOT advanced
        if (!hasBeginner || hasAdvanced) return false
      } else if (wantsAdvanced) {
        // Only advanced selected: workshop must have advanced but NOT beginner
        if (!hasAdvanced || hasBeginner) return false
      }
    }

    return true
  })
}

export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.workshopTypes.length > 0 ||
    filters.audience !== null ||
    filters.skillLevels.length > 0
  )
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0
  count += filters.workshopTypes.length
  if (filters.audience) count += 1
  count += filters.skillLevels.length
  return count
}
