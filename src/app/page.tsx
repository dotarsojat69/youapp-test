import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient w-full h-full">
      <div>
        <Link href="/login">Login</Link>
        </div>
        <div>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
