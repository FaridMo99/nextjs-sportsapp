import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Aside from "@/components/layout/Aside";
import { House, Calendar, Users, Icon, Trophy } from "lucide-react";
import { basketball } from "@lucide/lab";
import Chat from "@/components/AI/Chat";
import Footer from "@/components/layout/Footer";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: {
    default: "HoopTracker",
    template: "%s | Hooptracker",
  },
  description: "Basketball Statistics Page",
  authors: [{ name: "Farid Mohseni" }],
  openGraph: {
    title: "HoopTracker",
    description: "Basketball Statistics Page",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "HoopTracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HoopTracker",
    description: "Basketball Statistics Page",
  },
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
      <body className={bebas.className}>
        <Header
          limit={75}
          scrollColor="bg-secondary outline-1 outline-secondary-light"
        />
        <div className="flex">
          <Aside links={links} />
          {children}
        </div>
        <Chat />
        <Footer />
      </body>
    </html>
  );
}
