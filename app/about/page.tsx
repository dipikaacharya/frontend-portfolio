import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function About() {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
                <Header />
                <main className="flex-1">
                    {/* About Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32">
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

                    {/* Education Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="max-w-3xl mx-auto space-y-8">
                                <h3 className="text-3xl font-bold border-b pb-4">Education</h3>
                                <div className="border-l-2 border-zinc-200 pl-6 dark:border-zinc-800 space-y-10">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                                        <h4 className="font-bold text-xl">Bachelor in Computer Engineering</h4>
                                        <p className="text-zinc-500 dark:text-zinc-400 font-medium italic">Institute of Engineering, IOE • Lalitpur</p>
                                        <p className="text-sm text-zinc-400 mt-1">Expected Graduation: 2026</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                        <h4 className="font-bold text-xl">Technical SEE</h4>
                                        <p className="text-zinc-500 dark:text-zinc-400 font-medium italic">Mohan Kanya Secondary School • Palpa</p>
                                        <p className="text-sm text-zinc-400 mt-1">2018 • GPA: 3.56</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </ProtectedRoute>
    );
}
