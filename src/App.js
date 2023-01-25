import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import About from "./pages/About";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const client = new QueryClient();

  return (
    <>
      <Navbar />
      <div className="container">
        <QueryClientProvider client={client}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cards" element={<Cards />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
