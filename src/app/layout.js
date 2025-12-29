import "./globals.css";

export const metadata = {
  title: "UniKart",
  description: "Campus marketplace platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
