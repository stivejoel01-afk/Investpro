'use client'

import Header from './components/Header'
import Footer from './components/Footer'
import Link from 'next/link'
import { FiTrendingUp, FiLock, FiUsers, FiAward } from 'react-icons/fi'

export default function Home() {
  const stats = [
    { label: 'Investisseurs actifs', value: '5,230+' },
    { label: 'Capital investi', value: '250M FCFA' },
    { label: 'Revenus distribués', value: '45M FCFA' },
    { label: 'Taux de satisfaction', value: '98%' },
  ]

  const features = [
    {
      icon: <FiTrendingUp size={32} />,
      title: 'Rendements Attractifs',
      description: 'Gagnez jusqu\'à 1500 FCFA par jour avec nos plans d\'investissement',
    },
    {
      icon: <FiLock size={32} />,
      title: 'Plateforme Sécurisée',
      description: 'Vos données et votre argent sont protégés par les dernières technologies',
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Gagnez en Parrainant',
      description: 'Parrainez vos amis et gagnez 500 FCFA pour chaque ami inscrit',
    },
    {
      icon: <FiAward size={32} />,
      title: 'Support 24/7',
      description: 'Notre équipe est disponible pour vous aider à tout moment',
    },
  ]

  const testimonials = [
    {
      name: 'Kofi Mensah',
      location: 'Accra, Ghana',
      text: 'J\'ai investi 10,000 FCFA et j\'ai gagné plus de 30,000 FCFA en revenus',
      rating: 5,
    },
    {
      name: 'Aïssatou Ndiaye',
      location: 'Dakar, Sénégal',
      text: 'Plateforme fiable et sécurisée. Je recommande vivement !',
      rating: 5,
    },
    {
      name: 'Kwesi Boateng',
      location: 'Kumasi, Ghana',
      text: 'Les retraits sont rapides et je gagne beaucoup en parrainant',
      rating: 5,
    },
  ]

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Investissez Intelligemment avec <span className="text-secondary">InvestPro</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Gagnez des revenus passifs tous les jours. Plateforme sécurisée, transparente et fiable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="btn-secondary inline-block text-center">
                  Commencer maintenant
                </Link>
                <Link href="/plans" className="btn-outline inline-block text-center">
                  Voir les plans
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-80 bg-gradient-to-br from-secondary to-emerald-700 rounded-2xl shadow-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-lightbg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Pourquoi choisir InvestPro ?</h2>
            <p className="text-xl text-gray-600">Tous les outils dont vous avez besoin pour investir en toute confiance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8">
                <div className="text-secondary mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Ce que nos investisseurs disent</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">\"${testimonial.text}\"</p>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer votre voyage d\'investissement ?</h2>
          <p className="text-xl text-gray-300 mb-8">Inscrivez-vous aujourd\'hui et obtenez un bonus de bienvenue</p>
          <Link href="/signup" className="btn-secondary inline-block">
            S\'inscrire gratuitement
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
