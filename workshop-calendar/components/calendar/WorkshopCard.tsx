import { Workshop } from '@/lib/types'
import { formatDate, formatTime, isPastWorkshop, isToday, cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const past = workshop.dateTime ? isPastWorkshop(workshop.dateTime) : false
  const today = workshop.dateTime ? isToday(workshop.dateTime) : false

  const getWorkshopTypeLabel = (type: string) => {
    const labels = {
      coding: 'Coding',
      design: 'Design',
      collab: 'Collab',
      pm: 'PM',
    }
    return labels[type as keyof typeof labels] || type
  }

  const getBadgeVariant = (type: string) => {
    return type as 'coding' | 'design' | 'collab' | 'pm'
  }

  const getSkillLevelLabel = (level: string) => {
    const labels = {
      beginner: 'Beginner',
      advanced: 'Advanced',
    }
    return labels[level as keyof typeof labels] || level
  }

  // Ensure workshopType is always an array (handle legacy data and undefined)
  const workshopTypes = workshop.workshopType
    ? Array.isArray(workshop.workshopType)
      ? workshop.workshopType
      : [workshop.workshopType]
    : []

  // Get primary type for border color (use first type, or fallback to other tags)
  const primaryType = workshopTypes[0]

  // Determine hover border color based on available tags
  const getHoverBorderClass = () => {
    if (primaryType === 'coding') return 'hover:border-[#8b5cf6]!'
    if (primaryType === 'design') return 'hover:border-[#ec4899]!'
    if (primaryType === 'collab') return 'hover:border-[#14b8a6]!'
    if (primaryType === 'pm') return 'hover:border-[#f59e0b]!'
    // Fallback to other tags if no workshop type
    if (workshop.audience === 'member') return 'hover:border-[#3b82f6]!'
    if (workshop.audience === 'public') return 'hover:border-[#3b82f6]!'
    if (workshop.skillLevel && (Array.isArray(workshop.skillLevel) ? workshop.skillLevel.length > 0 : true)) return 'hover:border-gray-400!'
    return ''
  }

  return (
    <Card
      className={cn(
        'border-2! border-transparent! transition-all',
        getHoverBorderClass(),
        {
          'ring-2 ring-primary-500 ring-offset-2': today,
        }
      )}
    >
      <div className="space-y-3">
        {/* Header with type badges */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-black dark:text-white flex-1">
            {workshop.title}
          </h3>
          <div className="flex flex-wrap gap-1 justify-end">
            {workshopTypes.map((type) => (
              <Badge key={type} variant={getBadgeVariant(type)}>
                {getWorkshopTypeLabel(type)}
              </Badge>
            ))}
            {workshop.skillLevel && (
              Array.isArray(workshop.skillLevel)
                ? workshop.skillLevel.map((level) => (
                    <span key={level} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {getSkillLevelLabel(level)}
                    </span>
                  ))
                : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {getSkillLevelLabel(workshop.skillLevel)}
                    </span>
                  )
            )}
            {workshop.audience === 'member' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3b82f6] text-white">
                Member Only
              </span>
            )}
            {workshop.audience === 'public' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3b82f6] text-white">
                Public
              </span>
            )}
          </div>
        </div>

        {/* Time */}
        {workshop.dateTime && (
          <div className="text-sm text-black dark:text-gray-400">
            <p className="font-medium">
              {formatTime(workshop.dateTime)}
            </p>
          </div>
        )}

        {/* Description */}
        {workshop.description && (
          <p className="text-sm text-black dark:text-gray-300 line-clamp-3">
            {workshop.description}
          </p>
        )}

        {/* Links section */}
        <div className="flex flex-wrap gap-2 pt-2">
          {workshop.slideLink && (
            <a
              href={workshop.slideLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#6a39EC] bg-primary-100 rounded-md hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              Slides
            </a>
          )}
          {workshop.recordingLink && (
            <a
              href={workshop.recordingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#6a39EC] bg-primary-100 rounded-md hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              Recording
            </a>
          )}
          {workshop.demoLink && (
            <a
              href={workshop.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#6a39EC] bg-primary-100 rounded-md hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              Demo
            </a>
          )}
          {workshop.preworkshopMaterials &&
            workshop.preworkshopMaterials.length > 0 && (
              <>
                {workshop.preworkshopMaterials.map((material, index) => (
                  <a
                    key={index}
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#6a39EC] bg-primary-100 rounded-md hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
                  >
                    {material.title}
                  </a>
                ))}
              </>
            )}
        </div>

        {/* Past indicator */}
        {past && (
          <p className="text-xs text-black dark:text-gray-400 italic">
            This workshop has already occurred
          </p>
        )}
      </div>
    </Card>
  )
}
