import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'coding' | 'design' | 'collab' | 'pm' | 'past'
  className?: string
}

export function Badge({ children, variant = 'coding', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        {
          'bg-[#8b5cf6] text-white': variant === 'coding',
          'bg-[#ec4899] text-white': variant === 'design',
          'bg-[#14b8a6] text-white': variant === 'collab',
          'bg-[#f59e0b] text-white': variant === 'pm',
          'bg-gray-400 text-white': variant === 'past',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
