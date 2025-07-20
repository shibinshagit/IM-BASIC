"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AboutContent {
  id: number
  title: string
  subtitle: string
  description: string
  image_url: string
  button_text: string
  button_link: string
  is_active: boolean
}

export default function AboutSection() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      const response = await fetch("/api/about")
      if (response.ok) {
        const data = await response.json()
        setAboutContent(data || null) 
      }
    } catch (error) {
      console.error("Failed to fetch about content:", error)
    } finally {
      setLoading(false)
    }
  }

  // Default content fallback
  const defaultContent = {
    title: "Smart Tech, Smarter Prices",
    subtitle: "Reliable Gadgets, Renewed for You",
    description: `We specialize in high-quality used mobiles and gadgets that fit your lifestyle and your budget. Each device is carefully tested, certified, and backed with warranty—so you can shop with confidence.
  
    Whether you're upgrading, replacing, or exploring smart tech for the first time, we’ve got affordable options for every need.`,
    image_url: "logo.png",
    button_text: "BROWSE PRODUCTS",
    button_link: "/products",
  }
   

  const content = aboutContent || defaultContent

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">{content.title}</h2>
              {content.subtitle && <p className="text-xl text-amber-600 font-medium mb-6">{content.subtitle}</p>}
            </div>

            <div className="prose prose-lg text-gray-600">
              {content.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {content.button_text && content.button_link && (
              <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 text-lg">
                <a href={content.button_link}>{content.button_text}</a>
              </Button>
            )}
          </div>

          <div className="relative animate-scale-in">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image src={content.image_url || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500 rounded-full opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-600 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
