import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import IconSearch from "../components/IconSearch";
import IconSearchWithState from "@/components/IconSearchWithState";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="w-full max-w-7xl p-4 sm:p-8">
        <Suspense fallback={<IconSearch />}>
          <IconSearchWithState />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
