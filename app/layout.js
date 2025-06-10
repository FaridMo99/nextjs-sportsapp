import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
import {
  House,
  Calendar,
  Users,
  ChartColumn,
  Trophy,
  Clock,
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HoopTracker",
  description: "Basketball statistics page",
};

export default function RootLayout({ children }) {
  const iconSize = 25;

  const links = [
    { href: "/", text: "Home", icon: <House size={iconSize} /> },
    { href: "/schedule", text: "Schedule", icon: <Calendar size={iconSize} /> },
    { href: "/players", text: "Players", icon: <Users size={iconSize} /> },
    {
      href: "/statistics",
      text: "Statistics",
      icon: <ChartColumn size={iconSize} />,
    },
    { href: "/seasons", text: "Seasons", icon: <Clock size={iconSize} /> },
    { href: "/scores", text: "Scores", icon: <Trophy size={iconSize} /> },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          limit={50}
          scrollColor="bg-secondary outline-1 outline-secondary-light"
        />
        <div className="flex">
          <Aside links={links} />
          {children}
        </div>
      </body>
    </html>
  );
}
