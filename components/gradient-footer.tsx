"use client";

import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import GridDistortion from "./granient";

export function GradientFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-black">
      {/* Aurora gradient effect - flowing upward from bottom */}
      <div className="absolute inset-0 z-0 transform scale-y-[-1] origin-bottom pointer-events-none opacity-95"></div>

      {/* Solid black background fallback */}
      <div className="absolute inset-0 z-1 bg-black/30" />

      {/* Content wrapper */}
      <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Top section - Logo and description */}
          <div className="mb-12 pb-12 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold text-white">Designify</span>
            </div>
            <p className="text-gray-300 max-w-md text-sm md:text-base">
              Premium design services to elevate your brand and grow your
              business.
            </p>
          </div>

          {/* Middle section - Links and Social */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Links Column 1 */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.slice(3).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section - Copyright and divider */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {currentYear} Designify. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient blur elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -z-10" />
    </footer>
  );
}
