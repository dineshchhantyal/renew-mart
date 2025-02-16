"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, ShoppingBag } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent dark:from-green-900/20" />

      <div className="container mx-auto px-4 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h4
            className="text-green-600 dark:text-green-400 font-semibold ring-1 ring-green-600 dark:ring-green-400 rounded-full px-4 py-1 inline-block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            stats presented are our goals
          </motion.h4>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Save Money, <br />
            <span className="text-green-600 dark:text-green-400">
              Reduce Waste
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join our marketplace for near-expiry goods and make a difference
            while saving up to 70% on quality products.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/sell"
              className="group px-8 py-4 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-all flex items-center gap-2"
            >
              Start Selling
              <ShoppingBag className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/buy/new"
              className="group px-8 py-4 border-2 border-green-600 text-green-600 dark:text-green-400 font-bold rounded-full hover:bg-green-600 hover:text-white transition-all flex items-center gap-2"
            >
              Browse Products
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Leaf className="text-green-600" />
              <span>2+ tons waste reduced</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-green-600" />
              <span>500+ active users</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
