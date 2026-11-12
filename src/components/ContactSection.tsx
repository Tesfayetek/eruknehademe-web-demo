import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              INQUIRIES & COLLABORATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Connect With Erukneh Ademe
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Interested in commissioning a custom web system, mobile prototype, or enterprise application? Get in touch.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">Direct Email</div>
                <a href="mailto:contact@eruknehademe.com" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                  contact@eruknehademe.com
                </a>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">Phone & Telegram</div>
                <div className="font-semibold text-white">+251 91 100 0000</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">Headquarters</div>
                <div className="font-semibold text-white">Addis Ababa, Ethiopia</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sandbox Communication Policy</span>
            </div>
            <p className="text-[11px]">
              In compliance with demonstration prototype security guidelines, real external email sending is disabled in this public demo environment. Submissions are safely logged to sandbox state.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Inquiry Received (Demo Sandbox)</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for testing the contact submission flow. Your simulated message for <strong>"{formData.subject || 'Project Inquiry'}"</strong> has been logged into the local demo environment.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-white mb-2">Send an Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dawit Kassa"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dawit@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Subject / Project Scope</label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Enterprise HRMS Pilot or Custom Web Application"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Message Details</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your technical specifications, timeline, or prototype testing questions..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-cyan-950"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Simulated Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
