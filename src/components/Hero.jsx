import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StrokeText from "./MainText/MainText";
import Lanyard from "./Lanyard/Lanyard";
import cardFront from "./Lanyard/lanyard.png";
import cardBack from "./Lanyard/images.jpeg";
import Particles from "./Particles/particles";
import { styles } from "../style";

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/",
        path: "M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/",
        path: "M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.25 8.25h4.5V23H.25V8.25Zm7.13 0h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-7.29c0-1.74-.03-3.98-2.42-3.98-2.43 0-2.8 1.9-2.8 3.86V23h-4.5V8.25Z",
    },
    {
        name: "Twitter",
        href: "https://twitter.com/",
        path: "M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 10.03 10.03 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59Z",
    },
    {
        name: "Email",
        href: "mailto:zain.mehmood.005@gmail.com",
        path: "M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25Zm2.4-.25 8.1 6.08L20.1 5H3.9ZM21 6.87l-8.4 6.3a1 1 0 0 1-1.2 0L3 6.87V18.75c0 .41.34.75.75.75h16.5c.41 0 .75-.34.75-.75V6.87Z",
    },
];

// StrokeText draws into an SVG and needs a numeric fontSize, so the display
// responsive Tailwind sizes (38 / 46 / 58 / 72) are mirrored here rather than in CSS.
const useHeadlineSize = () => {
    const read = () => {
        if (typeof window === "undefined") return 72;
        if (window.matchMedia("(min-width: 64rem)").matches) return 72;
        if (window.matchMedia("(min-width: 40rem)").matches) return 58;
        if (window.matchMedia("(min-width: 450px)").matches) return 46;
        return 38;
    };
    const [size, setSize] = useState(read);
    useEffect(() => {
        const onResize = () => setSize(read());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return size;
};

const Hero = () => {
    const headlineSize = useHeadlineSize();
    return (
        <section className='relative w-full min-h-screen flex items-center'>
            {/* particle field — the hero starts at the top of the page and the navbar
          is fixed (no flow space), so this sits behind both. -z-10 rather than
          z-0 on purpose: a positioned element at z-0 paints ABOVE non-positioned
          in-flow content, which would bury the copy. */}
            <div className='absolute inset-0 -z-10'>
                <Particles
                    particleCount={260}
                    particleSpread={12}
                    speed={0.08}
                    particleColors={['#804dee', '#a78bfa', '#aaa6c3']}
                    alphaParticles
                    particleBaseSize={70}
                    sizeRandomness={1}
                    cameraDistance={22}
                />
            </div>

            <div className={`${styles.paddingX} ${styles.container} pt-25 pb-20`}>
                <div className='flex flex-row items-center gap-8 lg:gap-14'>
                    {/* rail + copy keep their own row: the rail stretches to the
              height of the copy, and the taller lanyard beside them cannot
              drag either of them out of place. */}
                    <div className='flex flex-row flex-[2] min-w-0 gap-8 lg:gap-14'>
                        {/* social rail */}
                        <div className='hidden sm:flex flex-col items-center shrink-0'>
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className='w-px flex-1 min-h-35 origin-top bg-linear-to-b from-transparent to-secondary/30'
                            />
                            <div className='flex flex-col gap-6 pt-8'>
                                {socials.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target='_blank'
                                        rel='noreferrer'
                                        aria-label={social.name}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                        className='text-secondary/70 hover:text-[#a78bfa] transition-colors'
                                    >
                                        <svg
                                            className='w-5 h-5'
                                            fill='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path d={social.path} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* content */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className='flex-1 max-w-4xl'
                        >
                            <h1 className='text-white font-normal lg:text-[30px] sm:text-[26px] text-[20px] leading-snug'>
                                Hi, I&rsquo;m{" "} <span className="text-[#a78bfa]">Zain</span>
                            </h1>

                            <h2 className='sr-only'>Full-Stack Developer &amp; ML Enthusiast</h2>
                            <div className='mt-2'>
                                <StrokeText
                                    text={'Full-Stack Developer\n& ML Enthusiast'}
                                    align='left'
                                    autoHeight
                                    paddingScale={0.02}
                                    startDelay={1.5}
                                    fontSize={headlineSize}
                                    fontWeight={600}
                                    letterSpacing={-0.025 * headlineSize}
                                    strokeColor='#a78bfa'
                                    fillColor='#ffffff'
                                />
                            </div>

                            <p className='mt-6 text-secondary text-[16px] sm:text-[17px] leading-[1.9] max-w-130'>
                                I build responsive web applications and machine learning solutions
                                that solve real-world problems and create meaningful impact.
                            </p>

                            <div className='mt-12 flex flex-wrap items-center gap-8 sm:gap-10'>
                                <a
                                    href='#projects'
                                    className='group flex items-center gap-4 border border-secondary/40 text-white text-[16px] px-8 py-4 rounded-md hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors'
                                >
                                    View Projects
                                    <svg
                                        className='w-5 h-5 transition-transform group-hover:translate-x-1'
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
                                </a>

                                <a
                                    href='#contact'
                                    className='text-white text-[16px] pb-2 border-b-2 border-[#a78bfa] hover:text-[#a78bfa] transition-colors'
                                >
                                    Contact Me
                                </a>
                            </div>

                            {/* socials fall back to a horizontal row once the rail is hidden */}
                            <div className='mt-12 flex sm:hidden items-center gap-7'>
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target='_blank'
                                        rel='noreferrer'
                                        aria-label={social.name}
                                        className='text-secondary/70 hover:text-[#a78bfa] transition-colors'
                                    >
                                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d={social.path} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* lanyard — sits on the right, after the copy. Hidden below lg:
              the physics canvas needs real width, and it is expensive on mobile.
              The height must be definite: an R3F canvas left on `auto` measures
              itself from its parent while the parent measures itself from the
              canvas, and the hero grows without bound. Kept in vh so it can
              never outgrow the viewport and push the copy under the navbar. */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        // z-30 must live here, not on the Lanyard div inside: framer-motion
                        // gives this wrapper its own stacking context, which would otherwise
                        // trap the inner z-index and leave the whole thing under the navbar.
                        className='relative z-30 hidden lg:block flex-1 min-w-0 h-[80vh]'
                    >
                        <Lanyard
                            // Composited into the left half of the card's texture atlas.
                            // Source is square, the face is ~2:3, so `cover` crops the sides.
                            frontImage={cardFront}
                            imageFit='cover'
                            backImage={cardBack}
                            backImageFit='cover'
                            // 12 instead of the stock 30: the card fills roughly half the
                            // frame height rather than a fifth.
                            position={[0, 0, 12]}
                            fov={20}
                            // Card settles ~4.5 below the anchor, so 4.5 centres it; the
                            // anchor itself lands well above the top of the frustum (~2.1),
                            // which is what makes the thread run off the top edge.
                            anchorY={4.5}
                            // Violet rim light on the card + a halo behind the canvas.
                            glowColor='#804dee'
                            glowIntensity={4}
                            // Thin plain thread rather than the stock printed strap.
                            lanyardWidth={0.06}
                            bandTextured={false}
                            bandColor='#c9c7d4'
                            className='relative z-30 w-full h-full flex justify-center items-center'
                        />
                    </motion.div>
                </div>
            </div>


        </section>
    );
};

export default Hero;
