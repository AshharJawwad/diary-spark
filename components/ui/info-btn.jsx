import { Info } from "lucide-react";

export default function InfoButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white dark:bg-zinc-900 rounded-full shadow-md hover:shadow-lg transition-shadow p-2 flex items-center justify-center border-0 focus:outline-none hover:text-blue-600 cursor-pointer"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
      aria-label="Information"
    >
      <Info className="w-5 h-5" />
    </button>
  );
}
