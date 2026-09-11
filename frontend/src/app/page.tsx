"use client";

import { motion } from "framer-motion";
import { Brain, ShieldCheck, Activity, BrainCircuit } from "lucide-react";

import MentalHealthForm from "@/components/mental-health-form";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-teal-50/80 via-white to-teal-50/70">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-300/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl"
        />

        <motion.div
          animate={{
            opacity: [0.12, 0.24, 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-200/15 blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="fixed left-0 top-0 right-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-3xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo */}
          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.4,
            }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-teal-50 shadow-lg shadow-teal-700/20"
            >
              <BrainCircuit size={21} />
            </motion.div>

            <div>
              <div className="font-bold tracking-tight text-slate-900">
                MindSense
              </div>

              <div className="hidden text-xs text-slate-400 sm:block">
                ML-Based Mental Wellness Prediction
              </div>
            </div>
          </motion.div>

          {/* Privacy badge */}
          <motion.div
            initial={{
              opacity: 0,
              x: 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.4,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/70 px-3 py-2 text-xs font-medium text-teal-700 shadow-sm shadow-teal-100/50"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ShieldCheck size={15} />
            </motion.div>

            <span className="hidden sm:inline">Privacy focused</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative z-10 pt-20">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
          <div className="max-w-5xl">
            <motion.h1
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Understand your{" "}
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                }}
                className="text-teal-700"
              >
                digital wellness.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.5,
              }}
              className="mt-5 max-w-5xl text-base leading-7 text-slate-500 sm:text-lg"
            >
              Answer a few questions about your digital habits, lifestyle, and
              academic routine. Our machine-learning model will use your
              responses to predict a{" "}
              <span className="font-semibold text-teal-700">
                mental health score.
              </span>
            </motion.p>

            {/* Information badges */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 0.45,
                ease: "easeOut",
              }}
              className="mt-7 flex flex-row flex-wrap items-center gap-2 md:gap-3"
            >
              <InfoBadge
                icon={<ShieldCheck size={15} />}
                text="Your responses stay private"
                variant="teal"
                delay={0}
              />

              <InfoBadge
                icon={<Activity size={15} />}
                text="Data-driven prediction"
                variant="blue"
                delay={0.08}
              />

              <InfoBadge
                icon={<Brain size={15} />}
                text="Not a medical diagnosis"
                variant="violet"
                delay={0.16}
              />
            </motion.div>

            {/* Accent line */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: "80px",
                opacity: 1,
              }}
              transition={{
                delay: 0.85,
                duration: 0.5,
              }}
              className="mt-7 h-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-400"
            />
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="relative z-10 pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-5 shadow-2xl shadow-slate-200/50 backdrop-blur-sm sm:p-8 lg:p-10"
          >
            <MentalHealthForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function InfoBadge({
  icon,
  text,
  variant,
  delay,
}: {
  icon: React.ReactNode;
  text: string;
  variant: "teal" | "blue" | "violet";
  delay: number;
}) {
  const styles = {
    teal: {
      wrapper:
        "border-teal-200/80 bg-teal-50/70 text-teal-700 hover:border-teal-300 hover:bg-teal-50",
      icon: "bg-teal-100 text-teal-600 ring-teal-200/70",
    },

    blue: {
      wrapper:
        "border-sky-200/80 bg-sky-50/70 text-sky-700 hover:border-sky-300 hover:bg-sky-50",
      icon: "bg-sky-100 text-sky-600 ring-sky-200/70",
    },

    violet: {
      wrapper:
        "border-violet-200/80 bg-violet-50/70 text-violet-700 hover:border-violet-300 hover:bg-violet-50",
      icon: "bg-violet-100 text-violet-600 ring-violet-200/70",
    },
  };

  const style = styles[variant];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.35,
        ease: "easeOut",
      }}
      whileHover={{
        y: -2,
        scale: 1.02,
      }}
      className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition-all duration-300 ${style.wrapper}`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-300 group-hover:scale-105 ${style.icon}`}
      >
        {icon}
      </span>

      <span>{text}</span>
    </motion.div>
  );
}
