"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Grid,
  Flex,
  Heading,
  Text,
  TextField,
  TextArea,
  Button,
} from "@radix-ui/themes";
import { RiPhoneFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";

import Container from "../Container";

const ContactMapSection = () => {
  // --- Form & Status States ---
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      // Combines phone number into message context payload
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: `Phone: ${formData.phone || "N/A"}\n\n${formData.message}`,
      };

      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setResponseMsg(
          data.message || "Your message has been sent successfully!",
        );
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      // log the error for debugging
      // eslint-disable-next-line no-console
      console.error(err);
      setResponseMsg("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Container>
      <Grid
        columns={{ initial: "1", md: "2" }}
        gap={{ initial: "3", md: "4" }}
        width="auto"
      >
        {/* -----------  Contact Info and Map Image */}
        <Box className="bg-gray-100 rounded-sm px-8 py-8">
          <Flex direction="column" gap="4">
            {/*================   Contact Info =============*/}
            <Box>
              <Heading size={{ initial: "1", md: "2", lg: "4" }}>
                {" "}
                Contact Information
              </Heading>
              <div className="flex flex-col gap-2">
                <Text size="2">
                  Have Some Questions?{" "}
                  <span className="text-brand_1-700">
                    We&apos;re Here to Help!
                  </span>
                </Text>
                <Text>
                  You can always feel free to contact us for your wastewater
                  services at the address and contact below.
                </Text>
                <Text
                  size={{ initial: "2", md: "4" }}
                  className="text-brand_1-700 font-bold"
                >
                  Accra Metro Sewerage Unit
                </Text>
              </div>
              {/* -- contact info box -- */}
              <Flex
                gap="3"
                direction={{ initial: "column", md: "row" }}
                justify={{ initial: "start", md: "center" }}
                mt="2"
              >
                <Box
                  as="div"
                  width="auto"
                  height="auto"
                  className="border border-brand_1-100 box-border shadow-md p-4"
                >
                  {/* phone icon and numbers */}
                  <div className="flex flex-col items-center gap-2">
                    <RiPhoneFill className="text-brand_1-700 text-2xl" />
                    <div className="text-sm text-center">
                      <p>+233 302 123 456</p>
                      <p>+233 302 654 321</p>
                    </div>
                  </div>
                </Box>
                <Box
                  as="div"
                  width="auto"
                  height="auto"
                  className="border border-brand_1-100 box-border shadow-md p-4"
                >
                  {/* email icon and mail */}
                  <div className="flex flex-col items-center gap-2">
                    <MdEmail className="text-brand_1-700 text-2xl" />
                    <div className="text-sm text-center">
                      <p>info@wastewater.com</p>
                    </div>
                  </div>
                </Box>
                <Box
                  as="div"
                  width="auto"
                  height="auto"
                  className="border border-brand_1-100 box-border shadow-md p-4"
                >
                  {/* location icon and address */}
                  <div className="flex flex-col items-center gap-2">
                    <ImLocation2 className="text-brand_1-700 text-2xl" />
                    <div className="text-sm text-center">
                      <p>
                        123 Wastewater Street,
                        <br />
                        Accra{" "}
                      </p>
                    </div>
                  </div>
                </Box>
              </Flex>
            </Box>
            {/*=============== Map Image ============== */}
            <div className="mt-6 flex flex-col gap-4 md:block md:relative">
              {/* The Image */}
              <Image
                src="/assets/contact/accraMap.png"
                alt="Contact Map"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md shadow-md"
              />

              {/* Card 1 */}
              <div className="md:absolute md:top-4 md:left-4 bg-white bg-opacity-90 p-3 rounded-md shadow-lg md:max-w-[200px] lg:max-w-xs ">
                <p className="text-sm text-gray-800">
                  Ring Road West adjacent the Ghana Water Limited District
                  Office and VIP Bus terminal
                </p>
              </div>

              {/* Card 2 */}
              <div className="md:absolute md:top-4 md:right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-lg md:max-w-[180px] lg:max-w-xs ">
                <p className="text-sm text-gray-800">
                  Kwame Nkrumah Circle - Accra
                </p>
              </div>

              {/* Card 3 */}
              <div className="md:absolute md:bottom-4 md:left-4 bg-white bg-opacity-90 p-3 rounded-md shadow-lg md:max-w-[200px] lg:max-w-xs ">
                <p className="text-sm text-gray-800 font-bold">
                  GPS Address: GA-174-4027
                </p>
              </div>
            </div>
          </Flex>
        </Box>

        {/*-- Functional Contact Form  */}
        <Box maxWidth="600px" className="rounded-sm px-6">
          <div className="w-full h-full border border-brand_1-100 box-border shadow-md p-6 rounded-md">
            <Heading size={{ initial: "2", md: "4" }} className="mb-4">
              Send Us a Message
            </Heading>
            <Text className="mb-6">
              Have any questions or inquiries? Fill out the form below and
              we&apos;ll get back to you as soon as possible.
            </Text>

            {/* Response Alerts */}
            {status === "success" && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md text-sm">
                {responseMsg}
              </div>
            )}
            {status === "error" && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-md text-sm">
                {responseMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
              <Flex direction="column" gap="2">
                {/* --Name -- */}
                <Box className="min-w-[200px] lg:w-full">
                  <Text as="label" size="2" weight="medium" className="mb-1">
                    Name
                  </Text>
                  <TextField.Root
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    size={{ initial: "1", md: "2", lg: "3" }}
                    placeholder="Full Name"
                  />
                </Box>
                {/* --Phone -- */}
                <Box className="min-w-[200px] lg:w-full">
                  <Text as="label" size="2" weight="medium" className="mb-1">
                    Phone
                  </Text>
                  <TextField.Root
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    size={{ initial: "1", md: "2", lg: "3" }}
                    placeholder="Phone Number"
                  />
                </Box>
                {/* --Email -- */}
                <Box className="min-w-[200px] lg:w-full">
                  <Text as="label" size="2" weight="medium" className="mb-1">
                    Email
                  </Text>
                  <TextField.Root
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    size={{ initial: "1", md: "2", lg: "3" }}
                    placeholder="Email Address"
                  />
                </Box>
                {/* --Subject -- */}
                <Box className="min-w-[200px] lg:w-full">
                  <Text as="label" size="2" weight="medium" className="mb-1">
                    Subject
                  </Text>
                  <TextField.Root
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    size={{ initial: "1", md: "2", lg: "3" }}
                    placeholder="Subject: Inquiry about services"
                  />
                </Box>
                {/* --Message -- */}
                <Box className="min-w-[200px] lg:w-full">
                  <Text as="label" size="2" weight="medium" className="mb-1">
                    Message
                  </Text>
                  <TextArea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    size={{ initial: "1", md: "2", lg: "3" }}
                    placeholder="Your Message"
                  />
                </Box>
              </Flex>
              <Flex align="center" justify="center" mt="4">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  color="cyan"
                  variant="solid"
                  size="4"
                  className="cursor-pointer"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </Flex>
            </form>
            {/*-- Form fields End here --*/}
          </div>
        </Box>
      </Grid>
    </Container>
  );
};

export default ContactMapSection;
