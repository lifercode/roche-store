import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartToggle } from "./cart-toggle"
import { AccountDropdownMenu } from "./account-dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserCircle2 } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <CartToggle />
            <AccountDropdownMenu>
              <Button variant="ghost" size="icon">
                <UserCircle2 className="h-5 w-5" />
                <span className="sr-only">Toggle account menu</span>
              </Button>
            </AccountDropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
