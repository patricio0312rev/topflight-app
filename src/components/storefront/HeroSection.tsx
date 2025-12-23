"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">
                Premium Quality Supplements
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Fuel Your{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Discover premium supplements backed by science. Build muscle,
              boost energy, and achieve your fitness goals with our carefully
              curated selection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                98%
              </div>
              <div className="text-sm text-slate-600">
                Customer Satisfaction
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                50K+
              </div>
              <div className="text-sm text-slate-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                100+
              </div>
              <div className="text-sm text-slate-600">Premium Products</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
