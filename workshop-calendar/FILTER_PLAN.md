# Advanced Filtering Implementation Plan

## Overview
Add optional filters for Workshop Type (multi-select), Audience (multi-select), and Skill Level (single-select) alongside the existing Quarter filter.

## Current Architecture
- QuarterFilter uses URL query params (`?quarter=fall&year=2025`)
- Server component fetches data based on URL params
- Filtering happens server-side via Sanity GROQ queries

## Implementation Approach

### Option A: Client-Side Filtering (Recommended)
Filter workshops after fetching all data for a quarter. Simpler, faster UX.

### Option B: Server-Side Filtering
Add more GROQ query params. More complex, requires more queries.

**Recommendation: Option A** - Client-side filtering is better for this use case because:
- Fewer API calls
- Instant filter updates
- Easier to implement multi-select logic
- Better UX (no page reload on filter change)

---

## Implementation Steps

### Step 1: Create FilterPanel Component
Create a new component `components/FilterPanel.tsx` with:
- Workshop Type multi-select (Coding, Design, Collab, PM)
- Audience multi-select (Member Only, Public)
- Skill Level single-select (Beginner, Advanced, or "All")
- Clear filters button

### Step 2: Create Filter State Hook
Create `hooks/useWorkshopFilters.ts` to manage filter state:
```typescript
interface FilterState {
  workshopTypes: string[]  // multi-select
  audiences: string[]      // multi-select
  skillLevel: string | null // single-select (null = all)
}
```

### Step 3: Create Filter Logic Utility
Create `lib/filterWorkshops.ts`:
```typescript
function filterWorkshops(workshops: Workshop[], filters: FilterState): Workshop[]
```

Filter logic:
- If workshopTypes selected: workshop must have AT LEAST ONE matching type
- If audiences selected: workshop must have a matching audience
- If skillLevel selected: workshop must include that skill level

### Step 4: Update Page Architecture

**Current:**
```
HomePage (server) → CalendarView (server) → DaySection → WorkshopCard
```

**New:**
```
HomePage (server)
  → FilterableCalendar (client wrapper)
      → FilterPanel (client)
      → CalendarView (now client)
          → DaySection → WorkshopCard
```

### Step 5: Modify Components

1. **Create `FilterableCalendar.tsx`** (new client component)
   - Wraps FilterPanel and CalendarView
   - Manages filter state
   - Applies filters to workshops before passing to CalendarView

2. **Update `CalendarView.tsx`**
   - Add "use client" directive
   - Accept filtered workshops as prop
   - Re-group workshops by date after filtering

3. **Keep `page.tsx` as server component**
   - Fetches all workshops for selected quarter
   - Passes raw workshops to FilterableCalendar

### Step 6: UI Design for FilterPanel

```
┌─────────────────────────────────────────────────────────┐
│  Filters                                    [Clear All] │
├─────────────────────────────────────────────────────────┤
│  Type: [Coding] [Design] [Collab] [PM]                 │
│                                                         │
│  Audience: [Member Only] [Public]                       │
│                                                         │
│  Level: ○ All  ○ Beginner  ○ Advanced                  │
└─────────────────────────────────────────────────────────┘
```

- Toggle buttons for multi-select (highlighted when active)
- Radio buttons for skill level
- Collapsible on mobile

---

## File Changes Summary

### New Files:
1. `components/FilterPanel.tsx` - Filter UI component
2. `components/FilterableCalendar.tsx` - Client wrapper with filter state
3. `lib/filterWorkshops.ts` - Filter logic utility

### Modified Files:
1. `components/calendar/CalendarView.tsx` - Convert to client component
2. `app/page.tsx` - Use FilterableCalendar instead of CalendarView directly
3. `lib/utils.ts` - May need to export groupByDate for client use

---

## Considerations

### Empty State
When filters result in no workshops, show:
"No workshops match your filters. Try adjusting your selection."

### URL Persistence (Optional Enhancement)
Could add filter state to URL for shareable filtered views:
`?quarter=fall&year=2025&types=coding,design&audience=member&level=beginner`

### Mobile UX
- Collapsible filter panel
- "X active filters" indicator when collapsed
- Full-width toggle buttons

---

## Estimated Complexity
- FilterPanel component: Medium
- FilterableCalendar wrapper: Low
- Filter logic: Low
- Component refactoring: Low-Medium

Total: ~150-200 lines of new code
