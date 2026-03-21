import React from 'react';
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, className }) => {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group select-none", className)}>
      <div 
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={cn(
          "w-5 h-5 border flex items-center justify-center transition-all duration-300",
          checked 
            ? "bg-neutral-900 border-neutral-900 shadow-sm" 
            : "bg-transparent border-neutral-200 group-hover:border-neutral-400"
        )}
      >
        <div className={cn(
          "transition-all duration-200 transform scale-50 opacity-0",
          checked && "scale-100 opacity-100"
        )}>
           <Check size={12} strokeWidth={3} className="text-white" />
        </div>
      </div>
      {label && (
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};
