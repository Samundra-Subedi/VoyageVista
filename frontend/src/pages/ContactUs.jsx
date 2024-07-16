import { Link } from "react-router-dom"
import { useState } from "react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMailBulk, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="w-full flex justify-between flex-col">
        <Navbar/>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#fef6e4]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
            <p className="max-w-[700px] mx-auto text-gray-700 md:text-xl lg:text-base xl:text-xl">
              Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <Link
              href="#contact-form"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#F1A501] px-8 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <section id="contact-form" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Enter the subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    value={form.message}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F1A501] focus:ring-[#F1A501] sm:text-sm min-h-[150px] p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#F1A501] hover:bg-[#F1A501] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Contact Information</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
                  <p>Kathmandu, Nepal</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="h-5 w-5 text-gray-500" />
                  <p>+977 (555) 555-5555</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMailBulk className="h-5 w-5 text-gray-500" />
                  <p>info@travel.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <FaTwitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <FaFacebookF className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <FaInstagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <FaLinkedinIn className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
