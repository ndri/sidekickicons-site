import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import IconSearch from "../components/IconSearch";
import IconSearchWithState from "@/components/IconSearchWithState";
import Ad from "@/components/Ad";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-8">
        <Ad />
        <Suspense fallback={<IconSearch />}>
          <IconSearchWithState />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
