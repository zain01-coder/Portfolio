import React from "react";
import { motion } from "framer-motion";
import TiltedCard from "./TitledCard/TitledCard";

import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

// Same design and entrance animation as before; TiltedCard supplies the
// hover tilt, and the title rides on translateZ(30px) so it lifts off the face.
const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className='w-full aspect-[4/5]'
  >
    <TiltedCard
      containerHeight='100%'
      containerWidth='100%'
      imageHeight='100%'
      imageWidth='100%'
      rotateAmplitude={14}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <div className='flex h-full w-full items-end justify-center px-4 pb-7'>
          <h3 className='text-white text-[16px] lg:text-[20px] font-bold text-center leading-tight'>
            {title}
          </h3>
        </div>
      }
    >
      <div className='w-full h-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div className='bg-tertiary rounded-[20px] w-full h-full flex items-center justify-center pb-12'>
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
        </div>
      </div>
    </TiltedCard>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      {/* Own viewport trigger, so the cards animate when THEY scroll into view.
          SectionWrapper drives whileInView on the whole section at amount 0.25,
          which fires while the cards are still below the fold. Setting
          initial/whileInView here makes this element the orchestrator for its
          children instead of the section. */}
      <motion.div
        variants={staggerContainer(0.15, 0.05)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.3 }}
        className='mt-20 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6 lg:gap-8'
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");