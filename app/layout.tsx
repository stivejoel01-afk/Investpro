import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvestPro - Plateforme d\'Investissement',
  description: 'Plateforme moderne et sécurisée pour investir intelligemment',
  keywords: 'investissement, trading, revenus passifs, plateforme financière',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
