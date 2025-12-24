import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "The Vault | The floor price always climbs",
    description: "Every transaction contributes to The Vault. 100% of creator fees are locked forever.",
    openGraph: {
        title: "The Vault",
        description: "The floor price always climbs. 🔒",
        url: "https://thevault.coin",
        siteName: "The Vault",
        images: [
            {
                url: "/vault-3d.png",
                width: 500,
                height: 500,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "The Vault",
        description: "The floor price always climbs. 💸",
        images: ["/vault-3d.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}
