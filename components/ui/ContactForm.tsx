'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setState('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  const inputBase = cn(
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3',
    'text-sm text-white placeholder:text-zinc-500',
    'focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-8 text-center space-y-3">
        <div className="text-3xl">✅</div>
        <p className="text-emerald-400 font-semibold text-base">Message sent successfully!</p>
        <p className="text-zinc-400 text-sm">I&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={() => setState('idle')}
          className="mt-2 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            disabled={state === 'loading'}
            className={inputBase}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            disabled={state === 'loading'}
            className={inputBase}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, opportunity, or just say hi..."
          value={formData.message}
          onChange={handleChange}
          disabled={state === 'loading'}
          className={cn(inputBase, 'resize-none')}
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400 bg-red-950/20 border border-red-500/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        id="contact-submit"
        type="submit"
        disabled={state === 'loading'}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2',
          'rounded-lg px-6 py-3 text-sm font-semibold',
          'bg-[#0d1b35] text-white',
          'border border-cyan-500/40',
          'hover:shadow-[0_0_16px_4px_rgba(6,182,212,0.25)] hover:bg-[#0f2145] hover:border-cyan-400/60',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
        )}
      >
        {state === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
