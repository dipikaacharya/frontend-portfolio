"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/apiConfig";

interface UserStats {
    total: number;
    active: number;
    users: Array<{
        id: number;
        name: string;
        email: string;
        last_active_at: string;
        created_at: string;
    }>;
}

interface DownloadActivity {
    id: number;
    downloaded_by: string;
    downloaded_at: string;
    resume_name: string | null;
    certificate_name: string | null;
}

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    year: string;
    filename: string;
    path: string;
}

interface Resume {
    id: number;
    title: string;
    description: string;
    filename: string;
    path: string;
}

export default function AdminDashboard() {
    const { user, token, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [activities, setActivities] = useState<DownloadActivity[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);

    const [newCert, setNewCert] = useState({ title: "", issuer: "", year: "", filename: "", path: "" });
    const [newResume, setNewResume] = useState({ title: "", description: "", filename: "", path: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [activitySearch, setActivitySearch] = useState("");

    useEffect(() => {
        if (isAuthLoading) return;

        if (!user || !user.is_admin) {
            router.push("/admin-login");
            return;
        }

        if (token && loading) {
            fetchData();
        }
    }, [user, token, router, isAuthLoading, loading]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, activitiesRes, certsRes, resumesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/admin/activities`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/certificates`),
                fetch(`${API_BASE_URL}/api/resumes`)
            ]);

            const statsData = await statsRes.json();
            const activitiesData = await activitiesRes.json();
            const certsData = await certsRes.json();
            const resumesData = await resumesRes.json();

            setStats(statsData);
            setActivities(activitiesData);
            setCertificates(certsData);
            setResumes(resumesData);
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCert = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/certificates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newCert)
            });
            if (res.ok) {
                setNewCert({ title: "", issuer: "", year: "", filename: "", path: "" });
                fetchData();
            }
        } catch (error) {
            console.error("Failed to add certificate:", error);
        }
    };

    const handleRemoveCert = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`${API_BASE_URL}/api/admin/certificates/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error("Failed to remove certificate:", error);
        }
    };

    const handleAddResume = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/resumes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newResume)
            });
            if (res.ok) {
                setNewResume({ title: "", description: "", filename: "", path: "" });
                fetchData();
            }
        } catch (error) {
            console.error("Failed to add resume:", error);
        }
    };

    const handleRemoveResume = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`${API_BASE_URL}/api/admin/resumes/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error("Failed to remove resume:", error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Admin Panel...</div>;
    if (!user || !user.is_admin) return null;

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
            <Header />
            <main className="flex-1 p-4 md:p-8 lg:p-12 space-y-12 max-w-7xl mx-auto w-full">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Manage your content and monitor user activity.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total Users</p>
                            <p className="text-2xl font-bold">{stats?.total || 0}</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm border-l-4 border-l-blue-500">
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Active Users</p>
                            <p className="text-2xl font-bold">{stats?.active || 0}</p>
                        </div>
                        <button
                            onClick={fetchData}
                            className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl shadow-sm hover:opacity-80 transition-opacity flex items-center justify-center border border-zinc-200 dark:border-zinc-800"
                            title="Refresh Data"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={loading ? "animate-spin" : ""}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: MANAGEMENT */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* CERTIFICATES */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Manage Certificates</h2>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleAddCert} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl">
                                    <input type="text" placeholder="Title" value={newCert.title} onChange={e => setNewCert({ ...newCert, title: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <input type="text" placeholder="Issuer" value={newCert.issuer} onChange={e => setNewCert({ ...newCert, issuer: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <input type="text" placeholder="Year" value={newCert.year} onChange={e => setNewCert({ ...newCert, year: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <input type="text" placeholder="Filename" value={newCert.filename} onChange={e => setNewCert({ ...newCert, filename: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <input type="text" placeholder="Path (e.g. /certificates/file.pdf)" value={newCert.path} onChange={e => setNewCert({ ...newCert, path: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm md:col-span-2" required />
                                    <button type="submit" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity">Add Certificate</button>
                                </form>

                                <div className="space-y-4">
                                    {certificates.map(cert => (
                                        <div key={cert.id} className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <p className="font-bold">{cert.title}</p>
                                                <p className="text-xs text-zinc-500">{cert.issuer} ({cert.year})</p>
                                            </div>
                                            <button onClick={() => handleRemoveCert(cert.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* RESUMES */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Manage Resumes</h2>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleAddResume} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl">
                                    <input type="text" placeholder="Title" value={newResume.title} onChange={e => setNewResume({ ...newResume, title: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <input type="text" placeholder="Filename" value={newResume.filename} onChange={e => setNewResume({ ...newResume, filename: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <input type="text" placeholder="Path (e.g. /resumes/file.pdf)" value={newResume.path} onChange={e => setNewResume({ ...newResume, path: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm" required />
                                    <textarea placeholder="Description" value={newResume.description} onChange={e => setNewResume({ ...newResume, description: e.target.value })} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-sm min-h-[40px]" />
                                    <button type="submit" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity md:col-span-2">Add Resume</button>
                                </form>

                                <div className="space-y-4">
                                    {resumes.map(res => (
                                        <div key={res.id} className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <p className="font-bold">{res.title}</p>
                                                <p className="text-xs text-zinc-500 truncate max-w-xs">{res.description}</p>
                                            </div>
                                            <button onClick={() => handleRemoveResume(res.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: USERS & ACTIVITY */}
                    <div className="space-y-8 text-sm">
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 space-y-3">
                                <h2 className="font-bold">Recent Downloads</h2>
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    value={activitySearch}
                                    onChange={e => setActivitySearch(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-xs"
                                />
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {activities.filter(a =>
                                    a.downloaded_by.toLowerCase().includes(activitySearch.toLowerCase()) ||
                                    a.resume_name?.toLowerCase().includes(activitySearch.toLowerCase()) ||
                                    a.certificate_name?.toLowerCase().includes(activitySearch.toLowerCase())
                                ).length === 0 ? (
                                    <p className="p-4 text-zinc-500 italic">No matches found.</p>
                                ) : (
                                    activities.filter(a =>
                                        a.downloaded_by.toLowerCase().includes(activitySearch.toLowerCase()) ||
                                        a.resume_name?.toLowerCase().includes(activitySearch.toLowerCase()) ||
                                        a.certificate_name?.toLowerCase().includes(activitySearch.toLowerCase())
                                    ).map(act => (
                                        <div key={act.id} className="p-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition-colors">
                                            <p className="font-medium">{act.downloaded_by}</p>
                                            <p className="text-xs text-zinc-500 mb-1">
                                                {new Date(act.downloaded_at).toLocaleString()}
                                            </p>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {act.certificate_name && <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">Cert: {act.certificate_name}</span>}
                                                {act.resume_name && <span className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">Resume: {act.resume_name}</span>}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 space-y-3">
                                <h2 className="font-bold">Registered Users</h2>
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-xs"
                                />
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {stats?.users.filter(u =>
                                    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    u.email.toLowerCase().includes(searchTerm.toLowerCase())
                                ).length === 0 ? (
                                    <p className="p-4 text-zinc-500 italic text-center">No users found.</p>
                                ) : (
                                    stats?.users.filter(u =>
                                        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        u.email.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).map(u => (
                                        <div key={u.id} className="p-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                            <p className="font-medium">{u.name}</p>
                                            <p className="text-zinc-500 text-xs">{u.email}</p>
                                            <div className="flex justify-between items-center mt-2 text-[10px] text-zinc-400">
                                                <span>Joined: {new Date(u.created_at).toLocaleDateString()}</span>
                                                <span className={new Date(u.last_active_at).getTime() > Date.now() - 300000 ? "text-green-500 font-bold" : ""}>
                                                    Last active: {new Date(u.last_active_at).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
