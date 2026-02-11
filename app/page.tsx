import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Navbar */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-zinc-950">
          <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6 text-center">
            <div className="mb-8 relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800 shadow-lg">
              <Image
                src="/profile.jpeg"
                alt="Dipika Acharya"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Hi, I'm Dipika Acharya
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Computer Engineering Student
              </p>
            </div>
            <div className="space-x-4 mt-8">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                href="#projects"
              >
                View Work
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
                href="#contact"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                  I am currently pursuing a Bachelor in Computer Engineering at the Institute of Engineering (IOE), Lalitpur (Expected Graduation: 2026).
                  My academic journey has equipped me with a strong foundation in Data Structures, Algorithms, Software Engineering, and Database Systems.
                </p>
                <p className="text-zinc-500 dark:text-zinc-400">
                  I have previously completed a 2-year technical program covering Computer Networks, DBMS, and Hardware troubleshooting.
                  I am passionate about leveraging data to drive decisions and building meaningful digital products.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "SQL (MySQL)",
                    "Excel",
                    "Google Analytics",
                    "Tableau",
                    "Power BI",
                    "A/B Testing",
                    "Product Lifecycle",
                    "Wireframing",
                    "Agile/Scrum",
                    "Jira & Trello",
                    "Git",
                    "Python",
                    "HTML/CSS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Education</h3>
                <div className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-800 space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg">Bachelor in Computer Engineering</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Institute of Engineering, IOE • Lalitpur</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Expected Graduation: 2026</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Technical SEE</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Mohan Kanya Secondary School • Palpa</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">2018 • GPA: 3.56</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Certifications & Coursework</h3>
                <ul className="space-y-4">
                  <li className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <h4 className="font-semibold">Scrum Master Certification</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Vipesh Singla, UDEMY • 2025</p>
                  </li>
                  <li className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <h4 className="font-semibold">Executive Presence: Confident Leadership</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">MTF Institute, UDEMY • 2025</p>
                  </li>
                  <li className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <h4 className="font-semibold">Project Management</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Institute of Engineering • 2025</p>
                  </li>
                  <li className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <h4 className="font-semibold">Master Java from scratch</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Build a solid foundation in programming, logic, and problem-solving</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Project</h2>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                  Highlighting my recent work in data analysis and user behavior.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">User Behavior Analysis for Animals Product E-commerce Website</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                    A comprehensive analysis of user behavior data to identify key drop-off points in the sales funnel and improve engagement.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Key Achievements</h4>
                      <ul className="list-disc list-inside text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
                        <li>Analyzed user behavior using Google Analytics & SQL</li>
                        <li>Identified drop-off points in sales funnel</li>
                        <li>Improved product page engagement by 15%</li>
                        <li>Created interactive dashboards for sales tracking</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Tools Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Google Analytics", "SQL", "Data Analysis", "Dashboarding"].map(tool => (
                          <span key={tool} className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                  Bagmati Zone, Nepal • 9866615313 • acharyadipika53@gmail.com
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mt-8">
                {/* Simple link for email to start */}
                <div className="flex justify-center gap-4">
                  <a href="mailto:acharyadipika53@gmail.com" className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                    Email Me
                  </a>
                  <a href="https://linkedin.com/in/dipika-acharya-13b340260" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Dipika Acharya. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
