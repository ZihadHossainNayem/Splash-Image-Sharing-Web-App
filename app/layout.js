import { Raleway } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import connectDB from "@/utils/database";

connectDB();

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Splash - Image Sharing",
  description: "Splash - Image Sharing Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <main>{children}</main>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
