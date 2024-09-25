"use client";
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex gap-1">
        <Button onClick={() => setCount(count - 1)}>-</Button>
        <Button>{count}</Button>
        <Button onClick={() => setCount(count + 1)}>+</Button>
      </div>
    </ThemeProvider>
  );
}