import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartContextProvider } from "@/components/providers/CartContext/CartContext";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";
import { SearchProvider } from "@/components/providers/SearchProvider/SearchProvider";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/providers/ThemeProvider/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Eagle Collections African Fabrics Store",
  description:
    "online store for all African fashion fabrics attires, jewelries and accessories in Houston, Texas",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en " className="font-robotoFont ">
        <body className="flex flex-col min-h-screen">
          <ThemeProvider>
            <Toaster position="top-right" />
            <AuthProvider>
              <CartContextProvider>
                <SearchProvider>
                  <Navbar />
                  <div className="flex-grow">{children}</div>
                  <ScrollToTop />
                  <Footer />
                </SearchProvider>
              </CartContextProvider>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
