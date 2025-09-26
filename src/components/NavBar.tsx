"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  ChevronLeft,
  Menu,
  X,
  LucideIcon,
  LogOut,
} from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function NavBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Hardcoded nav items for your selected pages
  const navLinks: NavLink[] = [
    { label: "Overview", href: "/overview", icon: LayoutDashboard },
    { label: "Teachers", href: "/teachers", icon: Users },
    { label: "Students", href: "/students", icon: Users },
    { label: "Session Requests", href: "/session-request", icon: Calendar },
    { label: "Analysis", href: "/analysis", icon: BarChart3 },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Profile", href: "/profile", icon: Users },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCollapsed(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className={`flex ${
        isMobile && "flex-col"
      } h-screen overflow-hidden bg-gradient-to-l from-primary/20 via-15% to-white scrollbar-custom`}
    >
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-2 bg-gray-50 border-b sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Image
            alt="logo"
            src={Logo}
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-sm font-medium text-primary-dark">Wexplain</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="h-7 w-7 text-muted-foreground/60 hover:text-neutral-100"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Sidebar (Desktop only) */}
      <aside
        className={`hidden md:flex flex-col bg-card border-r transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-12" : "w-52"
        }`}
      >
        {/* Logo and toggle */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center p-1.5" : "justify-between p-2.5"
          } border-b py-3.5 mb-2`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-1.5">
              <Image
                alt="logo"
                src={Logo}
                width={32}
                height={32}
                className="object-contain"
              />
              <h1 className="text-sm font-medium text-foreground/70">
                Wexplain
              </h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-6 w-6 text-muted-foreground/60 hover:text-foreground hover:bg-neutral-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={`h-3 w-3 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-1.5 pt-2.5">
          <ul className="space-y-3 px-1.5">
            {navLinks.map((item, index) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-md text-xs font-normal transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-black/85 hover:bg-neutral-100 hover:text-foreground"
                    } ${isCollapsed ? "justify-center p-1.5" : "p-2 gap-2"}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate text-xs">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div
          className={`border-t p-1.5 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <Button
            variant="outline"
            className={`${
              isCollapsed ? "w-8 px-0" : "w-full justify-start"
            } gap-2 text-xs font-normal h-8 text-muted-foreground/60 hover:text-foreground/80 hover:bg-gray-100 cursor-pointer`}
          >
            <LogOut className="h-3 w-3" />
            {!isCollapsed && <span className="text-xs">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute inset-x-0 top-12 z-50 bg-white border-b shadow-lg">
          <ul className="space-y-1 p-2">
            {navLinks.map((item, index) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="p-3 border-t">
            <Button
              variant="outline"
              className="w-full gap-2 text-sm hover:bg-primary/30 h-10"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background scrollbar-custom">
        {children}
      </main>
    </div>
  );
}
