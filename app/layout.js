import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "../components/providers/TanstackProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <Navbar />
          {children}
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
