// /app/providers.tsx

import { ClientCookiesProvider } from "./cookies";
import { cookies } from "next/headers";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ClientCookiesProvider value={cookies().getAll()}>
      {children}
    </ClientCookiesProvider>
  );
}