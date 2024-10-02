"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/posts", label: "Posts" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
];

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const getLinkClass = (href: string) =>
    `${
      pathName === href ? "text-aljazeera-red" : "hover:underline"
    } block py-2`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const AnimatedLink = motion(Link);

  const hashtag = `
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow`;

  const handleTweet = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      hashtag
    )}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className='lg:sticky relative top-0 w-full z-50 bg-[#f6f6f6]'>
      <div className='max-w-screen-xl mx-auto px-4 py-3 md:py-5 flex justify-between items-center'>
        <Link href='/'>
          <Image
            className='object-cover rounded w-8 md:w-10'
            src='/images/ftc-logo.jpg'
            alt='Free the Citizens'
            placeholder='blur'
            blurDataURL='/images/default.jpg'
            quality={75}
            width={80}
            height={80}
          />
        </Link>
        <div className='hidden md:flex space-x-5'>
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={getLinkClass(href)}>
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <button
          className='md:hidden'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <AnimatePresence mode='popLayout'>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className='md:hidden fixed bg-white w-full h-full z-50 p-4'
            variants={menuVariants}
            initial='closed'
            animate='open'
            exit='closed'
          >
            {navItems.map(({ href, label }, index) => (
              <AnimatedLink
                key={href}
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                exit={{ opacity: 0, translateY: 20 }}
                href={href}
                className={`${getLinkClass(href)} px-4`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{label}</span>
              </AnimatedLink>
            ))}

            <div className='p-4'>
              <button
                onClick={handleTweet}
                className='px-4 bg-aljazeera-red text-white py-3 rounded-xl w-full flex items-center gap-2 justify-center'
              >
                <BsTwitterX /> <span>#StopGalamsey</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
