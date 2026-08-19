import React from "react";
import {Outlet} from "react-router"

export const AuthLayout = () => {
  return (
    <div className="bg-background h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-3 bg-background-surface px-6 py-8 rounded-lg border-[0.1px] border-accent">
        <div className="flex flex-col items-center gap-y-0.5">
          <h1 className="text-accent text-xl font-semibold">Applyt</h1>
          <p className="text-content-secondary text-sm font-semibold">
            Track every application in one place
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
