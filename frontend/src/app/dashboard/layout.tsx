'use client';
import Header from '@/components/Dashboard/Header';
import { Metadata } from 'next';
import * as React from 'react';

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <section>{children}</section>
        </>
    );
}
