import { Outlet } from "react-router-dom";

import { UserProvider } from "@/utils/UserContext";
import { Toaster } from "@/components/ui/toaster";

const Header = () => {
  return (
    <header className="p-4 bg-white container mx-auto flex items-center justify-center fixed top-0 z-10">
      <div className="w-[75rem] max-w-[86.67%]">
        <h1 className="text-3xl text-black font-bold">Profile.io</h1>
      </div>
    </header>
  );
};

const App = () => (
  <>
    <Header />
    <UserProvider>
      <main className="container mx-auto p-8 max-w-[75rem] bg-white rounded-lg mt-24 mb-6">
        <Outlet />
      </main>
    </UserProvider>
    <Toaster />
  </>
);

export default App;
