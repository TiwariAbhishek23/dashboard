'use client';

import { withCn } from '@/lib/cn';

import { Toolbar } from './toolbar';

export const FixedToolbar = withCn(
  Toolbar,
  'sticky top-0 left-0 z-50 w-full flex flex-wrap items-center gap-2 rounded-t-lg border-b border-border bg-background/90 p-2 shadow-md backdrop-blur-lg supports-backdrop-blur:bg-background/80'
);
