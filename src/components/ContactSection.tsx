import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { generateDirectContactWhatsAppUrl } from '../utils/whatsapp';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Earbuds',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `Assalam-o-Alaikum Azeem Trader,\nMy name is ${formData.name || 'a customer'}.\nPhone: ${formData.phone || 'N/A'}\nInterested In: ${formData.category}\nMessage: ${formData.message || 'I want to know about availability and latest prices.'}`;
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contact Azeem Trader
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Have questions about compatibility, bulk orders, or shop visits? Reach out to owner Azeem Ali directly.
          </p>
        </div>

        {/* 4 Dedicated Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* Call Button Card */}
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/60 hover:bg-slate-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Direct Call
              </span>
              <h3 className="font-display text-base font-bold text-white mt-1">
                {STORE_INFO.phone}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Call Azeem Ali directly for immediate inquiry
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span>Call Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* WhatsApp Button Card */}
          <a
            href={generateDirectContactWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/60 hover:bg-slate-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                WhatsApp Chat
              </span>
              <h3 className="font-display text-base font-bold text-white mt-1">
                0319 5411421
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pre-filled messages, photos & fast replies
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Open WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Email Button Card */}
          <a
            href={`mailto:${STORE_INFO.email}?subject=Inquiry%20regarding%20Mobile%20Accessories`}
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-sky-500/60 hover:bg-slate-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-600/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Email Us
              </span>
              <h3 className="font-display text-base font-bold text-white mt-1 break-all">
                {STORE_INFO.email}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                For official inquiries and wholesale catalogs
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-sky-400 font-semibold">
              <span>Send Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Google Maps Button Card */}
          <a
            href={STORE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-red-500/60 hover:bg-slate-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Google Maps Location
              </span>
              <h3 className="font-display text-base font-bold text-white mt-1">
                Civil Colony, Kohat Rd
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                IV/6 Civil Colony, Kohat Road, Peshawar
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-red-400 font-semibold">
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

        {/* Detailed Info & Quick WhatsApp Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Business Details Panel */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-xl font-bold text-white">
              Store Directory
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-xs block">Business Name</span>
                <span className="text-white font-bold text-base mt-0.5 block">{STORE_INFO.name}</span>
                <span className="text-blue-400 text-xs">Mobile Accessories Store</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-xs block">Owner & Proprietor</span>
                <span className="text-white font-semibold text-sm mt-0.5 block">{STORE_INFO.owner}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs block">Phone & WhatsApp</span>
                  <span className="text-white font-semibold text-sm mt-0.5 block">{STORE_INFO.phone}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-xs block">Complete Store Address</span>
                <p className="text-white font-medium text-sm mt-0.5">
                  {STORE_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Inquiry / WhatsApp Dispatch Form */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Send Quick Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Fill in your details below and click &quot;Dispatch to WhatsApp&quot; to instantly chat with Azeem Ali.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Khan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Mobile / WhatsApp
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest-category" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Interested Category
                </label>
                <select
                  id="interest-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Wireless Earbuds">Wireless Earbuds</option>
                  <option value="Power Banks">Power Banks</option>
                  <option value="Fast Chargers & Adapters">Fast Chargers & Adapters</option>
                  <option value="USB & Fast Charging Cables">USB & Fast Charging Cables</option>
                  <option value="Bluetooth Speakers">Bluetooth Speakers</option>
                  <option value="Phone Holders & Mounts">Phone Holders & Mounts</option>
                  <option value="Mobile Covers & Cases">Mobile Covers & Cases</option>
                  <option value="9D Screen Protectors">9D Screen Protectors</option>
                  <option value="Hands-Free / Earphones">Hands-Free / Earphones</option>
                  <option value="Other Mobile Accessories">Other Mobile Accessories</option>
                </select>
              </div>

              <div>
                <label htmlFor="customer-inquiry-notes" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Requirement or Inquiry
                </label>
                <textarea
                  id="customer-inquiry-notes"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what accessory or phone model you need help with..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Directly via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
