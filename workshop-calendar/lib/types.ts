export interface Workshop {
  _id: string
  title: string
  description?: string
  workshopType?: Array<'coding' | 'design' | 'collab' | 'pm'> | 'coding' | 'design' | 'collab' | 'pm'
  skillLevel?: Array<'beginner' | 'advanced'>
  audience?: 'member' | 'public'
  quarter: 'fall' | 'winter' | 'spring'
  year: number
  dateTime?: string
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  slideLink?: string
  recordingLink?: string
  demoLink?: string
  preworkshopMaterials?: Array<{
    title: string
    link: string
  }>
}

export interface Officer {
  _id: string
  name: string
  role: string
  yearInSchool: 'freshman' | 'sophomore' | 'junior' | 'senior'
  order?: number
}

export interface GroupedWorkshops {
  date: string // ISO date string (YYYY-MM-DD)
  workshops: Workshop[]
}
