import React from 'react'
import { useNavigate } from 'react-router';
const Prelogin = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-background h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-xl gap-y-2">
        <h1 className="text-accent font-semibold text-lg">Applyt</h1>
        <h2 className="text-3xl font-semibold text-content-primary text-center">Your Job search, tracked like a real pipeline</h2>
        <p className="text-lg font-semibold text-content-secondary text-center">
          Kanban board, funnel analytics, and AI match scoring, built to replace
          the spreadsheet.
        </p>
        <button onClick={()=>navigate("/login")} className="bg-accent rounded-sm text-sm px-3 py-1 font-semibold mt-2 hover:bg-accent-hover">Get Started</button>
      </div>
    </main>
  );
}

export default Prelogin