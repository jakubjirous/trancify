import { cn } from "@/utils/cn";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  kbd?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, kbd, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    const iconStyle =
      "absolute size-4 top-1/2 -translate-y-1/2 text-foreground pointer-events-none peer-focus:text-foreground";

    return (
      <div className="relative w-full">
        {StartIcon && <StartIcon className={cn(iconStyle, "left-3.5")} />}
        <input
          type={type}
          className={cn(
            "peer flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-10" : "",
            endIcon ? "pr-10" : "",
            kbd ? "pr-14" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && <EndIcon className={cn(iconStyle, "right-3.5")} />}
        {kbd && (
          <kbd
            className={cn(
              iconStyle,
              "right-4 flex items-center justify-center",
            )}
          >
            <span className="rounded-sm border px-2 py-1 font-mono text-foreground text-muted-foreground text-xs tracking-widest">
              {kbd}
            </span>
          </kbd>
        )}
      </div>
    );
  },
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
