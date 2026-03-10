import type { ChangeEvent, JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function FileUploadCard(): JSX.Element {
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    window.setTimeout(() => {
      setIsUploading(false);
      setIsModalOpen(true);
      event.target.value = "";
    }, 3000);
  };

  return (
    <>
      <label
        className={`relative block w-105 cursor-pointer rounded-xl border-2 border-dashed border-[#ff8015]/45 bg-[#ff8015]/10 px-6 py-8 text-center transition-colors hover:border-[#ff8015]/70 ${
          isUploading ? "pointer-events-none" : ""
        }`}
      >
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 opacity-0"
        />

        <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
          {isUploading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {isUploading ? "Uploading Brief..." : "Upload Brief"}
        </span>
      </label>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-md rounded-2xl border border-white/15 bg-neutral-950 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            >
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[#ff8015]/85" />
              <h3 className="text-lg font-semibold text-white">
                Thanks for uploading your brief
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                The AI Creative Director will get back to you soon.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-5 rounded-lg border border-[#ff8015]/45 bg-black px-4 py-2 text-sm font-medium text-[#ff8015] transition-all duration-200 hover:border-[#ff8015] hover:bg-[#ff8015]/10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
