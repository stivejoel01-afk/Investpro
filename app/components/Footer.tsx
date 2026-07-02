'use client'

import Link from 'next/link'
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                IP
              </div>
              <span className="font-bold text-lg">InvestPro</span>
            </div>
            <p className="text-gray-300 text-sm">
              La plateforme d'investissement moderne et sécurisée
            </p>
            <div className="flex space-x-4 mt-4">
              <FiFacebook size={20} className="cursor-pointer hover:text-secondary transition" />
              <FiTwitter size={20} className="cursor-pointer hover:text-secondary transition" />
              <FiLinkedin size={20} className="cursor-pointer hover:text-secondary transition" />
              <FiInstagram size={20} className="cursor-pointer hover:text-secondary transition" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produits</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/plans" className="hover:text-secondary transition">Plans d'investissement</Link></li>
              <li><Link href="/dashboard" className="hover:text-secondary transition">Tableau de bord</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Analyse de marché</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-secondary transition">Centre d'aide</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Conditions d'utilisation</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@investpro.com</li>
              <li>Téléphone: +228 XX XXX XXXX</li>
              <li>Adresse: Lomé, Togo</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 InvestPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
