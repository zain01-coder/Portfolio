import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import TiltedCard from "./TitledCard/TitledCard";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";

const ArrowIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth={1.5}
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
    />
  </svg>
);

// Left column: the container only orchestrates, each line reveals on its own.
// Re-runs on every slide change because the child is keyed by index.
const textContainer = {
  enter: {},
  center: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const revealItem = {
  enter: { opacity: 0, y: 24 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

// Right column: reveals right-to-left — enters offset to the right and travels
// left into place. Kept as a short tween over a modest distance; a long spring
// here overshoots and re-rasterises TiltedCard's 3D subtree every frame.
const imageReveal = {
  enter: { opacity: 0, x: 64 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

const Works = () => {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  // SectionWrapper's whileInView fires at amount 0.25 of the whole section,
  // which is still above this row — gate the reveal on the row itself.
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, amount: 0.25 });
  const state = inView ? "center" : "enter";

  const paginate = (dir) =>
    setIndex((prev) => (prev + dir + projects.length) % projects.length);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div
        ref={rowRef}
        className='mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'
      >
        {/* left — project details */}
        <div className='order-2 lg:order-1'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={index}
              variants={textContainer}
              initial='enter'
              animate={state}
              exit='exit'
            >
              <motion.p
                variants={revealItem}
                className='text-secondary text-[14px] tracking-widest uppercase'
              >
                {project.name}
              </motion.p>

              <motion.h3
                variants={revealItem}
                className='mt-3 text-white font-medium text-[30px] sm:text-[38px] leading-tight'
              >
                {project.category}
              </motion.h3>

              <motion.div
                variants={revealItem}
                className='mt-5 w-12 h-0.5 bg-[#a78bfa] rounded-full'
              />

              <motion.p
                variants={revealItem}
                className='mt-6 text-secondary text-[16px] leading-[1.9] max-w-130'
              >
                {project.description}
              </motion.p>

              <motion.div
                variants={revealItem}
                className='mt-7 flex flex-wrap gap-3'
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className='text-secondary text-[13px] border border-secondary/25 rounded-full px-4 py-1.5'
                  >
                    {tag.name}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={revealItem}
                className='mt-9 flex flex-wrap items-center gap-5'
              >
                <a
                  href={project.live_link}
                  target='_blank'
                  rel='noreferrer'
                  className='group flex items-center gap-3 border border-secondary/40 text-white text-[15px] px-6 py-3 rounded-md hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors'
                >
                  Live Site
                  <ArrowIcon className='w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1' />
                </a>

                <a
                  href={project.source_code_link}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-center gap-2.5 text-secondary text-[15px] hover:text-[#a78bfa] transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z' />
                  </svg>
                  Source Code
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* right — project image */}
        <div className='order-1 lg:order-2'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={index}
              variants={imageReveal}
              initial='enter'
              animate={state}
              exit='exit'
              className='aspect-16/10'
            >
              {/* children keeps our own card styling inside the tilting plane */}
              <TiltedCard
                containerWidth='100%'
                containerHeight='100%'
                imageWidth='100%'
                imageHeight='100%'
                rotateAmplitude={10}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div className='w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-tertiary'>
                  <img
                    src={project.image}
                    alt={project.name}
                    className='w-full h-full object-cover'
                  />
                </div>
              </TiltedCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* carousel controls */}
      <div className='mt-12 flex items-center gap-6'>
        <button
          type='button'
          onClick={() => paginate(-1)}
          aria-label='Previous project'
          className='w-12 h-12 flex items-center justify-center rounded-full border border-secondary/30 text-white hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors'
        >
          <ArrowIcon className='w-5 h-5 rotate-180' />
        </button>

        <button
          type='button'
          onClick={() => paginate(1)}
          aria-label='Next project'
          className='w-12 h-12 flex items-center justify-center rounded-full border border-secondary/30 text-white hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors'
        >
          <ArrowIcon className='w-5 h-5' />
        </button>

        <span className='ml-2 text-secondary text-[14px] tabular-nums'>
          <span className='text-white'>
            {String(index + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
