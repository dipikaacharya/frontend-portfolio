"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { AuthModal } from "../auth/AuthModal";

export function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link className="flex items-center gap-2 font-bold text-xl" href="#">
                        <span>Dipika.</span>
                    </Link>
                    <nav className="flex gap-4 sm:gap-6 items-center">
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
                            About
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
                            Projects
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4 ml-4">
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    Hi, {user?.name || user?.email?.split('@')[0] || 'User'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="ml-4 inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                            >
                                Login
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}
