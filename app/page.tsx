import Header from "./components/Header";
import IconSearch from "./components/IconSearch";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="w-full max-w-7xl p-8">
        <IconSearch />
      </main>
    </div>
  );
}
