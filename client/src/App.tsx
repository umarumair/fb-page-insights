import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <div className="flex items-center flex-col">
        <Button
          className="text-2xl font-bold border-4 border-black"
          variant="outline"
        >
          Login Via Facebook
        </Button>
      </div>
    </>
  );
}

export default App;
