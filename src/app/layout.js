import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PIGSEI",
  description: "H. Ayuntamiento Constitucional de Centro",
};

// icon:'images/logo/favicon.png',

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
    <body className={inter.className}>
        <link rel="icon" href="/favicon.png" sizes="any"/>
        {/*<Toaster position="top-center "/>*/}
        {children}
    </body>
    </html>
  );
}
