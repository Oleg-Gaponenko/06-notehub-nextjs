'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
};

const TanStackProvider = ({ children, dehydratedState }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export default TanStackProvider;
