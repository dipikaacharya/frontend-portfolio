"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import { API_BASE_URL } from "@/utils/apiConfig";

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);

const FileDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

export default function Certificates() {
    const { token } = useAuth();
    const [certifications, setCertifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/certificates`);
                const data = await res.json();
                setCertifications(data);
            } catch (error) {
                console.error("Failed to fetch certifications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    const handleLog = async (certName: string) => {
        try {
            await fetch(`${API_BASE_URL}/api/downloads/log`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ certificate_name: certName })
            });
        } catch (error) {
            console.error("Failed to log download/view:", error);
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
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Certifications</h1>
                                <p className="max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                                    A collection of my professional certifications and achievements.
                                </p>
                            </div>

                            {loading ? (
                                <div className="text-center py-20 text-zinc-500">Loading certifications...</div>
                            ) : certifications.length === 0 ? (
                                <div className="text-center py-20 text-zinc-500">No certifications found.</div>
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
                                    {certifications.map((cert, index) => (
                                        <div key={index} className="group relative flex flex-col p-6 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md">
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h2 className="text-lg font-bold group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">{cert.title}</h2>
                                                    <span className="text-xs font-semibold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-500">{cert.year}</span>
                                                </div>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
                                                    {cert.issuer}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                                <span className="text-[10px] text-zinc-400 font-mono truncate mr-4">{cert.filename}</span>
                                                <div className="flex gap-3">
                                                    <a
                                                        href={cert.path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => handleLog(cert.title)}
                                                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                                        title="View PDF"
                                                    >
                                                        <ExternalLinkIcon />
                                                    </a>
                                                    <a
                                                        href={cert.path}
                                                        download
                                                        onClick={() => handleLog(cert.title)}
                                                        className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
                                                    >
                                                        <FileDownIcon />
                                                        Download
                                                    </a>
                                                </div>
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
