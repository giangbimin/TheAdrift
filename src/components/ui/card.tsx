import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Base styles for the Card
const cardVariants = cva(
    "rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-visible",
    {
        variants: {
            variant: {
                default: "",
                // Cyber: Glassmorphism, Neon Borders, Floating Shadow
                cyber: "bg-black/85 border-2 border-nebula-cyan/30 text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,240,255,0.05)] rounded-sm",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, children, ...props }, ref) => {

        const isCyber = variant === 'cyber';

        return (
            <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
                {isCyber && (
                    <>
                        {/* Top Left Corner */}
                        <span className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-2 border-l-2 border-nebula-cyan shadow-[-2px_-2px_10px_rgba(0,240,255,0.5)] pointer-events-none" />
                        {/* Bottom Right Corner */}
                        <span className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-2 border-r-2 border-nebula-cyan shadow-[2px_2px_10px_rgba(0,240,255,0.5)] pointer-events-none" />
                    </>
                )}
                {children}
            </div>
        )
    }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-neutral-400", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
