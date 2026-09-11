"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, Controller, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowLeft,
  ArrowRight,
  Brain,
  ChevronDown,
  Clock3,
  Dumbbell,
  GraduationCap,
  Moon,
  Smartphone,
  Activity,
  BookOpen,
  Users,
  Newspaper,
  Gamepad2,
  AlertCircle,
  HeartPulse,
  Check,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSnapchatGhost,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { SiKakaotalk, SiLine, SiWechat } from "react-icons/si";
import { SlSocialVkontakte } from "react-icons/sl";

import ProgressBar from "./progress-bar";
import OptionCard from "./option-card";
import ResultCard from "./result-card";

import {
  assessmentSchema,
  type AssessmentFormData,
} from "@/schemas/assessment";
import type { Platform, Purpose } from "@/types/assessment";

import { predictMentalHealth } from "@/lib/api";

const initialData: AssessmentFormData = {
  age: 20,
  gender: "Male",
  country: "",
  academic_level: "Undergraduate",
  most_used_platform: "Instagram",
  purpose_of_use: "Entertainment",
  avg_daily_usage_hours: 4,
  daily_unlocks: 50,
  study_hours: 4,
  physical_activity_hours: 1,
  sleep_hours_per_night: 7,
  stress_level: "Medium",
};

const platformOptions: Platform[] = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Twitter",
  "Snapchat",
  "TikTok",
  "Youtube",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

const purposeOptions: Purpose[] = [
  "Networking",
  "Entertainment",
  "Education",
  "News",
];

const countryOptions = [
  "Other",
  "India",
  "USA",
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "Mexico",
  "Turkey",
  "France",
];

const pageVariants = {
  initial: { opacity: 0, x: 25 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -25 },
};

const pageTransition = { duration: 0.35, ease: "easeOut" as const };

const stepFields: Record<number, Path<AssessmentFormData>[]> = {
  1: ["age", "gender", "country", "academic_level"],
  2: [
    "most_used_platform",
    "purpose_of_use",
    "avg_daily_usage_hours",
    "daily_unlocks",
  ],
  3: [
    "study_hours",
    "physical_activity_hours",
    "sleep_hours_per_night",
    "stress_level",
  ],
};

export default function MentalHealthForm() {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  async function nextStep() {
    setApiError("");
    const valid = await trigger(stepFields[step]);
    if (!valid) return;
    setStep((previous) => Math.min(previous + 1, 3));
  }

  function previousStep() {
    setApiError("");
    setStep((previous) => Math.max(previous - 1, 1));
  }

  const onSubmit = handleSubmit(async (data: AssessmentFormData) => {
    setApiError("");
    setLoading(true);

    try {
      const response = await predictMentalHealth(data);
      setScore(response.predicted_mental_health_score);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the prediction server.",
      );
    } finally {
      setLoading(false);
    }
  });

  function restart() {
    reset(initialData);
    setStep(1);
    setScore(null);
    setApiError("");
  }

  if (score !== null) {
    return <ResultCard score={score} onRestart={restart} />;
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs flex items-center gap-1 font-semibold uppercase tracking-[0.12em] text-slate-500">
            <span className="mr-1 animate-pulse text-3xl text-teal-600">•</span>
            Assessment progress
          </span>

          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            Step {step} of 3
          </span>
        </div>

        <ProgressBar currentStep={step} />
      </div>

      <form onSubmit={onSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step-1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <SectionHeader
                eyebrow="Step 01"
                title="Tell us about yourself"
                description="A few basic details help the model understand your context."
              />

              <div className="space-y-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Controller
                    control={control}
                    name="age"
                    render={({ field }) => (
                      <InputField
                        label="Age"
                        type="number"
                        value={field.value}
                        min={10}
                        max={100}
                        error={errors.age?.message}
                        onChange={(value) =>
                          field.onChange(value === "" ? "" : Number(value))
                        }
                      />
                    )}
                  />

                  <div>
                    <FieldLabel>Country</FieldLabel>

                    <Controller
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <SelectField
                          value={field.value}
                          options={countryOptions}
                          onChange={field.onChange}
                          placeholder="Select your country"
                        />
                      )}
                    />

                    {errors.country && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <FieldLabel>Gender</FieldLabel>

                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(["Male", "Female"] as const).map((gender) => {
                          const selected = field.value === gender;

                          return (
                            <label
                              key={gender}
                              className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all ${
                                selected
                                  ? "border-teal-500 bg-teal-50/70 ring-4 ring-teal-500/10"
                                  : "border-slate-200 bg-slate-50/40 hover:border-slate-300 hover:bg-white"
                              }`}
                            >
                              <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={selected}
                                onChange={() => field.onChange(gender)}
                                className="h-4 w-4 accent-teal-600"
                              />

                              <span
                                className={`text-sm font-semibold ${
                                  selected ? "text-teal-700" : "text-slate-700"
                                }`}
                              >
                                {gender}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.3 }}
                >
                  <FieldLabel>Academic level</FieldLabel>

                  <Controller
                    control={control}
                    name="academic_level"
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-3">
                        {(
                          ["Undergraduate", "Graduate", "High School"] as const
                        ).map((level, index) => (
                          <motion.div
                            key={level}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.2 + index * 0.06,
                              duration: 0.3,
                            }}
                          >
                            <OptionCard
                              label={level}
                              value={level}
                              selected={field.value === level}
                              icon={<GraduationCap size={20} />}
                              onClick={() => field.onChange(level)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  />
                </motion.div>
              </div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step-2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <SectionHeader
                icon={<Smartphone size={21} />}
                eyebrow="Step 02"
                title="Understand your digital habits"
                description="Tell us how you typically use social media and your phone."
              />

              <div className="space-y-7">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <FieldLabel>Most used social media platform</FieldLabel>

                  <Controller
                    control={control}
                    name="most_used_platform"
                    render={({ field }) => (
                      <PlatformSelect
                        value={field.value}
                        options={platformOptions}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.3 }}
                >
                  <FieldLabel>Main purpose of social media</FieldLabel>

                  <Controller
                    control={control}
                    name="purpose_of_use"
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {purposeOptions.map((purpose, index) => (
                          <motion.div
                            key={purpose}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.2 + index * 0.06,
                              duration: 0.25,
                            }}
                          >
                            <OptionCard
                              label={purpose}
                              value={purpose}
                              selected={field.value === purpose}
                              icon={getPurposeIcon(purpose)}
                              onClick={() => field.onChange(purpose)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.3 }}
                >
                  <Controller
                    control={control}
                    name="avg_daily_usage_hours"
                    render={({ field }) => (
                      <SliderField
                        label="Average daily social media usage"
                        icon={<Clock3 size={18} />}
                        value={field.value}
                        min={0}
                        max={24}
                        step={0.5}
                        suffix="hours"
                        onChange={field.onChange}
                      />
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                >
                  <Controller
                    control={control}
                    name="daily_unlocks"
                    render={({ field }) => (
                      <SliderField
                        label="Phone unlocks per day"
                        icon={<Smartphone size={18} />}
                        value={field.value}
                        min={0}
                        max={300}
                        step={1}
                        suffix="unlocks"
                        onChange={field.onChange}
                      />
                    )}
                  />
                </motion.div>
              </div>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section
              key="step-3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <SectionHeader
                icon={<HeartPulse size={21} />}
                eyebrow="Step 03"
                title="Your lifestyle"
                description="These everyday factors help complete your assessment."
              />

              <div className="space-y-7">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Controller
                    control={control}
                    name="study_hours"
                    render={({ field }) => (
                      <SliderField
                        label="Study hours per day"
                        icon={<BookOpen size={18} />}
                        value={field.value}
                        min={0}
                        max={24}
                        step={0.5}
                        suffix="hours"
                        onChange={field.onChange}
                      />
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.3 }}
                >
                  <Controller
                    control={control}
                    name="physical_activity_hours"
                    render={({ field }) => (
                      <SliderField
                        label="Physical activity per day"
                        icon={<Dumbbell size={18} />}
                        value={field.value}
                        min={0}
                        max={24}
                        step={0.5}
                        suffix="hours"
                        onChange={field.onChange}
                      />
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.3 }}
                >
                  <Controller
                    control={control}
                    name="sleep_hours_per_night"
                    render={({ field }) => (
                      <SliderField
                        label="Sleep per night"
                        icon={<Moon size={18} />}
                        value={field.value}
                        min={0}
                        max={24}
                        step={0.5}
                        suffix="hours"
                        onChange={field.onChange}
                      />
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                >
                  <FieldLabel>Current stress level</FieldLabel>

                  <Controller
                    control={control}
                    name="stress_level"
                    render={({ field }) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(["Low", "Medium", "High", "Very High"] as const).map(
                          (stress, index) => (
                            <motion.div
                              key={stress}
                              initial={{ opacity: 0, scale: 0.97 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.3 + index * 0.06,
                                duration: 0.25,
                              }}
                            >
                              <OptionCard
                                label={stress}
                                value={stress}
                                selected={field.value === stress}
                                icon={<Activity size={20} />}
                                onClick={() => field.onChange(stress)}
                              />
                            </motion.div>
                          ),
                        )}
                      </div>
                    )}
                  />
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mt-7 flex items-start gap-3 overflow-hidden rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-500" />
              <p className="leading-6">{apiError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="mt-10 flex items-center justify-between gap-4 border-t border-slate-100 pt-6"
        >
          {step > 1 ? (
            <motion.button
              type="button"
              onClick={previousStep}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center cursor-pointer gap-2 rounded-xl bg-slate-200 px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-300"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back
            </motion.button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <motion.button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextStep();
              }}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center cursor-pointer gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/15 transition hover:bg-teal-800"
            >
              Next
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              className="group flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/15 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  Get my result
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </form>
    </div>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon?: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="mb-9"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-8 bg-teal-200" />
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </motion.div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-3 block text-sm font-semibold text-slate-700">
      {children}
    </label>
  );
}

function InputField({
  label,
  type,
  value,
  min,
  max,
  error,
  onChange,
}: {
  label: string;
  type: string;
  value: number | string | undefined;
  min: number;
  max: number;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FieldLabel>{label}</FieldLabel>

      <motion.input
        whileFocus={{ scale: 1.01 }}
        type={type}
        value={value ?? ""}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className={`h-14 w-full rounded-2xl border bg-slate-50/40 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:ring-4 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
            : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/10"
        }`}
      />

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      )}
    </motion.div>
  );
}

function SelectField({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50/40 px-4 pr-12 text-slate-900 outline-none transition hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={19}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function PlatformSelect({
  value,
  options,
  onChange,
}: {
  value: Platform;
  options: Platform[];
  onChange: (value: Platform) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedIcon = getPlatformIcon(value);

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.995 }}
        onClick={() => setOpen((previous) => !previous)}
        className={`flex h-14 cursor-pointer w-full items-center justify-between rounded-2xl border bg-slate-50/40 px-4 text-left outline-none transition ${
          open
            ? "border-teal-500 bg-white ring-4 ring-teal-500/10"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            {selectedIcon}
          </div>
          <span className="truncate font-medium text-slate-800">{value}</span>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={19} className="text-slate-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60"
          >
            <div className="max-h-80 overflow-y-auto">
              {options.map((platform, index) => {
                const selected = value === platform;

                return (
                  <motion.button
                    key={platform}
                    type="button"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => {
                      onChange(platform);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      selected
                        ? "bg-teal-50 text-teal-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        selected
                          ? "bg-teal-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {getPlatformIcon(platform)}
                    </div>

                    <span className="flex-1 text-sm font-medium">
                      {platform}
                    </span>

                    {selected && (
                      <Check size={17} className="shrink-0 text-teal-600" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SliderField({
  label,
  icon,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-slate-50/30 p-5 transition-colors hover:border-slate-300 hover:bg-white"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
          >
            {icon}
          </motion.div>
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </div>

        <motion.div
          key={value}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="whitespace-nowrap rounded-xl bg-teal-50 px-3 py-2 text-sm font-bold text-teal-700"
        >
          {value} {suffix}
        </motion.div>
      </div>

      <div className="relative h-6">
        <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-200" />

        <motion.div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-teal-500"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.15 }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="relative z-10 h-6 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>

      <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </motion.div>
  );
}

function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case "Instagram":
      return <FaInstagram size={20} />;
    case "Facebook":
      return <FaFacebook size={20} />;
    case "LinkedIn":
      return <FaLinkedin size={20} />;
    case "Twitter":
      return <FaTwitter size={20} />;
    case "Snapchat":
      return <FaSnapchatGhost size={20} />;
    case "TikTok":
      return <FaTiktok size={20} />;
    case "Youtube":
      return <FaYoutube size={20} />;
    case "LINE":
      return <SiLine size={20} />;
    case "KakaoTalk":
      return <SiKakaotalk size={20} />;
    case "VKontakte":
      return <SlSocialVkontakte size={20} />;
    case "WhatsApp":
      return <FaWhatsapp size={20} />;
    case "WeChat":
      return <SiWechat size={20} />;
    default:
      return <Smartphone size={20} />;
  }
}

function getPurposeIcon(purpose: Purpose) {
  switch (purpose) {
    case "Networking":
      return <Users size={20} />;
    case "Education":
      return <BookOpen size={20} />;
    case "News":
      return <Newspaper size={20} />;
    case "Entertainment":
      return <Gamepad2 size={20} />;
    default:
      return <Brain size={20} />;
  }
}
