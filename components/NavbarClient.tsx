'use client';

import { useState } from 'react';
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SignOutButton from "./SignOutButton";
import type { Session } from "next-auth";

interface NavbarProps {
    session: Session | null;
}

export function NavbarClient({ session }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-card dark:bg-card-dark">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80">
                        Trading<span className="text-primary">Journal</span>
                    </Link>
                </div>

                {/* Desktop Links */}
                {session?.user && (
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink href="/">Dashboard</NavLink>
                        <NavLink href="/trades">Trades</NavLink>
                        <NavLink href="/add">Add Trade</NavLink>
                    </div>
                )}

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />

                    {session?.user ? (
                        <div className="hidden md:flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                            {session.user.image && <img src={session.user.image} alt="Avatar" className="h-7 w-7 rounded-full" referrerPolicy="no-referrer" />}
                            <span className="hidden sm:block text-sm font-medium">{session.user.name}</span>
                            <SignOutButton />
                        </div>
                    ) : (
                        <Link
                            href="/signin"
                            className="hidden md:inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                        >
                            Sign in
                        </Link>
                    )}

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sliding Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-card dark:bg-card-dark border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out
              ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden z-50`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <span className="font-bold text-lg">Menu</span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Close menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col px-6 py-4 space-y-4">
                    {session?.user ? (
                        <>
                            <NavLink href="/">Dashboard</NavLink>
                            <NavLink href="/trades">Trades</NavLink>
                            <NavLink href="/add">Add Trade</NavLink>

                            <div className="flex items-center gap-3 mt-4 border-t border-border pt-4">
                                {session.user.image && <img src={session.user.image} alt="Avatar" className="h-8 w-8 rounded-full" />}
                                <span className="font-medium">{session.user.name}</span>
                                <SignOutButton />
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/signin"
                            className="block w-full text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative text-sm font-medium text-muted-foreground transition hover:text-foreground
                 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary
                 after:transition-all hover:after:w-full block"
        >
            {children}
        </Link>
    );
}
