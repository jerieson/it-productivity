import { ProdlogsTable } from "./components/ProdlogsTable";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <>
      <ThemeToggle />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <ProdlogsTable />
      </div>
    </>
  );
}

export default App;
