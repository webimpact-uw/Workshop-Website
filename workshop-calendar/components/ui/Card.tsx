import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900 dark:border-gray-800',
        className
      )}
    >
      {children}
    </div>
  )
}
