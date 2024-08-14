"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Organization {
  id: number;
  name: string;
}
interface Organizations {
  items: Organization[];
  count: number;
}

export default function Home() {
  const [orgs, setOrgs] = useState<Organizations>({ items: [], count: 0 });
  useEffect(() => {
    fetch("http://localhost:8080/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "ADMIN",
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("data :>> ", data);
        const { accessToken } = data;
        const orgsData = await fetch("http://localhost:8080/v1/organizations", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const orgs = await orgsData.json();
        setOrgs(orgs);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p>Organizations list</p>
        <ul>
          {orgs?.items.map((org, idx) => (
            <li key={org.id}>
              {idx + 1}. {org.name}
            </li>
          ))}
        </ul>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
          </a>
        </div>
      </div>
    </main>
  );
}
