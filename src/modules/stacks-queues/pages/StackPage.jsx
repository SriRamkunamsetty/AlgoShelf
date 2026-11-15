import { useState, useRef } from "react";
import { ArrowLeft, Clock3, Eye, Plus, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import StackVisualizer from "../components/StackVisualizer";
import { stackContent } from "../data/stackContent";

export default function StackPage() {
  const nextId = useRef(4);
  const [items, setItems] = useState([
    { id: "s-1", value: 12 },
    { id: "s-2", value: 45 },
    { id: "s-3", value: 89 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [highlightTop, setHighlightTop] = useState(false);
  const [message, setMessage] = useState(null);

  const maxCapacity = 6;

  const handlePush = () => {
    if (items.length >= maxCapacity) {
      setMessage({
        type: "error",
        text: `Stack Overflow! Cannot push into a full stack (Maximum capacity is ${maxCapacity}).`,
      });
      return;
    }

    const trimmed = inputValue.trim();
    const val = trimmed === "" ? Math.floor(Math.random() * 90) + 10 : Number(trimmed);

    if (!Number.isFinite(val)) {
      setMessage({ type: "error", text: "Please enter a valid numeric value to push." });
      return;
    }

    const newItem = { id: `s-${nextId.current++}`, value: val };
    setItems((prev) => [...prev, newItem]);
    setInputValue("");
    setHighlightTop(false);
    setMessage({
      type: "success",
      text: `Pushed value ${val} onto the top of the stack. (Total: ${items.length + 1})`,
    });
  };

  const handlePop = () => {
    if (items.length === 0) {
      setMessage({
        type: "error",
        text: "Stack Underflow! Cannot pop from an empty stack.",
      });
      return;
    }

    const poppedItem = items[items.length - 1];
    setItems((prev) => prev.slice(0, -1));
    setHighlightTop(false);
    setMessage({
      type: "success",
      text: `Popped value ${poppedItem.value} from the top of the stack. (Remaining: ${items.length - 1})`,
    });
  };

  const handlePeek = () => {
    if (items.length === 0) {
      setMessage({
        type: "error",
        text: "Cannot peek an empty stack.",
      });
      return;
    }

    const topItem = items[items.length - 1];
    setHighlightTop(true);
    setMessage({
      type: "info",
      text: `Peek: The top element is ${topItem.value} at index ${items.length - 1}. No elements were removed.`,
    });
  };

  const handleClear = () => {
    setItems([]);
    setHighlightTop(false);
    setMessage({
      type: "info",
      text: "Stack has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Header */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/learn/stacks-queues"
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to Stacks &amp; Queues
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  Chapter I · Linear Structures
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl">
                {stackContent.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {stackContent.subtitle}
              </p>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                  <Clock3 size={15} /> 5 min lesson
                </span>
                <span className="rounded-full bg-green-100 px-3.5 py-1.5 font-medium text-green-700">
                  Beginner
                </span>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                  LIFO Principle
                </span>
              </div>
            </div>

            {/* Quick Intuition Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                LIFO Mental Model
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                Imagine a stack of books on a desk. You can only place a new book on top (Push), and you can only take the topmost book off (Pop). The first book placed at the bottom remains until all others are removed.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Work Area */}
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Visualizer */}
          <StackVisualizer
            items={items}
            maxCapacity={maxCapacity}
            highlightTop={highlightTop}
            message={message}
          />

          {/* Controls Card */}
          <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
                Operations
              </p>
              <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
                Stack Actions
              </h3>
            </div>

            {/* Push Input */}
            <div>
              <label
                htmlFor="stack-push-value"
                className="mb-2 block text-sm font-medium text-[#514940]"
              >
                Value to Push
              </label>
              <div className="flex gap-3">
                <input
                  id="stack-push-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 55"
                  className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
                />
                <button
                  type="button"
                  onClick={handlePush}
                  disabled={items.length >= maxCapacity}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
                >
                  <Plus size={16} />
                  Push
                </button>
              </div>
            </div>

            {/* Pop & Peek Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handlePop}
                disabled={items.length === 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#C87865] bg-[#FDF5F3] text-sm font-semibold text-[#8C3D2D] transition hover:bg-[#F9E8E3] disabled:opacity-40"
              >
                <Trash2 size={16} />
                Pop()
              </button>

              <button
                type="button"
                onClick={handlePeek}
                disabled={items.length === 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#DDD2C6] bg-white text-sm font-semibold text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7] disabled:opacity-40"
              >
                <Eye size={16} />
                Peek()
              </button>
            </div>

            <div className="border-t border-[#EEE5DB] pt-4">
              <button
                type="button"
                onClick={handleClear}
                disabled={items.length === 0}
                className="text-xs font-medium text-[#8C837B] hover:text-[#A84533] transition"
              >
                Clear entire stack
              </button>
            </div>
          </div>
        </div>

        {/* Complexity & Overview Section */}
        <section className="pt-8 border-t border-[#ECE3D8] space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
              Complexity Analysis
            </p>
            <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
              Operation Complexity
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stackContent.operations.map((op) => (
              <div key={op.name} className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                  {op.name}
                </p>
                <h3 className="mt-2 font-mono text-3xl font-bold text-[#1F1B18]">
                  {op.complexity}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#8C837B]">
                  {op.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
