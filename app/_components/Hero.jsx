"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/sign-up");
  };

  const handleFeatureScroll = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-[#F8F5F2] dark:bg-[#2D2D3A]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="py-9 w-full max-w-2xl">
            <Image
              src="/landing_page_pic.png"
              alt="AI Note Taker demo"
              width={1000}
              height={600}
              className="w-full h-auto object-contain drop-shadow-lg rounded-lg"
              priority
            />
          </div>
        </div>
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2D2D3A] dark:text-[#F8F5F2]">
            Take Smarter Notes with AI
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-[#2D2D3A]/80 dark:text-[#F8F5F2]/80 max-w-3xl mx-auto">
            Write, Organise, and Summarize notes instantly with AI assistance
          </h2>
        </div>
        <div className="flex items-center justify-center gap-6 mt-12">
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                onClick={handleRedirect}
                className="px-6 py-6 dark:bg-dbtn bg-primary rounded-full font-bold text-white hover:bg-secondary dark:hover:bg-secondary dark:text-black"
              >
                Get Started
              </Button>
            </Link>
            <Button
              onClick={handleFeatureScroll}
              className="px-6 py-6 dark:bg-dbtn bg-primary rounded-full font-bold text-white hover:bg-secondary dark:hover:bg-secondary dark:text-black"
            >
              See Features
            </Button>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <Image
            src="/demo.png"
            alt="demo picture"
            width={1000}
            height={800}
            className="rounded-xl shadow-lg border border-[#E5E0D9] dark:border-[#3D3D4A]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
