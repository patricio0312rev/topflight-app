"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();
  const pathname = usePathname();

  const isProviderPortal = pathname?.startsWith("/provider");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;

    if (latest > previous && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setIsScrolled(latest > 50);
    setLastScrollY(latest);
  });

  const navigation = isProviderPortal
    ? [
        { name: "Dashboard", href: "/provider" },
        { name: "Products", href: "/provider/products" },
        { name: "Orders", href: "/provider/orders" },
        { name: "Analytics", href: "/provider/analytics" },
      ]
    : [
        { name: "Shop", href: "/products" },
        { name: "Categories", href: "/categories" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={isProviderPortal ? "/provider" : "/"}
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {isProviderPortal ? "Provider Portal" : "SupplementStore"}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={`relative ${
                    pathname === item.href
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : ""
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {!isProviderPortal ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                </motion.div>
                <Link href="/provider" className="hidden md:block">
                  <Button variant="outline" size="sm">
                    Provider Portal
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
                <Link href="/" className="hidden md:block">
                  <Button variant="outline" size="sm">
                    Storefront
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          pathname === item.href
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Link href={isProviderPortal ? "/" : "/provider"}>
                      <Button variant="outline" className="w-full">
                        {isProviderPortal
                          ? "Go to Storefront"
                          : "Provider Portal"}
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
