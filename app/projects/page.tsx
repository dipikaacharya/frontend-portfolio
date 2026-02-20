import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Projects() {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
                <Header />
                <main className="flex-1">
                    {/* Projects Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32">
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
                </main>
            </div>
        </ProtectedRoute>
    );
}
