import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>404</h2>
            <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>Page not found</p>
            <Link
                href="/"
                style={{ padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "0.375rem", border: "1px solid #ccc", background: "#18181b", color: "#fafafa", textDecoration: "none" }}
            >
                Go Home
            </Link>
        </div>
    );
}
