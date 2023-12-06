import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "../components/providers/TanstackProvider/TanstackProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartContextProvider } from "@/components/providers/CartContext/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en " className="bg-light-grey">
      <body className={inter.className}>
        <TanstackProvider>
          <CartContextProvider>
            <Navbar />
            {children}
            <Footer />
          </CartContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
