"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("Test page mounted");
  }, []);

  return (
    <div className="p-4">
      <h1>Test Page</h1>
      <p>Mounted: {mounted ? "Yes" : "No"}</p>
    </div>
  );
}
