import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCall } from "@/components/FloatingCall";

export const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1 pb-20 md:pb-0">{children}</main>
    <Footer />
    <FloatingCall />
  </div>
);
