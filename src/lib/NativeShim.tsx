import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for combining Tailwind classes.
 * Essential for the 'Native-on-Web' style.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ViewProps = React.HTMLAttributes<HTMLDivElement>;
export const View = ({ className, ...props }: ViewProps) => (
  <div className={cn("flex flex-col relative", className)} {...props} />
);

export type TextProps = React.HTMLAttributes<HTMLSpanElement>;
export const Text = ({ className, ...props }: TextProps) => (
  <span className={cn("font-sans leading-tight", className)} {...props} />
);

export type TouchableOpacityProps = React.HTMLAttributes<HTMLButtonElement>;
export const TouchableOpacity = ({ className, onClick, ...props }: TouchableOpacityProps) => (
  <button 
    className={cn("active:opacity-60 transition-opacity cursor-pointer border-none bg-transparent p-0 flex flex-col", className)} 
    onClick={onClick}
    {...props} 
  />
);

export type ScrollViewProps = React.HTMLAttributes<HTMLDivElement>;
export const ScrollView = ({ className, ...props }: ScrollViewProps) => (
  <div className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)} {...props} />
);

export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
};
