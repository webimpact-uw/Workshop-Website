import { Workshop } from '@/lib/types'
import { formatDate, formatTime, isPastWorkshop, isToday, cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const past = isPastWorkshop(workshop.dateTime)
  const today = isToday(workshop.dateTime)

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
    if (past) return 'past'
    return type as 'coding' | 'design' | 'collab' | 'pm'
  }

  // Ensure workshopType is always an array (handle legacy data)
  const workshopTypes = Array.isArray(workshop.workshopType)
    ? workshop.workshopType
    : [workshop.workshopType]

  // Get primary type for border color (use first type)
  const primaryType = workshopTypes[0]

  return (
    <Card
      className={cn(
        'border-2 transition-all',
        {
          'border-primary-600': !past && primaryType === 'coding',
          'border-primary-400': !past && primaryType === 'design',
          'border-[#14b8a6]': !past && primaryType === 'collab',
          'border-[#f59e0b]': !past && primaryType === 'pm',
          'border-gray-300 opacity-60': past,
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
