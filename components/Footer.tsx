import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Image 
              src="/logo-white.svg" 
              alt="NextGen Stem Academy Logo" 
              width={180} 
              height={54}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Empowering young minds through innovative STEM education with our unique 3S philosophy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white transition">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Courses</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses?category=Robotics" className="text-gray-400 hover:text-white transition">
                  Robotics
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Maths" className="text-gray-400 hover:text-white transition">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Chess" className="text-gray-400 hover:text-white transition">
                  Chess
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@nextgenstem.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 STEM Street, Tech City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NextGen Stem Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
