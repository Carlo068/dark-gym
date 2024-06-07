import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "./landing";
import Test from "./test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <Landing/>
  );
}
