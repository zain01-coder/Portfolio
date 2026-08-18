import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../style";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`${styles.paddingX} ${styles.container} flex justify-between items-center`}
      >
        <Link
          to='/'
          className='flex items-center gap-1'
          onClick={() => {
            setActive("Home");
            window.scrollTo(0, 0);
          }}
        >
          <span className='text-secondary text-[20px] font-semibold'>
            &lt;
          </span>
          <span className='text-[#a78bfa] text-[19px] font-bold mx-0.5'>
            Zain
          </span>
          <span className='text-secondary text-[20px] font-semibold'>
            
            /&gt;
          </span>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className='relative'
              onClick={() => {
                setActive(nav.title);
                window.scrollTo(0, 0);
              }}
            >
              <a
                href={`#${nav.id}`}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[16px] font-medium cursor-pointer transition-colors`}
              >
                {nav.title}
              </a>
              {active === nav.title && (
                <span className='absolute -bottom-2 left-0 w-full h-0.5 bg-[#804dee] rounded-full' />
              )}
            </li>
          ))}
        </ul>

        <a
          href='/resume.pdf'
          download
          className='hidden sm:flex items-center gap-2 border border-secondary/40 text-white text-[14px] font-medium px-5 py-2 rounded-lg hover:border-[#804dee] hover:text-[#a78bfa] transition-colors'
        >
          Resume
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
            />
          </svg>
        </a>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            onClick={() => setToggle(!toggle)}
            aria-label='Toggle menu'
            className='w-10 h-10 flex items-center justify-center rounded-lg border border-secondary/30 text-white hover:border-[#804dee] transition-colors'
          >
            {toggle ? (
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'
                />
              </svg>
            )}
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-100/95 backdrop-blur-md border border-white/10 absolute top-20 right-4 min-w-45 z-10 rounded-xl flex-col gap-5`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[15px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white transition-colors`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                    if (nav.id === "home") window.scrollTo(0, 0);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>

            <a
              href='/resume.pdf'
              download
              onClick={() => setToggle(false)}
              className='flex items-center justify-center gap-2 border border-secondary/40 text-white text-[14px] font-medium px-4 py-2 rounded-lg hover:border-[#804dee] hover:text-[#a78bfa] transition-colors'
            >
              Resume
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
