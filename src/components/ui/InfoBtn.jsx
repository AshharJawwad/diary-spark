"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { FaceGrinning, Info, LoaderCircle, X } from "lucide-react";

export const InfoBtn = React.forwardRef(function InfoBtn(
  { className, variant = "outline", size = "icon", feedbackEndpoint = "/api/feedback", onClick, open, onOpenChange, hideTrigger = false, ...props },
  ref,
) {
  // Open Modal & Active Tab
  const [internalOpen, setInternalOpen] = useState(false);
  const modalOpen = open ?? internalOpen;
  const setModalOpen = (value) => {
    if (open === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  };
  const [active, setActive] = useState("Feedback");

  //   Feedback Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  //   UI Status State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const openFeedbackNew = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) setModalOpen(true);
  };

  const closeFeedbackNew = () => setModalOpen(false);

  //   Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    // Submit feedback and show confirmation only after a successful response.
    try {
      const response = await fetch(feedbackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeSubmitted = () => {
    closeFeedbackNew();
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div
        onClick={closeSubmitted}
        className="fixed flex flex-col inset-0 bg-black/30 backdrop-blur-xs items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col w-full h-full md:w-250 md:h-150 items-center justify-center text-center space-y-8 bg-background dark:bg-muted-foreground px-5 py-6 rounded-lg"
        >
          <div className="flex items-center w-40 h-40 rounded-full bg-emerald-100 text-emerald-500 mb2">
            <FaceGrinning className="w-44 h-44" />
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-400">
            Thank You!
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Your feedback has been successfully submitted. We appreciate your
            insights to make DiarySpark better
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition duration-200 text-sm shadow-sm cursor-pointer"
            >
              Send Another Response
            </button>
            <button
              onClick={closeSubmitted}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition duration-200 text-sm shadow-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!hideTrigger && <Button
        ref={ref}
        variant={variant}
        size={size}
        type="button"
        aria-label="Open feedback and updates"
        onClick={openFeedbackNew}
        className={cn(
          "relative overflow-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
          className,
        )}
        {...props}
      >
        <Info
          aria-hidden="true"
          className={cn(
            "h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out text-gray-500",
          )}
        />
      </Button>}

      {modalOpen && (
        <div
          onClick={closeFeedbackNew}
          className="fixed flex inset-0 bg-black/30 backdrop-blur-xs items-center justify-center z-10"
        >
          {/* Popup Modal for Feedback Form & New Updates Section */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full md:w-250 md:h-150 bg-background p-3 md:rounded-lg text-gray-800 dark:text-white"
          >
            <div className="flex justify-between pb-2">
              <h1 className="text-3xl font-extrabold font-display">
                Feedback & Updates
              </h1>

              {/* Popup Close */}
              <button
                type="button"
                aria-label="Close feedback and updates"
                onClick={closeFeedbackNew}
                className="border-none text-lg cursor-pointer"
              >
                <X className="w-[1.2rem] h-[1.2rem]" />
              </button>
            </div>

            <div className="flex flex-col w-full h-195 md:h-134 border rounded-lg">
              {/* Feedback and Updates tabs */}
              <div className="flex w-full h-9 md:h-10 items-start rounded-t-lg border-b px-4 pt-1.5 gap-x-4">
                <button
                  onClick={() => setActive("Feedback")}
                  className={`text-md font-body font-normal bottom-0 px-4 py-1 cursor-pointer ${active === "Feedback" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
                >
                  Feedback
                </button>
                <button
                  onClick={() => setActive("Updates")}
                  className={`text-md font-body font-normal bottom-0 px-4 py-1 cursor-pointer ${active === "Updates" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
                >
                  Updates
                </button>
              </div>

              {/* Feedback & Updates Tab Pages */}
              <div>
                {/* Feedback Area */}
                {active === "Feedback" && (
                  <div className="dark:bg-muted-foreground p-3 w-full min-h-185.5 md:h-119.5 rounded-b-lg overflow-hidden overflow-y-scroll no-scrollbar">
                    <h3 className="text-2xl font-display font-semibold">
                      Feedback
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name Input */}
                      <div className="mt-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-slate-500 mb-1.5"
                        >
                          Full Name <span className="text-rose-500">*</span>
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-violet-500 transition duration-150 text-sm"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="mt-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-slate-500 mb-1.5"
                        >
                          Email <span className="text-rose-500">*</span>
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-violet-500 transition duration-150 text-sm"
                        />
                      </div>

                      {/* Message Input with Character Count */}
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1 5">
                          <label
                            htmlFor="message"
                            className="block text-sm font-semibold text-slate-500 mb-1.5"
                          >
                            Your Feedback{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <span
                            className={`text-xs ${formData.message.length > 450 ? "text-rose-500 font-medium" : "text-slate-800 dark:text-slate-200"}`}
                          >
                            {formData.message.length}/500
                          </span>
                        </div>

                        <textarea
                          name="message"
                          id="message"
                          required
                          maxLength={500}
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us what you like or what we can improve..."
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-violet-500 transition duration-150 text-sm resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      {error && (
                        <p role="alert" className="text-sm text-rose-500">
                          {error}
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-44 mt-2 py-4 disabled:bg-primary/20 font-semibold font-body rounded-lg active:scale[0.99] transition duration-150 text-sm flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin w-5 h-5 text-white">
                              <LoaderCircle className="opacity-25" />
                            </div>
                          </>
                        ) : (
                          <span>Submit Feedback</span>
                        )}
                      </Button>
                    </form>
                  </div>
                )}

                {/* New Updates Area */}
                {active === "Updates" && (
                  <div className="dark:bg-muted-foreground p-3 w-full min-h-185.5 md:min-h-119.5 rounded-b-lg overflow-hidden overflow-y-scroll no-scrollbar"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
