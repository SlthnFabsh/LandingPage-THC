'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Building2, ArrowRight, ShieldCheck, Hotel, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

interface SolutionCard {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  description: string;
  features: string[];
}

const solutionCards: SolutionCard[] = [
  {
    title: 'Hospitality Solutions',
    badge: 'Hotels, Resorts & Tourism',
    icon: Hotel,
    href: '/layanan/solusi/solusi-terkelola/hospitality-solutions',
    description:
      'Comprehensive digital infrastructure tailored for the modern hospitality sector, powering automated room reservation systems, guest big-data analytics, and intelligent smart-room IoT controls that allow hotel guests to manage room lighting, temperature, and entertainment effortlessly via touch devices.',
    features: [
      'Smart Room IoT & IPTV Integration',
      'High-Density Guest Wi-Fi & Bandwidth Shaping',
      'PMS & Automated Booking System Integration',
    ],
  },
  {
    title: 'Education Solutions',
    badge: 'Universities & K-12 Schools',
    icon: GraduationCap,
    href: '/layanan/solusi/solusi-terkelola/education-solutions',
    description:
      'Empowering educational institutions with high-speed dedicated internet and campus-wide managed Wi-Fi, seamlessly integrating learning management systems (LMS) and school administration platforms with student smart devices for an interactive, modern digital campus.',
    features: [
      'Campus-Wide High-Density Wireless',
      'LMS & Smart Classroom Digital Support',
      'Safe Browsing & Content Filtering Policies',
    ],
  },
];

export default function ManagedSolutions() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Managed Solutions
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Industry-Specific Digital Ecosystems
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            Understanding dynamic and diverse enterprise requirements, we deliver tailored end-to-end
            technology solutions to accelerate your industry transformation: System Integration,
            Enterprise CCTV Surveillance, High-Density Commercial Hotspots, and Interactive IPTV.
          </p>
        </motion.div>

        {/* 2 Industry Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                {...reveal(index * 0.1)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-xs transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.85] text-slate-600">
                    {card.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Sparkles className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-8 border-t border-slate-100 pt-4">
                  <Link
                    href={card.href ?? '/#faq'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 transition-colors group-hover:text-brand-700"
                  >
                    <span>Request Custom Proposal</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
