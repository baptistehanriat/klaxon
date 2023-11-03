import * as React from 'react'

import { cn } from '@/lib/utils'
import { error } from 'console'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-xl border-input  px-3 py-2 text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            !!errorMessage
              ? 'bg-red-50 border-red-400 border-2'
              : 'bg-gray-100',
            className,
          )}
          ref={ref}
          {...props}
        />
        <p className="text-xs text-red-400">{errorMessage}</p>
      </>
    )
  },
)
Input.displayName = 'Input'

export { Input }
