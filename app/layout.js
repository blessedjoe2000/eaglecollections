import "./globals.css";
import TanstackProvider from "../components/providers/TanstackProvider/TanstackProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartContextProvider } from "@/components/providers/CartContext/CartContext";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";
import { SearchProvider } from "@/components/providers/SearchProvider/SearchProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Eagle Collection Store Admin",
  description:
    "online store for all African fashion attires, jewelries and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en " className="bg-light-grey font-muktaFont text-black/60">
      <body className="">
        <Toaster position="top-right" />
        <TanstackProvider>
          <AuthProvider>
            <CartContextProvider>
              <SearchProvider>
                <Navbar />
                {children}
                <Footer />
              </SearchProvider>
            </CartContextProvider>
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
