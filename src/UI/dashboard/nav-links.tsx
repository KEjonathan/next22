'use client'
import {
    HomeIcon,
    FolderIcon,
    LockClosedIcon,
    KeyIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const links = [
    { name: 'dashboard', href: '/dashboard', icon: HomeIcon },
    {
        name: 'My Files',
        href: '/dashboard/myfiles',
        icon: FolderIcon,
    },
    { name: 'Encryption Keys', href: '/dashboard/enckeys', icon: LockClosedIcon },
    { name: 'Decryption Keys', href: '/dashboard/deckeys', icon: KeyIcon },
    { name: 'profile', href: '/dashboard/profile', icon: UserIcon }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3', {
                            ' text-white bg-red-300': pathname === link.href,
                        })}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}