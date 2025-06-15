import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
import { House, Calendar, Users, Icon, Trophy, Clock } from "lucide-react";
import { basketball } from "@lucide/lab";
import Chat from "@/components/AI/Chat";

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
      href: "/teams",
      text: "Teams",
      icon: <Icon iconNode={basketball} size={iconSize} />,
    },
    { href: "/leaders", text: "Leaders", icon: <Trophy size={iconSize} /> },
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
        <Chat />
      </body>
    </html>
  );
}
//check in select year component if when changing season to the
//fetched one if it still works or removes recent years
