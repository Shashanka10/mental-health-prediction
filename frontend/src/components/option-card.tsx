"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  description?: string;
}

export default function OptionCard({
  label,
  value,
  selected,
  onClick,
  icon,
  description,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      animate={{
        scale: selected ? 1.01 : 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`group relative w-full cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-teal-500 bg-teal-50 shadow-sm shadow-teal-100"
          : "border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/40"
      }`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <motion.div
            animate={{
              scale: selected ? 1.08 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
              selected
                ? "bg-teal-500 text-white"
                : "bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600"
            }`}
          >
            {icon}
          </motion.div>
        )}

        <div className="min-w-0 flex-1">
          <p
            className={`font-medium ${
              selected ? "text-teal-900" : "text-slate-800"
            }`}
          >
            {label}
          </p>

          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>

        <motion.div
          animate={{
            scale: selected ? 1 : 0.9,
          }}
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
            selected ? "border-teal-500 bg-teal-500" : "border-slate-300"
          }`}
        >
          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
            >
              <Check size={14} strokeWidth={3} className="text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.button>
  );
}
