import { useState } from 'react';
import Button from './components/Button';
// Icons
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { GrDownload } from "react-icons/gr";
import { SiJavascript, SiTypescript, SiNodedotjs, SiPostman, SiExpress, SiPostgresql, SiMongodb, SiDocker, SiGit } from 'react-icons/si'
import { DiRedis } from "react-icons/di";

const NAV_LINKS = [
  { label: 'About Me', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact Me', href: '#contact' },
];

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/abdelaziz.omar23/',
    Icon: BsFacebook,
    action: 'link',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdelaziz-omarr/',
    Icon: BsLinkedin,
    action: 'link',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/3bdelaziz_omar?igsh=MXNzZzBxaXU4eWtycw==',
    Icon: BsInstagram,
    action: 'link',
  },
  {
    name: 'Discord',
    href: '#',
    Icon: FaDiscord,
    action: 'copy',
    copyValue: 'abdelaziz3390',
  },
];

const iconSize = 40;
const SKILLS = [
  { name: 'JavaScript', icon: <SiJavascript size={iconSize} /> },
  { name: 'TypeScript', icon: <SiTypescript size={iconSize} /> },
  { name: 'Node.js', icon: <SiNodedotjs size={iconSize} /> },
  { name: 'Express.js', icon: <SiExpress size={iconSize} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={iconSize} /> },
  { name: 'MongoDB', icon: <SiMongodb size={iconSize} /> },
  { name: 'Redis', icon: <DiRedis size={50} /> },
  { name: 'Docker', icon: <SiDocker size={iconSize} /> },
  { name: 'Postman', icon: <SiPostman size={iconSize} /> },
  { name: 'Git', icon: <SiGit size={iconSize} /> },
];

const EXPERIENCE = [
  {
    title: 'Software Engineer at VertixSoft',
    date: 'Sep 2025 - Present',
    description:
      'Developing and maintaining backend services and RESTful APIs to support business requirements. Collaborating with cross-functional teams to design scalable system architecture and ensure code quality.',
    accent: 'dark' as const,
    company: {
      logo: '/expreience/vertix.png',
      url: 'https://vertixsoft.com/'
    }
  },
  {
    title: 'Backend Developer Intern at Agricultural Bank of Egypt',
    date: 'Summer 2025',
    description:
      'Attended training sessions covering backend development best practices and secure API design within a financial systems environment. Gained exposure to cloud-based deployment and integration workflows.',
    accent: 'muted' as const,
    company: {
      logo: '/expreience/abe.png',
      url: 'https://www.abe.com.eg/'
    }
  },
  {
    title: 'Backend Developer Intern at Robusta Studio',
    date: 'Summer 2024',
    description:
      'Completed an intensive backend development track covering RESTful API design, database management, and authentication best practices. Built and delivered a backend project applying Node.js industry-standard workflows.',
    accent: 'dark' as const,
    company: {
      logo: '/expreience/robusta-studio.png',
      url: 'https://robustagroup.com/studio/'
    }
  },
];

const PROJECTS = [
  {
    number: '01',
    name: 'Souqly',
    description:
      'A full e-commerce REST API supporting product catalog, shopping cart, and order management. Features JWT auth, role-based access (admin/customer), bcrypt password hashing, and email notifications.',
    href: 'https://github.com/Abdelazizomar22/souqly-api',
    image: '/projects/souqly.jpeg',
    imageAlt: 'Souqly preview',
  },
  {
    number: '02',
    name: 'PulseRooms',
    description:
      'A real-time chat backend supporting multiple rooms and concurrent users via WebSockets. Features JWT auth over HTTP and WebSocket connections, with persistent message history in PostgreSQL.',
    href: 'https://github.com/Abdelazizomar22/pulse-rooms-api',
    image: '/projects/pulserooms.jpeg',
    imageAlt: 'PulseRooms preview',
  },
  {
    number: '03',
    name: 'LinkBrief',
    description:
      'A URL shortening service with click analytics, Redis caching for high-traffic redirects, and Redis-based rate limiting. Secured with JWT authentication and detailed per-link reporting endpoints.',
    href: 'https://github.com/Abdelazizomar22/linkbrief-api',
    image: '/projects/linkbrief.jpeg',
    imageAlt: 'LinkBrief preview',
  },
];

const CONTACT_FIELDS = [
  { name: 'name', placeholder: 'Your name', type: 'text' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'website', placeholder: 'Your website (if exists)', type: 'text' },
];

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');

  const handleCopy = (e: React.MouseEvent, name: string, value: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const senderName = String(formData.get('name') ?? 'Portfolio Visitor').trim() || 'Portfolio Visitor';
    const submittedAt = new Date();

    formData.append('_subject', `New portfolio message from ${senderName}`);
    formData.append('_template', 'table');
    formData.append('_replyto', String(formData.get('email') ?? ''));
    formData.append('_captcha', 'false');
    formData.append('page_url', window.location.href);
    formData.append('submitted_at', submittedAt.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
    }));
    formData.append('submitted_at_utc', submittedAt.toISOString());
    formData.append('source', 'Portfolio contact form');

    setContactStatus('sending');
    setContactMessage('Sending your message...');

    try {
      const response = await fetch('https://formsubmit.co/ajax/abdelaziz.omar405@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setContactStatus('success');
      setContactMessage('Your message was sent successfully.');
      form.reset();
    } catch {
      setContactStatus('error');
      setContactMessage('Message sending failed. Please try again in a moment.');
    }
  };

  return (
    <main className="overflow-x-hidden bg-white text-black">
      <nav className="border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
          <a
            href="/"
            className="flex items-center gap-3 text-[1.05rem] font-semibold tracking-[-0.03em]"
          >
            <img src="/black-logo.png" alt="Logo" className="object-contain h-12 w-12" />
          </a>

          <div className="hidden items-center gap-9 text-[1.2rem] font-bold lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-opacity duration-200 hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
              <Button className='p-3!' variant='link' href="/Abdelaziz_Omar_Resume.pdf" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} children={(
                <div className='text-md flex items-center gap-2'>
                  <span>Resume</span>
                  <GrDownload className="h-3.5 w-3.5" />
                </div>
              )} />
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-black/5 bg-white px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-295 flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[1rem] font-bold tracking-[-0.02em]"
                >
                  {link.label}
                </a>
              ))}

              <Button variant='link' href="/Abdelaziz_Omar_Resume.pdf" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} children={(
                <div className='flex items-center gap-2 mt-1'>
                  <span>Resume</span>
                  <GrDownload className="h-4 w-4" />
                </div>
              )} />
            </div>
          </div>
        ) : null}
      </nav>

      <section
        id="home"
        className="min-h-screen max-w-295 mx-auto flex w-full px-5 sm:px-8 lg:px-10"
      >
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-24 md:mb-0 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-8 *:text-3xl sm:*:text-4xl *:font-medium *:leading-none md:*:text-6xl text-black">
              <p style={{ fontWeight: 400 }} className="whitespace-normal sm:whitespace-nowrap wrap-break-words">
                Hello I'm <span className="font-extrabold">Abdelaziz Omar.</span>
              </p>
              <p className="whitespace-normal sm:whitespace-nowrap">
                <span className="font-extrabold">Backend <span className="text-stroke-black text-transparent">Developer</span></span>
              </p>
              <p>
                Based In <span className="font-extrabold">Egypt.</span>
              </p>
            </div>

            <p className="mt-5 sm:mt-8 max-w-110 text-base sm:text-lg leading-[1.45] text-black/60">
              Passionate about building secure and scalable backend services.
            </p>

            <div className="mt-6 sm:mt-14 flex flex-col gap-4">
              <div className='flex gap-4 sm:gap-6'>
                {SOCIALS.map(({ name, href, Icon, action, copyValue }) => (
                  <div className="relative" key={name}>
                    <a
                      href={href}
                      target={action === 'link' ? '_blank' : undefined}
                      rel={action === 'link' ? 'noreferrer' : undefined}
                      aria-label={name}
                      onClick={action === 'copy' ? (e) => handleCopy(e, name, copyValue ?? href) : undefined}
                      className={`inline-flex bg-white hover:bg-black hover:text-white text-black p-3 sm:p-4 items-center justify-center rounded-md border-2 border-black transition-all duration-200 hover:-translate-y-0.5`}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>

                    {/* Tooltip */}
                    {copied === name && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Username copied!
                      </span>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="order-1 lg:order-2 mt-3 md:mt-0 mb-12 md:mb-16 relative mx-auto w-full lg:max-w-none flex justify-center">
            <img
              src="/hero-picture.png"
              alt="Illustration of Abdelaziz Omar working on a laptop"
              className="h-auto w-full"
            />
            <div className="absolute bottom-2.5 md:bottom-4 right-0 w-full md:w-[calc(100%+130px)] rounded-[20px] border border-black pointer-events-none" />
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="mx-auto w-full max-w-295 px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32"
      >
        <SectionHeading prefix="My" highlight="Skills" />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">

          {(showMoreSkills ? SKILLS : SKILLS.slice(0, 10)).map((skill) => (
            <div
              key={skill.name}
              className={`hover:text-white hover:bg-black duration-300 flex min-h-41 flex-col items-center justify-center rounded-xs border-3 border-black px-4 py-8 text-center transition-all hover:-translate-y-1 sm:min-h-44.5
                }`}
            >
              {skill.icon}
              <p className="mt-5 text-[1.1rem] font-semibold tracking-[-0.03em]">
                {skill.name}
              </p>
            </div>
          ))}

        </div>
        
        {SKILLS.length > 10 && (
          <div className="flex justify-center mt-4 lg:mt-6">
            <Button className="w-[15%]!" onClick={() => setShowMoreSkills(prev => !prev)}>
              <div className="flex-1 border-t border-dashed border-white/30" />
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-2xl transition-all group-hover:bg-black group-hover:text-white group-hover:border-black">
                {showMoreSkills ? '↑' : '↓'}
              </div>
              <div className="flex-1 border-t border-dashed border-white/30" />
            </Button>
          </div>
        )}
      </section>

      <section className="bg-[#060606] text-white">
        <div
          id="experience"
          className="mx-auto w-full max-w-295 px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
        >
          <SectionHeading prefix="My" highlight="Experience" dark centered={true} />

          <div className="mt-14 space-y-8">
            {EXPERIENCE.map((item) => {
              const cardClasses =
                item.accent === 'muted'
                  ? 'border border-white/10 bg-[#111111]'
                  : 'border border-white/25 bg-black';

              return (
                <article
                  key={item.title}
                  className={`rounded-3xl px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8 ${cardClasses}`}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-center gap-4">
                      <a href={item.company.url} target="_blank" rel="noreferrer">
                        <img
                          src={item.company.logo}
                          alt={`${item.title} logo`}
                          loading="lazy"
                          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-[10px] object-contain"
                        />
                      </a>
                      <h3 className="max-w-190 text-[1.5rem] font-bold leading-[1.1] tracking-[-0.05em] text-white sm:text-[2.05rem]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-[1rem] font-medium text-white/80 lg:pt-1">{item.date}</p>
                  </div>

                  <p className="mt-5 max-w-245 text-base sm:text-lg md:text-[1.3rem] leading-[1.35] tracking-[-0.03em] text-white/65 lg:pl-[3.75rem]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

      </section>

      <section
        id="about"
        className="mx-auto grid w-full max-w-295 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[560px_minmax(0,1fr)] lg:gap-16 lg:py-24"
      >
        <img
          src="/about-portrait.png"
          alt="Portrait illustration of Abdelaziz Omar"
          width={620}
          height={640}
          className="h-auto w-full"
        />
        <div className="max-w-155">
          <SectionHeading prefix="About" centered={false} highlight="Me" />

          <div className="mt-10 space-y-6 tracking-[0.03em] text-black/70 text-md">
            <p>
              I&apos;m a passionate Backend Developer who specializes in building secure and
              scalable server-side systems using Node.js and Express.js. I care deeply about clean
              architecture, API design, and writing readable, maintainable code.
            </p>
            <p>
              I began my development journey in 2022, and since then I&apos;ve been constantly
              growing, taking on new challenges and diving deeper into backend technologies.
              I&apos;m currently building real-world projects involving REST APIs, WebSockets,
              PostgreSQL, MongoDB, and Redis.
            </p>
            <p>
              When I&apos;m not coding, you can find me on LinkedIn sharing what I learn and on
              Instagram or Facebook staying connected. I&apos;m always looking for opportunities to
              build impactful backend solutions and grow within a professional team.
            </p>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="bg-[#060606] text-white"
      >
        <div className="mx-auto w-full max-w-295 px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pb-28">
          <SectionHeading prefix="My" highlight="Projects" dark />

          <div className="mt-16 space-y-16 lg:space-y-24">
            {PROJECTS.map((project, index) => (
              <article
                key={project.name}
                className={`grid items-center gap-10 lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)] lg:gap-14 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
              >
                <div className="overflow-hidden rounded-[20px] bg-[#111111]">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={420}
                    height={300}
                    className="h-auto w-full"
                  />
                </div>

                <div className="max-w-115">
                  <p className="text-[3.4rem] font-extrabold leading-none tracking-[-0.07em] text-white sm:text-[4rem]">
                    {project.number}
                  </p>
                  <h3 className="mt-2 text-[2.25rem] font-bold leading-none tracking-[-0.05em] text-white sm:text-[2.6rem]">
                    {project.name}
                  </h3>
                  <p className="mt-5 text-[1.18rem] leading-[1.24] tracking-[-0.03em] text-white/72 sm:text-[1.25rem]">
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name} on GitHub`}
                    className="mt-5 inline-flex h-8 w-8 items-center justify-center text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-295 px-5 py-10 md:py-20 sm:px-8 lg:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <form
            onSubmit={handleContactSubmit}
            className="order-last md:order-first flex w-full flex-col gap-3 sm:gap-2"
          >
            {CONTACT_FIELDS.map((field) => (
              <input
                required
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="h-12 sm:h-15.5 w-full rounded-lg border-2 border-black/60 px-4 sm:px-5 text-base sm:text-[1.02rem] text-black outline-none transition-colors duration-200 placeholder:text-black/60 focus:border-black"
              />
            ))}

            <textarea
              name="message"
              required
              rows={5}
              placeholder="How can I help?"
              className="h-32 sm:h-36.5 w-full resize-none rounded-lg border-2 border-black/60 px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-[1.02rem] text-black outline-none transition-colors duration-200 placeholder:text-black/60 focus:border-black"
            />

            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="flex flex-col w-full sm:justify-between sm:flex-row gap-4 pt-2 sm:pt-1">
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={contactStatus === 'sending'}
                  children={contactStatus === 'sending' ? 'Sending...' : 'Get In Touch'}
                  className="mx-auto! md:px-9 md:mx-0! h-15 md:w-fit! text-[1rem]"
                />
                {contactMessage ? (
                  <p
                    className={`text-sm ${contactStatus === 'success' ? 'text-green-700' : contactStatus === 'error' ? 'text-red-600' : 'text-black/70'}`}
                  >
                    {contactMessage}
                  </p>
                ) : null}
              </div>
              <div className='hidden md:flex items-center justify-center lg:justify-end gap-6'>
                {SOCIALS.map(({ name, href, Icon, action, copyValue }) => (
                  <div className="relative" key={name}>
                    <a
                      href={href}
                      target={action === 'link' ? '_blank' : undefined}
                      rel={action === 'link' ? 'noreferrer' : undefined}
                      aria-label={name}
                      onClick={action === 'copy' ? (e) => handleCopy(e, name, copyValue ?? href) : undefined}
                      className="inline-flex bg-white hover:bg-black hover:text-white text-black p-3 sm:p-4 items-center justify-center rounded-md border-2 border-black transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>

                    {/* Tooltip */}
                    {copied === name && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Username copied!
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>

          <div className="order-first md:order-last mx-auto max-w-130 pt-5 lg:pt-2">
            <h3 className="text-[3.5rem] font-bold leading-[0.95] tracking-[-0.07em] text-black md:text-[4rem]">
              Let&apos;s <span className="text-stroke-black text-transparent">talk</span> for
              <br />
              Something special
            </h3>
            <p className="mt-4 sm:mt-6 mx-auto text-base sm:text-[1.1rem] leading-[1.32] tracking-[-0.03em] text-black/82">
              I&apos;m always open to discussing backend projects, new opportunities, or just a
              good tech conversation.
            </p>

            <div className="mt-6 space-y-2 text-lg md:text-xl font-semibold sm:space-y-3">
              <a
                href="mailto:abdelaziz.omar405@gmail.com"
                className="block tracking-[-0.05em] transition-opacity duration-200 hover:opacity-70"
              >
                abdelaziz.omar405@gmail.com
              </a>
              <a
                href="tel:+201150842586"
                className="block tracking-[-0.05em] transition-opacity duration-200 hover:opacity-70"
              >
                +201150842586
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white pb-5 md:pb-0">
        <div className="mx-auto flex w-full max-w-295 gap-5 px-5 py-7 items-center justify-between sm:px-8 lg:px-10">
          <a href="#home" className="flex items-center gap-3">
            <img src="/white-logo.png" alt="Logo" className="object-contain h-12 w-12" />
          </a>
          
          <p className="hidden md:block text-[0.98rem] font-medium tracking-[-0.03em] text-white/75">
            &copy; 2026 Abdelaziz Omar
          </p>

          <div className='md:hidden flex items-center'>
            {SOCIALS.map(({ name, href, Icon, action, copyValue }) => (
              <div className="relative" key={name}>
                <a
                  href={href}
                  target={action === 'link' ? '_blank' : undefined}
                  rel={action === 'link' ? 'noreferrer' : undefined}
                  aria-label={name}
                  onClick={action === 'copy' ? (e) => handleCopy(e, name, copyValue ?? href) : undefined}
                  className="inline-flex bg-black hover:bg-white hover:text-black p-1.5 items-center justify-center rounded-md border-2 border-black transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="h-5 w-5" />
                </a>

                {/* Tooltip */}
                {copied === name && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded whitespace-nowrap">
                    Username copied!
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[0.98rem] block md:hidden text-center md:text-end font-medium tracking-[-0.03em] text-white/75">
          &copy; 2026 Abdelaziz Omar
        </p>
      </footer>
    </main>
  );
}

function SectionHeading({
  prefix,
  highlight,
  dark = false,
  contact = false,
  centered = true,
}: {
  prefix: string;
  highlight: string;
  dark?: boolean;
  contact?: boolean;
  centered?: boolean;
}) {
  const textColor = dark ? 'text-white' : 'text-black';
  const prefixWeight = contact ? 'font-extrabold' : 'font-light';
  const highlightWeight = contact ? 'font-medium' : 'font-extrabold';

  return (
    <h2
      className={`${centered ? 'text-center' : 'text-start'} font-syne text-[2.5rem] leading-none tracking-[-0.07em] sm:text-[4rem] ${textColor}`}
    >
      <span className={`${prefixWeight} mr-4`}>{prefix}</span>
      <span className={highlightWeight}>{highlight}</span>
    </h2>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M14 5h5v5m0-5-9 9M10 9H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
