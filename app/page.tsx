"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/storefront/HeroSection";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { FAQSection } from "@/components/storefront/FAQSection";
import { getBestSellers } from "@/lib/data/products";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const bestSellers = getBestSellers();

  return (
    <MainLayout>
      <HeroSection />

      {/* Best Sellers Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">
                  Top Picks
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Best Sellers</h2>
            </div>
          </div>
          <ProductCarousel products={bestSellers} />

          <div className="flex justify-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group font-semibold"
            >
              <Link href="/products">
                See all products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div id="faq">
        <FAQSection />
      </div>
    </MainLayout>
  );
}
