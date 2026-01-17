import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Edit3, BarChart2, QrCode, Link2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Edit3 className="w-8 h-8 text-purple-400" />,
      title: 'Custom Aliases',
      description: 'Personalize your links with branded endings for better recognition.',
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-purple-400" />,
      title: 'Click Tracking',
      description: 'Monitor how many times your links are clicked and measure your impact.',
    },
    {
      icon: <QrCode className="w-8 h-8 text-purple-400" />,
      title: 'QR Code Generation',
      description: 'Easily generate and share QR codes for your links to use offline.',
    },
    {
      icon: <Link2 className="w-8 h-8 text-purple-400" />,
      title: 'Link Expander',
      description: 'Reverse shortened links to see the original URL before you click.',
    },
  ];

  const testimonials = [
    {
      quote: "Atomzr is incredibly simple and powerful. I use it for all my social media links and the click tracking is a game-changer!",
      name: 'Sarah J.',
      title: 'Digital Marketer',
    },
    {
      quote: "Finally, a URL shortener that's fast, free, and looks great. The custom alias feature is exactly what I needed for my brand.",
      name: 'Mike R.',
      title: 'Content Creator',
    },
    {
      quote: "I love the QR code generator. It's so easy to create codes for my event flyers. Highly recommended!",
      name: 'Emily C.',
      title: 'Event Organizer',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Paste Your Long URL',
      description: 'Simply copy your lengthy URL and paste it into the input field.',
    },
    {
      step: 2,
      title: 'Customize (Optional)',
      description: 'Create a custom alias to make your link memorable and branded.',
    },
    {
      step: 3,
      title: 'Share and Track',
      description: 'Share your new short link and monitor its performance in your dashboard.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Atomzr - Free URL Shortener | Trackable & Custom Short Links</title>
        <meta name="description" content="Atomzr is a free URL shortener that lets you create custom, trackable short links with QR codes. Transform your links and track your impact." />
        <meta name="keywords" content="free url shortener, trackable links, custom short links, link shortener, qr code generator, link tracking" />
      </Helmet>
      <div className="bg-gray-900 text-white">
        <Header />

        <main>
          <section className="relative pt-20 pb-32 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-purple-500/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Transform Your Links. Track Your Impact.
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                  Atomzr lets you shorten long URLs, customize aliases, and track clicks—all in one sleek dashboard. Free, fast, and reliable.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold group"
                    onClick={() => navigate('/app')}
                  >
                    Start Shortening Now
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="features" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose Atomzr?</h2>
                <p className="mt-4 text-lg text-gray-400">Everything you need to manage your links effectively.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-20 bg-gray-950">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                <p className="mt-4 text-lg text-gray-400">Get your short link in just three simple steps.</p>
              </div>
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  {howItWorks.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="text-center"
                    >
                      <div className="relative inline-block">
                        <div className="w-16 h-16 mx-auto bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-gray-400">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Loved by Users Worldwide</h2>
                <p className="mt-4 text-lg text-gray-400">Don't just take our word for it. Here's what people are saying.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gray-800/50 border-gray-700 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <p className="text-gray-300 flex-grow">"{testimonial.quote}"</p>
                        <div className="mt-6">
                          <p className="font-semibold text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-400">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-lg text-gray-400">Get started for free. No credit card required.</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8"
                >
                  <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold">Free Forever</h3>
                      <p className="mt-4 text-5xl font-extrabold">$0<span className="text-lg font-normal text-gray-200">/month</span></p>
                      <ul className="mt-6 space-y-2 text-left">
                        <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-400" /> Unlimited Links</li>
                        <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-400" /> Click Tracking</li>
                        <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-400" /> QR Code Generation</li>
                        <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-400" /> Custom Aliases</li>
                      </ul>
                      <Button
                        size="lg"
                        className="mt-8 w-full bg-white text-purple-600 font-bold hover:bg-gray-200"
                        onClick={() => navigate('/app')}
                      >
                        Get Started for Free
                      </Button>
                      <p className="mt-4 text-xs text-gray-300">Shorten up to 10 links per day.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;