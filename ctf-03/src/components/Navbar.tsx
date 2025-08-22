'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { User } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <div className='bg-secondary text-secondary-foreground border-b border-secondary-foreground px-3 py-1 flex items-center justify-between'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs">Documentation</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs">Documentation</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs">Documentation</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild>
              <Link href={'/login'}>
                <Button className='cursor-pointer'>
                  <User />
                  Login
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    {/* <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Community Forum
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Feed
            </Link>
            
            <Link 
              href="/faq" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/faq') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              FAQ
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, <span className="font-medium">{user.username}</span>
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Feed
            </Link>
            
            <Link 
              href="/faq" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/faq') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav> */}
    </>
  );
}

