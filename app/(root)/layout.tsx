import Header from "@/components/Header";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen text-gray-400">
      {/*Header component goes here*/}
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default Layout;
