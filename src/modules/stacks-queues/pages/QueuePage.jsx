import { useState, useRef } from "react";
import { ArrowLeft, Clock3, Eye, Plus, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import QueueVisualizer from "../components/QueueVisualizer";
import { queueContent } from "../data/queueContent";

export default function QueuePage() {
  const nextId = useRef(4);
  const [items, setItems] = useState([
    { id: "q-1", value: 34 },
    { id: "q-2", value: 67 },
    { id: "q-3", value: 91 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [highlightFront, setHighlightFront] = useState(false);
  const [message, setMessage] = useState(null);

  const maxCapacity = 6;

  const handleEnqueue = () => {
    if (items.length >= maxCapacity) {
      setMessage({
        type: "error",
        text: `Queue Overflow! Cannot enqueue into a full queue (Maximum capacity is ${maxCapacity}).`,
      });
      return;
    }

    const trimmed = inputValue.trim();
    const val = trimmed === "" ? Math.floor(Math.random() * 90) + 10 : Number(trimmed);

    if (!Number.isFinite(val)) {
      setMessage({ type: "error", text: "Please enter a valid numeric value to enqueue." });
      return;
    }

    const newItem = { id: `q-${nextId.current++}`, value: val };
    setItems((prev) => [...prev, newItem]);
    setInputValue("");
    setHighlightFront(false);
    setMessage({
      type: "success",
      text: `Enqueued value ${val} at the rear of the queue. (Size: ${items.length + 1})`,
    });
  };

  const handleDequeue = () => {
    if (items.length === 0) {
      setMessage({
        type: "error",
        text: "Queue Underflow! Cannot dequeue from an empty queue.",
      });
      return;
    }

    const dequeuedItem = items[0];
    setItems((prev) => prev.slice(1));
    setHighlightFront(false);
    setMessage({
      type: "success",
      text: `Dequeued value ${dequeuedItem.value} from the front of the queue. (Remaining: ${items.length - 1})`,
    });
  };

  const handleFront = () => {
    if (items.length === 0) {
      setMessage({
        type: "error",
        text: "Cannot inspect an empty queue.",
      });
      return;
    }

    const frontItem = items[0];
    setHighlightFront(true);
    setMessage({
      type: "info",
      text: `Front element is ${frontItem.value} (index 0). It will be the next item to dequeue.`,
    });
  };

  const handleClear = () => {
    setItems([]);
    setHighlightFront(false);
    setMessage({
      type: "info",
      text: "Queue has been cleared.",
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
                  Chapter II · Linear Structures
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl">
                {queueContent.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {queueContent.subtitle}
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
                  FIFO Principle
                </span>
              </div>
            </div>

            {/* Quick Intuition Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                FIFO Mental Model
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                Think of a checkout queue at a bakery. The first person to arrive is the first customer served and leaves first. New customers always take their place at the back of the line.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Work Area */}
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Visualizer */}
          <QueueVisualizer
            items={items}
            maxCapacity={maxCapacity}
            highlightFront={highlightFront}
            message={message}
          />

          {/* Controls Card */}
          <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
                Operations
              </p>
              <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
                Queue Actions
              </h3>
            </div>

            {/* Enqueue Input */}
            <div>
              <label
                htmlFor="queue-enqueue-value"
                className="mb-2 block text-sm font-medium text-[#514940]"
              >
                Value to Enqueue
              </label>
              <div className="flex gap-3">
                <input
                  id="queue-enqueue-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 78"
                  className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
                />
                <button
                  type="button"
                  onClick={handleEnqueue}
                  disabled={items.length >= maxCapacity}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
                >
                  <Plus size={16} />
                  Enqueue
                </button>
              </div>
            </div>

            {/* Dequeue & Front Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDequeue}
                disabled={items.length === 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#C87865] bg-[#FDF5F3] text-sm font-semibold text-[#8C3D2D] transition hover:bg-[#F9E8E3] disabled:opacity-40"
              >
                <Trash2 size={16} />
                Dequeue()
              </button>

              <button
                type="button"
                onClick={handleFront}
                disabled={items.length === 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#DDD2C6] bg-white text-sm font-semibold text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7] disabled:opacity-40"
              >
                <Eye size={16} />
                Front()
              </button>
            </div>

            <div className="border-t border-[#EEE5DB] pt-4">
              <button
                type="button"
                onClick={handleClear}
                disabled={items.length === 0}
                className="text-xs font-medium text-[#8C837B] hover:text-[#A84533] transition"
              >
                Clear entire queue
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
            {queueContent.operations.map((op) => (
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
