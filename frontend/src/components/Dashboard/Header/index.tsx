import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { Link } from 'lucide-react';
import { Metadata } from 'next';
import * as React from 'react';
import { MainNav } from '../Main-Nav';
import { UserNav } from '../User-Nav/Index';

export const metadata: Metadata = {
    title: 'Regiser',
    description: 'OnOneEntrée',
};

export default function Header() {
    return (
        <>
            <MainNav className="mx-6" />
            <UserNav />
        </>
    );
}
