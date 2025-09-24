"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Github,
} from "lucide-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    // { icon: Instagram, href: "#", label: "Instagram", name: "IG" },
    // { icon: Twitter, href: "#", label: "Twitter", name: "TW" },
    // { icon: Facebook, href: "#", label: "Facebook", name: "FB" },
    {
      icon: Github,
      href: "https://github.com/AnggaaIs/picapop",
      label: "GitHub",
      name: "GH",
    },
  ];

  const quickLinks = [
    { href: "/templates", label: "Templates" },
    { href: "/about", label: "About Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-use", label: "Terms of Use" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
      <div className="absolute top-0 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-green-400/8 to-cyan-400/8 rounded-full blur-3xl"></div>

      <div className="relative">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {Camera ? (
                    <Camera className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold text-xs">📷</span>
                  )}
                </div>
                <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  PicaPop
                </span>
              </Link>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Wujudkan kreativitas Anda dengan template foto yang menarik.
                Pilih template, ambil foto, dan bagikan hasilnya dalam sekejap!
              </p>

              {/* Features Highlights */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">100+ Template Premium</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Download Gratis Tanpa Watermark
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Sesi Foto Real-time</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group text-xs font-bold"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-5 h-5" />
                      ) : (
                        <span>{social.name}</span>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-emerald-500 transition-colors duration-300"></div>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-300 text-sm">
                  {Mail ? (
                    <Mail className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                      ✉️
                    </span>
                  )}
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contact@picapop.my.id"
                      className="hover:text-emerald-400 transition-colors duration-300"
                    >
                      contact@picapop.my.id
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300 text-sm">
                  {MapPin ? (
                    <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="text-teal-400 mt-0.5 flex-shrink-0">
                      📍
                    </span>
                  )}
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Indonesia, Bandar Lampung</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300 text-sm">
                  {Heart ? (
                    <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="text-pink-400 mt-0.5 flex-shrink-0">
                      ❤️
                    </span>
                  )}
                  <div>
                    <p className="font-medium">Made with</p>
                    <p>Love & Dedication</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          {/* <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-white font-semibold text-xl mb-4">
                Stay Updated with PicaPop
              </h3>
              <p className="text-gray-300 mb-6">
                Dapatkan template terbaru dan tips fotografi langsung di inbox Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors duration-300"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-gray-700 bg-gray-900/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © 2025{" "}
                <a
                  href="https://lazypeople.my.id"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LazyPeople Organization
                </a>
                . All Rights Reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  Made with <Heart className="w-4 h-4 text-pink-400" /> in
                  Indonesia
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
