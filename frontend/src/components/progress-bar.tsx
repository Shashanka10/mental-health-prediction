"use client";

import { motion } from "framer-motion";
import { UserRound, Smartphone, HeartPulse, Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "About You", icon: UserRound },
  { number: 2, label: "Digital Habits", icon: Smartphone },
  { number: 3, label: "Lifestyle", icon: HeartPulse },
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed = currentStep > step.number;
          const active = currentStep === step.number;

          return (
            <div
              key={step.number}
              className={`flex items-center ${
                index < steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{ scale: active ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-11 sm:w-11 ${
                    completed
                      ? "border-teal-500 bg-teal-500 text-white"
                      : active
                        ? "border-teal-500 bg-teal-50 text-teal-600"
                        : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {active && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-teal-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        scale: [0.9, 1.25, 1.35],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}

                  {completed ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 350 }}
                    >
                      <Check size={16} />
                    </motion.div>
                  ) : (
                    <Icon size={16} />
                  )}
                </motion.div>

                <span
                  className={`mt-2 hidden whitespace-nowrap text-xs font-medium sm:block ${
                    active || completed ? "text-teal-700" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="relative mx-2 h-[2px] flex-1 self-start overflow-hidden bg-slate-200 mt-[17px] sm:mx-5 sm:mt-[21px]">
                  <motion.div
                    initial={false}
                    animate={{
                      width: currentStep > step.number ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 bg-teal-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
