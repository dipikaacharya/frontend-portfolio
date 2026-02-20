"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

export default function Resumes() {
    const { token } = useAuth();
    const [resumes, setResumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/resumes`);
                const data = await res.json();
                setResumes(data);
            } catch (error) {
                console.error("Failed to fetch resumes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResumes();
    }, []);

    const handleDownload = async (resumeName: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/downloads/log`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ resume_name: resumeName })
            });
        } catch (error) {
            console.error("Failed to log download:", error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
                <Header />
                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Resumes</h1>
                                <p className="max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                                    View and download my professional resumes tailored for different roles.
                                </p>
                            </div>

                            {loading ? (
                                <div className="text-center py-20 text-zinc-500">Loading resumes...</div>
                            ) : resumes.length === 0 ? (
                                <div className="text-center py-20 text-zinc-500">No resumes found.</div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                                    {resumes.map((resume, index) => (
                                        <div key={index} className="flex flex-col p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                            <h2 className="text-xl font-bold mb-2">{resume.title}</h2>
                                            <p className="text-zinc-500 dark:text-zinc-400 mb-6 flex-1">
                                                {resume.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-zinc-400 font-mono">{resume.filename}</span>
                                                <a
                                                    href={resume.path}
                                                    download
                                                    onClick={() => handleDownload(resume.title)}
                                                    className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-6 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 gap-2"
                                                >
                                                    <DownloadIcon />
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </ProtectedRoute>
    );
}
