import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Contact() {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
                <Header />
                <main className="flex-1">
                    {/* Contact Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                                    <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                                        Bagmati Zone, Nepal • 9866615313 • acharyadipika53@gmail.com
                                    </p>
                                </div>
                                <div className="w-full max-w-sm space-y-2 mt-8">
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
            </div>
        </ProtectedRoute>
    );
}
