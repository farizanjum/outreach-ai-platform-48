
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:from-purple-600 hover:to-blue-600 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:from-red-600 hover:to-red-700 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]",
        outline:
          "border-2 border-white/20 bg-white/5 text-white backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/30 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]",
        secondary:
          "bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-white/15 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]",
        ghost: "text-white hover:bg-white/10 shadow-none hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        link: "text-purple-400 underline-offset-4 hover:underline shadow-none hover:text-purple-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4",
        lg: "h-14 rounded-xl px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
