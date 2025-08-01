import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BuilderHOA",
    description: "The future of association management",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inter.variable} antialiased`}
        >
        <div className={"flex flex-col min-h-screen"}>
            <Toaster/>
            {children}
            <footer className={"bottom-0 mb-10"}>
                <div className="mt-12 text-center text-sm text-muted-foreground bottom-0">
                    &copy; {new Date().getFullYear()} BuilderHOA. All rights reserved.
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
