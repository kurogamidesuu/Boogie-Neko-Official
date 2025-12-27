"use client";

import { Heart, Search, User } from "lucide-react";
import Link from "next/link";
import CartSheet from "./CartSheet";

export default function Header() {
  return (
    <header className='flex flex-row items-center justify-between p-5 md:mx-5 font-[outfit]'>
      <div className="flex gap-3 md:gap-10 items-center">
        <Link href='/'>
            <h1 className="w-20 md:w-auto text-xl md:text-5xl font-bold font-logo">Boogie Neko</h1>
        </Link>
        <nav className="text-xs md:text-base">
          <ul className={`flex gap-2 md:gap-3
                  [&>li]:relative [&>li]:cursor-pointer
                  [&>li::after]:content-[''] [&>li::before]:content-['']
                  [&>li::after]:absolute [&>li::before]:absolute
                  [&>li::after]:left-1/2 [&>li::before]:right-1/2
                  [&>li::after]:bottom-0 [&>li::before]:bottom-0
                  [&>li::after]:h-[1px] [&>li::before]:h-[1px]
                  md:[&>li::after]:h-[2px] md:[&>li::before]:h-[2px]
                  [&>li::after]:w-0 [&>li::before]:w-0
                  [&>li::after]:bg-current [&>li::before]:bg-current
                  [&>li:hover::after]:w-1/2 [&>li:hover::before]:w-1/2
                  [&>li::after]:transition-all
                  [&>li::before]:transition-all
                  `}>
            <li>
              <Link href='/'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/products'>
                Products
              </Link>
            </li>
            <li>
              <Link href='/categories'>
                Categories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Search className="w-5 h-5 md:w-6 md:h-6" />
        <Link href='/profile' >
          <User className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
        <CartSheet />
      </div>
    </header>
  )
}