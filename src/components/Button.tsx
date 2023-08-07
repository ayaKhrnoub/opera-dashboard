import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariant = cva(
  "inline-flex group select-none text-white justify-center capitalize active:scale-95 duration-300 disabled:active:scale-100 disabled:cursor-wait items-center",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/80 disabled:bg-primary/80",
        gray: "bg-gray hover:bg-light-gray disabled:bg-light-gray",
        red: "bg-red-600 hover:bg-red-400 disabled:bg-red-400",
        blue: "bg-blue-600 hover:bg-blue-400 disabled:bg-blue-400",
      },
      size: {
        default: "w-36 h-10 text-2xl rounded-lg",
        sm: "h-8 w-24 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface PropsTypes
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariant> {
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, PropsTypes>(
  ({ size, variant, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariant({ variant, size, className }))}
        {...props}
      />
    );
  }
);

export default Button;
