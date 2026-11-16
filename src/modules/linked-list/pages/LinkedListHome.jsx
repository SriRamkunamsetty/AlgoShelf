import { ArrowDown, BookOpen, Compass, Link2, Split } from "lucide-react";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

export default function LinkedListHome() {
  const chapters = [
    {
      chapter: "Chapter I",
      title: "Insertion & Deletion Operations",
      description:
        "Master pointer rewiring at Head, Tail, and arbitrary index positions with animated node allocations and link updates.",
      complexity: "O(1) – O(n)",
      difficulty: "Beginner",
      path: "/learn/linked-lists/operations",
    },
    {
      chapter: "Chapter II",
      title: "Linked List Traversal",
      description:
        "Trace sequential node visits from Head to NULL pointer, inspecting data payloads and reference addresses.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/learn/linked-lists/traversal",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("linked-list-chapters")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <BackToShelf />

        {/* Editorial Header */}
        <section className="grid gap-12 border-b border-[#ECE3D8] py-8 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D9C9B6]" />
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#A07A56]">
                Book II
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Linked
              <br />
              Lists
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              &ldquo;An array demands contiguous real estate; a linked list
              wanders freely through memory, tethered only by references.&rdquo;
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Unlike contiguous arrays that require contiguous blocks of memory,
              linked lists allocate nodes dynamically in the heap and connect
              them via explicit pointer references.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#9D7653] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#8A6645]"
            >
              <BookOpen size={18} />
              <span>Explore Chapters</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Decorative Visual Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#A1764E]">
                <Compass size={24} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Memory Topology
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl text-[#1F1B18]">
                Arrays vs. Linked Lists
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Link2 size={16} className="text-[#A1764E]" />
                    <span>Constant Head Insertion</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Inserting at index 0 requires changing just 2 pointers (O(1)),
                    whereas an array requires shifting all n elements (O(n)).
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Split size={16} className="text-[#3D5A37]" />
                    <span>Dynamic Growth</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Nodes are allocated on demand with zero resizing spikes or
                    pre-allocated wasted capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Collection */}
        <section id="linked-list-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Available Linked List Chapters
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Select a chapter to access interactive laboratories, step-by-step
              pointer animations, and live complexity traces.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {chapters.map((ch) => (
              <AlgorithmCard key={ch.title} {...ch} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
