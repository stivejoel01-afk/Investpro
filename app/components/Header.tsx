'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white">
              IP
            </div>
            <span className="hidden sm:inline text-primary">InvestPro</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary transition">
              Accueil
            </Link>
            <Link href="/plans" className="text-gray-600 hover:text-primary transition">
              Plans
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition">
              À propos
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="btn-outline">
              Connexion
            </Link>
            <Link href="/signup" className="btn-primary">
              S'inscrire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Accueil
            </Link>
            <Link href="/plans" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Plans
            </Link>
            <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              À propos
            </Link>
            <div className="flex flex-col space-y-2 px-4 pt-4">
              <Link href="/login" className="btn-outline text-center">
                Connexion
              </Link>
              <Link href="/signup" className="btn-primary text-center">
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
