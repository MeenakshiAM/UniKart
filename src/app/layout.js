import './globals.css'

export const metadata = {
  title: 'UniKart - Student Entrepreneur Marketplace',
  description: 'A unified e-commerce platform for student entrepreneurs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}