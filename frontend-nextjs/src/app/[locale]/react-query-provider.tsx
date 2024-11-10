"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * ReactQueryClientProvider is a component that sets up a React Query Client
 * with default options and provides it to its children.
 *
 * This component is essential for managing server state in a React application
 * using the React Query library. By providing a QueryClient with default options,
 * it ensures that data fetching and caching are handled efficiently, reducing
 * unnecessary network requests and improving the performance of the application.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components that will have access to the React Query Client.
 *
 * @returns {JSX.Element} A QueryClientProvider component that wraps the children with the configured QueryClient.
 */
export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
