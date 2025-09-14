'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-600 animate-pulse"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Wanderlust</h1>
          <div className="h-2 w-48 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-full mx-auto mb-8"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">World</span> 
            <br />With Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Experience the journey of a lifetime with our exclusive travel packages and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Explore Destinations
            </button>
            <button className="bg-white text-gray-800 border-2 border-emerald-500 px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300">
              Watch Video
            </button>
          </div>
        </div>
        

        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

    
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular travel destinations around the globe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3", price: "$1,299" },
              { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3", price: "$899" },
              { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3", price: "$1,499" },
              { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3", price: "$1,199" },
              { name: "Maldives", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3", price: "$1,899" },
              { name: "New York, USA", image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3", price: "$1,099" },
            ].map((destination, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden h-72">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                    style={{ backgroundImage: `url(${destination.image})` }}
                  ></div>
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-300 font-medium">From {destination.price}</span>
                      <button className="text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-full text-sm transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-full font-medium transition-colors">
              View All Destinations
            </button>
          </div>
        </div>
      </section>

 
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Wanderlust</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional travel experiences with personalized service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", 
                title: "Worldwide Coverage", 
                description: "Access to destinations across all continents with local expertise" 
              },
              { 
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", 
                title: "Best Price Guarantee", 
                description: "We offer the best prices with no hidden fees or charges" 
              },
              { 
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 极 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 极 0z", 
                title: "24/7 Support", 
                description: "Our travel experts are available around the clock to assist you" 
              },
              { 
                icon: "M13 10V3L4 14h7v7l9-11h-7z", 
                title: "Easy & Quick Booking", 
                description: "Simple booking process with instant confirmation" 
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Special Offers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Limited time deals for your next adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden h-96 shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562602833-72b336fa9e2c?ixlib=rb-4.0.3')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">Limited Time</span>
                <h3 className="text-2xl font-bold mb-2">Summer in Europe</h3>
                <p className="mb-4">Save up to 30% on selected European destinations</p>
                <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden h-96 shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">Family Package</span>
                <h3 className="text-2xl font-bold mb-2">Tropical Getaway</h3>
                <p className="mb-4">All-inclusive family packages to paradise islands</p>
                <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from travelers who have explored the world with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah Johnson", 
                location: "Bali, Indonesia",
                text: "The trip was absolutely amazing! Every detail was taken care of, and the local guides were incredibly knowledgeable.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
              },
              { 
                name: "Michael Chen", 
                location: "Santorini, Greece",
                text: "Wanderlust made our honeymoon unforgettable. The views, the accommodations, everything was perfect!",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
              },
              { 
                name: "Emma Rodriguez", 
                location: "Kyoto, Japan",
                text: "Cultural experiences were authentic and well-organized. Would definitely travel with Wanderlust again!",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md">
                <div className="flex items-center mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-emerald-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-10 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Travel Inspiration</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for exclusive deals and travel tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}