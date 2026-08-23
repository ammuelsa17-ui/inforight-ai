"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AppStartHomeReset() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname !== "/") {
      router.replace("/");
    }
    // Intentionally execute only once on full app mount/refresh.
    // Do NOT rerun on normal client-side route navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
