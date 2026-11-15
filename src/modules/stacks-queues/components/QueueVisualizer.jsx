import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CornerDownLeft, CornerDownRight } from "lucide-react";

export default function QueueVisualizer({
  items = [],
  maxCapacity = 6,
  highlightFront = false,
  message = null,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            FIFO Pipeline
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Queue Conveyor
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Size: {items.length} / {maxCapacity}
          </span>
          {items.length === maxCapacity && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              Full
            </span>
          )}
          {items.length === 0 && (
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
              Empty
            </span>
          )}
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 rounded-2xl p-4 text-sm font-medium ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : message.type === "success"
              ? "bg-[#EAF2E8] text-[#3D5A37] border border-[#5A7354]/20"
              : "bg-[#FEF9EE] text-[#8B5A2B] border border-[#D39B2A]/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Flow Direction Indicator */}
      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#A1764E] px-4">
        <div className="flex items-center gap-1.5">
          <CornerDownLeft size={16} />
          <span>Exit (Dequeue)</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Flow Direction</span>
          <ArrowLeft size={16} />
        </div>
        <div className="flex items-center gap-1.5">
          <span>Enter (Enqueue)</span>
          <CornerDownRight size={16} />
        </div>
      </div>

      {/* Horizontal Conveyor Pipeline */}
      <div className="min-h-48 overflow-x-auto rounded-2xl border-y-4 border-[#C8B8A6] bg-[#FCFBF8] p-6 shadow-inner">
        {items.length > 0 ? (
          <div className="flex min-w-max items-center justify-start gap-4">
            <AnimatePresence initial={false}>
              {items.map((item, index) => {
                const isFront = index === 0;
                const isRear = index === items.length - 1;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 40, scale: 0.85 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 24,
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    {/* Top Pointer Badge */}
                    <div className="h-6 flex items-center justify-center">
                      {isFront && (
                        <span className="rounded-full bg-[#5A7354] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Front
                        </span>
                      )}
                      {!isFront && isRear && (
                        <span className="rounded-full bg-[#A1764E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Rear
                        </span>
                      )}
                    </div>

                    {/* Box */}
                    <div
                      className={`flex h-20 w-18 items-center justify-center rounded-2xl border font-mono text-2xl font-bold transition-all duration-300 ${
                        isFront && highlightFront
                          ? "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] ring-2 ring-[#D39B2A]/40 shadow-lg"
                          : isFront
                          ? "border-[#5A7354] bg-[#EAF2E8] text-[#3D5A37] shadow-sm"
                          : "border-[#E8DDD1] bg-white text-[#1F1B18] shadow-sm"
                      }`}
                    >
                      {item.value}
                    </div>

                    {/* Index */}
                    <span className="font-mono text-xs text-[#8C837B]">
                      idx: {index}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-center text-sm text-[#8C837B] italic">
            Queue is empty. Enqueue elements from the right.
          </div>
        )}
      </div>
    </div>
  );
}
