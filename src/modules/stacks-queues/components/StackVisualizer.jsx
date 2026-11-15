import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";

export default function StackVisualizer({
  items = [],
  maxCapacity = 6,
  highlightTop = false,
  message = null,
}) {
  const topIndex = items.length - 1;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            LIFO Memory Canister
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Stack Container
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

      {/* Canister Container */}
      <div className="flex justify-center py-6">
        <div className="relative flex w-full max-w-sm flex-col items-center">
          {/* Top of stack entry indicator */}
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
            <span>Push / Pop (Top of Stack)</span>
            <Layers size={14} />
          </div>

          {/* The Vertical Canister Wall */}
          <div className="relative flex min-h-[360px] w-64 flex-col-reverse items-center justify-start rounded-b-3xl border-x-4 border-b-4 border-[#C8B8A6] bg-[#FCFBF8] p-4 shadow-inner">
            <AnimatePresence initial={false}>
              {items.map((item, index) => {
                const isTop = index === topIndex;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 24,
                    }}
                    className={`relative mb-2 flex h-12 w-full items-center justify-between rounded-xl border px-4 font-mono text-base font-bold shadow-sm transition-all duration-300 ${
                      isTop && highlightTop
                        ? "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] ring-2 ring-[#D39B2A]/40 shadow-md"
                        : isTop
                        ? "border-[#A1764E] bg-white text-[#1F1B18]"
                        : "border-[#E8DDD1] bg-white text-[#5F5952]"
                    }`}
                  >
                    <span className="text-xs text-[#8C837B]">idx: {index}</span>
                    <span className="text-lg">{item.value}</span>
                    {isTop ? (
                      <span className="flex items-center gap-1 rounded bg-[#A1764E] px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
                        <ArrowLeft size={10} className="rotate-90" />
                        Top
                      </span>
                    ) : (
                      <span className="w-10" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="flex h-64 items-center justify-center text-center text-sm text-[#8C837B] italic">
                Stack is empty.
                <br />
                Push elements into the canister.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
