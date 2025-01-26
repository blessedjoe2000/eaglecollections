"use client";

import GoogleMap from "@/components/GoogleMap/GoogleMap";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Container } from "@mui/system";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SocialMedia from "@/components/SocialMedia";
import { Button } from "@mui/material";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  const handleContactUs = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      return toast.error("Name is required. Please enter first and last name", {
        style: {
          padding: "16px",
          color: "#006BFF",
        },
        iconTheme: {
          primary: "#006BFF",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!email) {
      return toast.error("Email is required. Please enter email", {
        style: {
          padding: "16px",
          color: "#006BFF",
        },
        iconTheme: {
          primary: "#006BFF",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!mobile) {
      return toast.error(
        "Phone number is required. Please enter phone number",
        {
          style: {
            padding: "16px",
            color: "#006BFF",
          },
          iconTheme: {
            primary: "#006BFF",
            secondary: "#FFFAEE",
          },
        }
      );
    }

    if (!message) {
      return toast.error("Message is required, Please enter a message", {
        style: {
          padding: "16px",
          color: "#006BFF",
        },
        iconTheme: {
          primary: "#006BFF",
          secondary: "#FFFAEE",
        },
      });
    }

    const response = await axios.post("/api/send", {
      firstName,
      lastName,
      email,
      mobile,
      message,
    });

    if (response.status === 200) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setMessage("");
      toast.success(`Hi ${firstName}, message sent successfully`, {
        style: {
          padding: "16px",
          color: "#006BFF",
        },
        iconTheme: {
          primary: "#006BFF",
          secondary: "#FFFAEE",
        },
      });
    }
  };
  return (
    <div className="  my-10 ">
      <Container>
        <h1 className="text-center ">Contact Us</h1>

        <div
          className="sm:flex justify-around items-center gap-5 py-5 bg-dark-blue text-white my-5"
          data-aos="fade-up"
        >
          <div
            className="flex flex-col justify-center items-center gap-2"
            data-aos="fade-right"
          >
            <div className="flex gap-2 items-center">
              <Box sx={{ color: "#f72585" }}>
                <PhoneIphoneIcon />
              </Box>
              <p className="text-lg">210-310-9644</p>
            </div>
            <div className="flex gap-2 items-center">
              <Box sx={{ color: "#f72585" }}>
                <MailOutlinedIcon />
              </Box>

              <p className="text-lg">info@eaglecollectionstore.com</p>
            </div>
            <div className="flex gap-2 items-center">
              <Box sx={{ color: "#f72585" }}>
                <LocationOnOutlinedIcon />
              </Box>
              <div className="flex flex-col">
                <p className="text-lg">11329 Bissonnet Street,</p>
                <p className="text-lg ">Houston, TX 77099</p>
              </div>
            </div>
          </div>
          <div data-aos="fade-left">
            <SocialMedia />
          </div>
        </div>
        <div className="bg-dark-blue text-white my-20 " data-aos="fade-up">
          <h2 className="text-center pt-10">Send Us A Message</h2>
          <form onSubmit={handleContactUs} className="p-10 pt-5">
            <div className="sm:flex justify-between gap-2">
              <div className="w-full">
                <label htmlFor="firstName" name="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" name="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:flex justify-between gap-2">
              <div className="w-full">
                <label htmlFor="email" name="email">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="mobile" name="mobile">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" name="message">
                What can we help you with?
              </label>
            </div>
            <textarea
              name="message"
              id=""
              cols="10"
              rows="5"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-3 py-1 bg-sharp-pink rounded-md text-white text-lg w-full"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </Container>
      <div className="bg-dark-blue p-5" data-aos="fade-up">
        <h2 className="text-center py-5 ">Find us on Google</h2>
        <GoogleMap />
      </div>
    </div>
  );
}
