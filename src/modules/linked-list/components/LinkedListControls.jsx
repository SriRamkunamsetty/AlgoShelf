import { useState } from "react";
import { Plus, Trash2, RotateCcw, AlertCircle } from "lucide-react";

export default function LinkedListControls({
  onInsertBeginning,
  onInsertEnd,
  onInsertAtPosition,
  onDeleteBeginning,
  onDeleteEnd,
  onDeleteAtPosition,
  onReset,
  length = 0,
  error = null,
}) {
  const [insertVal, setInsertVal] = useState("");
  const [insertPos, setInsertPos] = useState("");
  const [deletePos, setDeletePos] = useState("");

  const handleInsertBeginning = (e) => {
    e.preventDefault();
    const val = parseInt(insertVal, 10);
    if (!isNaN(val)) {
      onInsertBeginning(val);
      setInsertVal("");
    }
  };

  const handleInsertEnd = (e) => {
    e.preventDefault();
    const val = parseInt(insertVal, 10);
    if (!isNaN(val)) {
      onInsertEnd(val);
      setInsertVal("");
    }
  };

  const handleInsertAtPosition = (e) => {
    e.preventDefault();
    const val = parseInt(insertVal, 10);
    const pos = parseInt(insertPos, 10);
    if (!isNaN(val) && !isNaN(pos)) {
      onInsertAtPosition(val, pos);
      setInsertVal("");
      setInsertPos("");
    }
  };

  const handleDeleteAtPosition = (e) => {
    e.preventDefault();
    const pos = parseInt(deletePos, 10);
    if (!isNaN(pos)) {
      onDeleteAtPosition(pos);
      setDeletePos("");
    }
  };

  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Singly Linked List Operations
          </h3>
          <p className="text-xs text-[#8C837B]">
            Insert or delete nodes at the beginning, end, or arbitrary indices
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE]"
        >
          <RotateCcw size={13} />
          <span>Reset List</span>
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Insertion Section */}
        <div className="rounded-xl border border-[#EEE5DB] bg-white p-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4B7754]">
            Insertion Operations
          </span>

          <div className="mt-3 flex flex-wrap gap-2">
            <input
              type="number"
              placeholder="Value"
              value={insertVal}
              onChange={(e) => setInsertVal(e.target.value)}
              className="w-24 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#4B7754] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleInsertBeginning}
              disabled={!insertVal.trim()}
              className="flex items-center gap-1 rounded-xl bg-[#4B7754] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#3B5E42] disabled:opacity-40"
            >
              <Plus size={13} />
              <span>At Beginning (Head)</span>
            </button>
            <button
              type="button"
              onClick={handleInsertEnd}
              disabled={!insertVal.trim()}
              className="flex items-center gap-1 rounded-xl bg-[#4B7754] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#3B5E42] disabled:opacity-40"
            >
              <Plus size={13} />
              <span>At End (Tail)</span>
            </button>
          </div>

          {/* Insert at position */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              placeholder="Pos (0..n)"
              value={insertPos}
              onChange={(e) => setInsertPos(e.target.value)}
              className="w-24 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#4B7754] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleInsertAtPosition}
              disabled={!insertVal.trim() || !insertPos.trim()}
              className="flex items-center gap-1 rounded-xl border border-[#C5DDC5] bg-[#E6EFE6] px-3.5 py-1.5 text-xs font-bold text-[#2D4B34] shadow-sm transition hover:bg-[#D5E8D5] disabled:opacity-40"
            >
              <Plus size={13} />
              <span>Insert at Position</span>
            </button>
          </div>
        </div>

        {/* Deletion Section */}
        <div className="rounded-xl border border-[#EEE5DB] bg-white p-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            Deletion Operations
          </span>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onDeleteBeginning}
              disabled={length === 0}
              className="flex items-center gap-1 rounded-xl bg-[#DC2626] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#B91C1C] disabled:opacity-40"
            >
              <Trash2 size={13} />
              <span>From Beginning (Head)</span>
            </button>
            <button
              type="button"
              onClick={onDeleteEnd}
              disabled={length === 0}
              className="flex items-center gap-1 rounded-xl bg-[#DC2626] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#B91C1C] disabled:opacity-40"
            >
              <Trash2 size={13} />
              <span>From End (Tail)</span>
            </button>
          </div>

          {/* Delete at position */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              placeholder="Pos (0..n-1)"
              value={deletePos}
              onChange={(e) => setDeletePos(e.target.value)}
              disabled={length === 0}
              className="w-24 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#DC2626] focus:outline-none disabled:opacity-40"
            />
            <button
              type="button"
              onClick={handleDeleteAtPosition}
              disabled={length === 0 || !deletePos.trim()}
              className="flex items-center gap-1 rounded-xl border border-[#FECACA] bg-[#FEE2E2] px-3.5 py-1.5 text-xs font-bold text-[#991B1B] shadow-sm transition hover:bg-[#FDD2D2] disabled:opacity-40"
            >
              <Trash2 size={13} />
              <span>Delete at Position</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-3 text-xs font-medium text-[#991B1B]">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
