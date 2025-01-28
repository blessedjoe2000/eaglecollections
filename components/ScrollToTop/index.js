"use client";

import { useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ScrollToTop() {
  useEffect(() => {
    // Get the button element
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Show button when user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollToTopButton?.classList.remove("hidden");
      } else {
        scrollToTopButton?.classList.add("hidden");
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Scroll to top on button click
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    scrollToTopButton?.addEventListener("click", handleClick);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollToTopButton?.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <button
      id="scrollToTop"
      className="fixed bottom-5 right-5 bg-sharp-pink text-white p-3 shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 hidden z-100"
    >
      <ArrowUpwardIcon />
    </button>
  );
}
