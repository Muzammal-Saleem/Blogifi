import React from 'react'
import {Link} from 'react-router-dom'
import Logo  from '../Logo'

function Footer() {
  const footerLinks = [
    { label: "Features", to: "/" },
    { label: "Pricing", to: "/" },
    { label: "Community", to: "/" },
    { label: "Press Kit", to: "/" },
  ]

  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo size="text-4xl" />
            <p className="mt-2 text-sm text-slate-400">
              Crafted stories, curated ideas. Blogifi is your daily ritual for thoughtful publishing.
            </p>
          </div>
          <div className="flex gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-slate-300 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Blogifi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer