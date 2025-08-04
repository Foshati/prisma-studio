import { useState } from "react"
import { Menu, X, ChevronRight, ChevronDown, Home, Settings, Users, BarChart3, FileText, Layers } from "lucide-react"
import { Button } from "./ui/button"

// Header Component
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
            </div>
            <div className="ml-3">
              <span className="text-xl font-semibold text-gray-900">Demo Site</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Components
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Examples
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Documentation
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="bg-white text-gray-700">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white text-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Components
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Examples
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Documentation
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-3">
                  <Button variant="outline" className="w-full bg-white text-gray-700">
                    Sign In
                  </Button>
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// Sidebar Component
function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: Users, label: "Users", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    {
      icon: Layers,
      label: "Components",
      href: "#",
      children: [
        { label: "Buttons", href: "#" },
        { label: "Forms", href: "#" },
        { label: "Cards", href: "#" },
        { label: "Tables", href: "#" },
      ],
    },
    { icon: FileText, label: "Documentation", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <aside className="w-64 bg-white border-r h-[calc(100vh-4rem)] sticky hidden lg:block overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => item.children && toggleExpanded(item.label)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </div>
                {item.children &&
                  (expandedItems.includes(item.label) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  ))}
              </div>
              {item.children && expandedItems.includes(item.label) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

// Main Content Component
function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      {children}
    </main>
  )
}

// Main Website Layout Component
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}
