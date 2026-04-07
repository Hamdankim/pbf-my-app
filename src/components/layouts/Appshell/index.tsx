import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "../Navbar";

const Footer = dynamic(() => import("../Footer"), {
  ssr: false,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const disableNavbarFooter = ["/auth/login", "/auth/register", "/404"];

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <main className={roboto.className}>
      {!disableNavbarFooter.includes(pathname) && <Navbar />}
      {children}
      {!disableNavbarFooter.includes(pathname) && <Footer />}
    </main>
  );
};

export default AppShell;
