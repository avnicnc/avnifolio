"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "New Project Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    // Simulate real network submission with delightful UX feedback
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 text-center animate-fade-in">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
        <p className="text-zinc-400 text-sm max-w-sm mx-auto mb-6">
          Thank you for reaching out, <span className="text-zinc-200 font-medium">{formData.name}</span>! I&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => {
            setFormData({ name: "", email: "", subject: "New Project Inquiry", message: "" });
            setStatus("idle");
          }}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="contact-name">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="contact-email">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="contact-subject">
          Subject / Project Type
        </label>
        <select
          id="contact-subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
        >
          <option value="New Project Inquiry">New Project Inquiry</option>
          <option value="Full-time / Contract Role">Full-time / Contract Role</option>
          <option value="Consulting & Architecture">Consulting & Architecture</option>
          <option value="General Conversation">Saying Hello</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me a bit about your idea, timeline, or scope..."
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all disabled:opacity-60 active:scale-[0.99]"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
