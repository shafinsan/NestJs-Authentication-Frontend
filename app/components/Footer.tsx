export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-xl md:text-2xl font-bold">My App</span>
            </div>
            <p className="text-black mb-4">
              Empowering users with innovative solutions and exceptional
              experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-black hover:text-emerald-500 transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-200 transition-colors duration-200"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 1 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 极 03.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-200 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:text-blue-200 transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4 border-b border-emerald-300 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4 border-b border-emerald-300 pb-2">
              Resources
            </h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-emerald-500 transition-colors duration-200 block py-1"
                >
                  Webinars
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4 border-b border-emerald-300 pb-2">
              Stay Updated
            </h3>
            <p className="text-black mb-3 md:mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border-[1px]  text-gray-800 focus:outline-none text-sm md:text-base"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors duration-200 text-sm md:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-emerald-300 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black mb-4 md:mb-0 text-sm md:text-base">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
          <div className="flex space-x-4 md:space-x-6">
            <a
              href="#"
              className="text-black hover:text-emerald-500 transition-colors duration-200 text-xs md:text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-black hover:text-emerald-500 transition-colors duration-200 text-xs md:text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-black hover:text-emerald-500 transition-colors duration-200 text-xs md:text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
