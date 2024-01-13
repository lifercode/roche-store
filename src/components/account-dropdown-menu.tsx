'use client'

import {
  Github,
  Info,
  LogIn,
  LogOut,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"

interface AccountDropdownMenuProps {
  children: React.ReactNode
}

export function AccountDropdownMenu({ children }: AccountDropdownMenuProps) {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  async function logout() {
    signOut({
      redirect: false
    })

    router.replace('/login')
    router.refresh()
  }

  async function getAuthSession() {
    const currentSession = await getSession()
    setSession(currentSession)
  }

  useEffect(() => {
    getAuthSession()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-1 mx-5">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/about">
            <Info className="mr-2 h-4 w-4" />
            <span>About Roche</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="https://github.com/lifercode/roche-store" target="_blank">
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              <span>Log in</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
