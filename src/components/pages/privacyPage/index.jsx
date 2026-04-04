import { useState } from "react";
import {
  HelpCircle, MessageCircle, Lock, FileText,
  ChevronDown, Mail, Phone, ArrowRight,
  BookOpen, ShieldCheck, AlertCircle, CheckCircle2,
  Clock, UserCheck, Database, Eye,
} from "lucide-react";

// ─────────────────────────────────────────────
//  Shared layout wrapper
// ─────────────────────────────────────────────
function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {children}
      </div>
    </div>
  );
}

// Shared page header
function PageHeader({ icon: Icon, eyebrow, title, subtitle, color = "blue" }) {
  const colors = {
    blue:   { wrap: "bg-blue-50 border-blue-100",   icon: "text-blue-600"   },
    green:  { wrap: "bg-emerald-50 border-emerald-100", icon: "text-emerald-600" },
    violet: { wrap: "bg-violet-50 border-violet-100", icon: "text-violet-600" },
    amber:  { wrap: "bg-amber-50 border-amber-100",  icon: "text-amber-600"  },
  };
  const c = colors[color];
  return (
    <div className="mb-12">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${c.wrap} ${c.icon}`}>
        <Icon size={13} />
        {eyebrow}
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
        {title}
      </h1>
      <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl">
        {subtitle}
      </p>
    </div>
  );
}

// Divider with label
function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-slate-200" />
      {label && <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>}
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}

// ─────────────────────────────────────────────
//  HELP CENTER PAGE
// ─────────────────────────────────────────────
const helpTopics = [
  {
    icon: UserCheck,
    color: "bg-blue-50 text-blue-600",
    title: "Login & Account",
    desc: "Having trouble signing in? Make sure your credentials are correct and your internet connection is stable. You can reset your password from the login screen.",
    link: "Reset password →",
  },
  {
    icon: Clock,
    color: "bg-emerald-50 text-emerald-600",
    title: "Appointments",
    desc: "For any issues with booking, rescheduling, or cancelling appointments, you can manage everything from your patient dashboard or contact our support team.",
    link: "Go to dashboard →",
  },
  {
    icon: MessageCircle,
    color: "bg-violet-50 text-violet-600",
    title: "Technical Support",
    desc: "Experiencing a bug or something not working as expected? Reach out to our team and we'll get it sorted within 24 hours on business days.",
    link: "Contact support →",
  },
];

export default function HelpCenterPage() {
  return (
    <PageWrapper>
      <PageHeader
        icon={HelpCircle}
        eyebrow="Support"
        title="How can we help you?"
        subtitle="Browse common topics below or reach out to our team directly — we're here to make things work."
        color="blue"
      />

      {/* Topic cards */}
      <div className="flex flex-col gap-4 mb-12">
        {helpTopics.map(({ icon: Icon, color, title, desc, link }) => (
          <div
            key={title}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`p-3 rounded-xl shrink-0 ${color}`}>
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-800 mb-1.5 text-base">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                {link} <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Divider label="Still need help?" />

      {/* Contact bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Mail size={18} className="text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Email us</p>
            <p className="text-sm font-semibold text-slate-800">support@healthbridge.pk</p>
          </div>
        </div>
        <div className="w-px bg-slate-100 hidden sm:block" />
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Phone size={18} className="text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Call us</p>
            <p className="text-sm font-semibold text-slate-800">+92 300 0000000</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ─────────────────────────────────────────────
//  FAQ PAGE
// ─────────────────────────────────────────────
const faqItems = [
  {
    q: "How do I book an appointment?",
    a: "Browse our list of verified doctors, pick a specialist that fits your needs, choose an available time slot, and confirm your booking. You'll get an email confirmation right away.",
  },
  {
    q: "Can I cancel or reschedule an appointment?",
    a: "Yes — you can cancel or reschedule any appointment from your patient dashboard, as long as it's before the scheduled time. Cancellations made less than 2 hours before may not be refundable.",
  },
  {
    q: "Is my personal data safe?",
    a: "Absolutely. HealthBridge uses industry-standard encryption and secure authentication to protect your information. We never share your data without your consent.",
  },
  {
    q: "Are video consultations available?",
    a: "Yes, many of our doctors offer online video consultations. Look for the 'Video consult' tag on the doctor's profile when booking.",
  },
  {
    q: "How do I find a doctor by specialty?",
    a: "Use the filter sidebar on the Doctors page to search by specialization, location, consultation type, and more.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We support bank transfers, JazzCash, Easypaisa, and card payments. Payment is collected at the time of booking.",
  },
];

function FAQAccordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        open ? "border-blue-200 bg-blue-50/40" : "border-slate-100 bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 cursor-pointer"
      >
        <span className={`text-sm font-bold transition-colors ${open ? "text-blue-700" : "text-slate-800"}`}>
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-blue-500" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  return (
    <PageWrapper>
      <PageHeader
        icon={BookOpen}
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Quick answers to questions we hear most often. Can't find what you're looking for? Reach out to our support team."
        color="violet"
      />

      <div className="flex flex-col gap-3">
        {faqItems.map((item) => (
          <FAQAccordion key={item.q} q={item.q} a={item.a} />
        ))}
      </div>

      <Divider />

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-center">
        <p className="text-sm font-semibold text-slate-600 mb-3">
          Still have a question we didn't answer?
        </p>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
          <MessageCircle size={15} />
          Contact Support
        </button>
      </div>
    </PageWrapper>
  );
}

// ─────────────────────────────────────────────
//  PRIVACY POLICY PAGE
// ─────────────────────────────────────────────
const privacySections = [
  {
    icon: Database,
    title: "What we collect",
    body: "We collect the information you provide when creating an account — your name, email, phone number, and any medical or profile details you choose to share. We also collect usage data to improve the platform.",
  },
  {
    icon: Eye,
    title: "How we use your data",
    body: "Your personal information is used solely for delivering healthcare services — booking appointments, communicating with doctors, and managing your account. We do not use your data for advertising.",
  },
  {
    icon: ShieldCheck,
    title: "Data protection",
    body: "All data is encrypted in transit and at rest. We follow industry-standard security practices to ensure your medical and personal information remains private and protected.",
  },
  {
    icon: Lock,
    title: "Third-party sharing",
    body: "HealthBridge does not sell or share your personal data with third parties without your explicit consent, except where required by law or to provide the core services you have requested.",
  },
  {
    icon: UserCheck,
    title: "Your rights",
    body: "You have the right to access, update, or delete your personal data at any time. To exercise these rights, visit your account settings or contact our support team directly.",
  },
];

export function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <PageHeader
        icon={Lock}
        eyebrow="Privacy Policy"
        title="Your privacy matters to us"
        subtitle="We're committed to being transparent about how we collect, use, and protect your information. Last updated June 2025."
        color="green"
      />

      <div className="flex flex-col gap-6">
        {privacySections.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className="flex items-start gap-5">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Icon size={16} className="text-emerald-600" />
              </div>
              {i < privacySections.length - 1 && (
                <div className="w-px flex-1 bg-slate-100" style={{ minHeight: 24 }} />
              )}
            </div>
            <div className="pb-6">
              <h3 className="font-bold text-slate-800 mb-1.5 text-base">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-800 font-medium leading-relaxed">
          By using HealthBridge, you agree to this Privacy Policy. If you have any concerns, contact us at{" "}
          <span className="font-bold">privacy@healthbridge.pk</span>.
        </p>
      </div>
    </PageWrapper>
  );
}

// ─────────────────────────────────────────────
//  TERMS & CONDITIONS PAGE
// ─────────────────────────────────────────────
const termsSections = [
  {
    title: "Account registration",
    body: "Users must provide accurate, complete, and up-to-date information when registering. Accounts found to contain false information may be suspended without notice.",
  },
  {
    title: "Booking & appointments",
    body: "Appointments are subject to doctor availability. HealthBridge acts as a platform to connect patients with healthcare providers and is not directly responsible for medical advice or outcomes.",
  },
  {
    title: "Cancellation policy",
    body: "Appointments can be cancelled or rescheduled through the patient dashboard. Cancellations made less than 2 hours before a scheduled appointment may be non-refundable at the doctor's discretion.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to misuse the platform, impersonate others, upload harmful content, or engage in any activity that disrupts services. Violations may result in immediate account suspension.",
  },
  {
    title: "Limitation of liability",
    body: "HealthBridge provides a connection platform and is not liable for the medical services provided by doctors. Always consult a qualified professional for medical decisions.",
  },
  {
    title: "Changes to terms",
    body: "We may update these Terms from time to time. Continued use of the platform after updates constitutes your acceptance of the revised Terms.",
  },
];

export function TermsPage() {
  return (
    <PageWrapper>
      <PageHeader
        icon={FileText}
        eyebrow="Terms & Conditions"
        title="Terms of use"
        subtitle="Please read these terms carefully before using HealthBridge. By creating an account you agree to be bound by them. Last updated June 2025."
        color="amber"
      />

      {/* Notice banner */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10">
        <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 font-medium leading-relaxed">
          These terms constitute a legal agreement between you and HealthBridge. If you disagree with any part, please do not use our services.
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-1">
        {termsSections.map(({ title, body }, i) => (
          <div key={title} className="group">
            <div className="flex items-start gap-4 py-5">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1.5 text-base">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            </div>
            {i < termsSections.length - 1 && (
              <div className="ml-11 h-px bg-slate-100" />
            )}
          </div>
        ))}
      </div>

      <Divider />

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-800 text-sm mb-1">Questions about our terms?</p>
          <p className="text-slate-400 text-sm">We're happy to clarify anything.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors shrink-0">
          <Mail size={14} />
          Get in touch
        </button>
      </div>
    </PageWrapper>
  );
}