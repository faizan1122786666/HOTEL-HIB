import { useState } from "react"
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"

const InstagramIcon = ({ className = "w-14 h-14" }) => (
  <svg
    viewBox="0 0 448 512"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="25%" stopColor="#fa7e1e" />
        <stop offset="50%" stopColor="#d62976" />
        <stop offset="75%" stopColor="#962fbf" />
        <stop offset="100%" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <path
      fill="url(#igGradient)"
      d="M224,202a53,53,0,1,0,53,53A53,53,0,0,0,224,202Zm124-41a54,54,0,0,0-30-30C293,124,224,124,224,124s-69,0-94,7a54,54,0,0,0-30,30c-7,25-7,94-7,94s0,69,7,94a54,54,0,0,0,30,30c25,7,94,7,94,7s69,0,94-7a54,54,0,0,0,30-30c7-25,7-94,7-94S355,186,348,161ZM224,338a83,83,0,1,1,83-83A83,83,0,0,1,224,338Zm86-148a19,19,0,1,1,19-19A19,19,0,0,1,310,190Z"
    />
  </svg>
)


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contacts = [
    {
      icon: "📱",
      title: "Phone",
      value: "+92 3271616777",
      link: "tel:+1234567890",
      color: "blue",
    },
    {
      icon: "✉️",
      title: "Email",
      value: "hotelhub@gmail.com",
      link: "mailto:faizan9664740t@gmail.com",
      color: "blue",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      value: "Chat with us anytime",
      link: "https://wa.me/03271616777",
      color: "green",
    },
    // {
    //   icon: <InstagramIcon className="w-16 h-16 " />,
    //   title: "Instagram",
    //   value: "Chat with us anytime",
    //   link: "https://www.instagram.com/yourusername",
    //   color: "red",
    // },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest bg-blue-100/50 px-4 py-2 rounded-full inline-block mb-6 opacity-0 animate-fade-in-up">
            📧 Get In Touch
          </span>
          <h1 className="text-6xl font-bold text-slate-900 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Contact Us
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            We're here to help. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {contacts.map((contact, idx) => (
              <a
                key={idx}
                href={contact.link}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <Card className={`p-8 text-center rounded-2xl border-2 group hover:shadow-xl transition-all cursor-pointer ${
                  contact.color === 'red' ? 'border-red-200 hover:border-red-600 bg-red-50' :
                  contact.color === 'green' ? 'border-green-200 hover:border-green-600 bg-green-50' :
                  'border-blue-200 hover:border-blue-600 bg-blue-50'
                }`}>
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{contact.icon}</div>


                  <h3 className="text-xl font-bold text-slate-900 mb-2">{contact.title}</h3>
                  <p className={`text-lg font-semibold ${
                    contact.color === 'red' ? 'text-red-600' :
                    contact.color === 'green' ? 'text-green-600' :
                    'text-blue-600'
                  }`}>{contact.value}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
        
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 opacity-0 animate-fade-in-up">
              <Card className="p-12 rounded-2xl border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 animate-bounce">✓</div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h3>
                    <p className="text-slate-600">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                      />
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />

                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                    ></textarea>

                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      Send Message →
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Info */}
            <div className="space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Card className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">🏢 Office Address</h3>
                <p className="text-slate-600 leading-relaxed">
                  Street no : 6 Islam,Pura<br />
                  Narowal, Pakistan<br />
                  
                </p>
              </Card>

              <Card className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">🕐 Business Hours</h3>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                  
                </div>
              </Card>

              <Card className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">✓ Response Time</h3>
                <p className="text-slate-600 leading-relaxed">
                  We typically respond to inquiries within <br /><strong>10 Minutes</strong> during business hours.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ContactPage