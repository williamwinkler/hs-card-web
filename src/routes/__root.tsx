import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { ConfigProvider, theme, Input } from 'antd'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import {
  AntdStyleCacheProvider,
} from '~/lib/antd-style-cache'
import { useDebouncedValue } from '~/hooks/useDebouncedValue'
import { normalizeSearchTerm } from '~/lib/search'
import '~/styles.css'

// Search context for sharing search state between navbar and filters
interface SearchContextType {
  searchTerm: string | undefined
  setSearchTerm: (term: string | undefined) => void
}

const SearchContext = createContext<SearchContextType>({
  searchTerm: undefined,
  setSearchTerm: () => {},
})

export const useSearch = () => useContext(SearchContext)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const hearthstoneTheme = {
  colorPrimary: '#F0B132', // Hearthstone gold
  colorBgContainer: '#2D241E',
  colorBgElevated: '#3D312A',
  colorBorder: '#5C4A3D',
  colorText: '#F5E6C8',
  colorTextSecondary: '#C4A77D',
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#1A1410' },
      { name: 'description', content: 'Hearthstone Card Viewer' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=optional',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>()

  const searchContextValue = useMemo(
    () => ({ searchTerm, setSearchTerm }),
    [searchTerm, setSearchTerm],
  )

  return (
    <RootDocument>
      <AntdStyleCacheProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: hearthstoneTheme.colorPrimary,
              colorBgContainer: hearthstoneTheme.colorBgContainer,
              colorBgElevated: hearthstoneTheme.colorBgElevated,
              colorBorder: hearthstoneTheme.colorBorder,
              colorText: hearthstoneTheme.colorText,
              colorTextSecondary: hearthstoneTheme.colorTextSecondary,
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <SearchContext.Provider value={searchContextValue}>
              <AppLayout />
            </SearchContext.Provider>
          </QueryClientProvider>
        </ConfigProvider>
      </AntdStyleCacheProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body
        className="app-body"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function AppLayout() {
  const { setSearchTerm } = useSearch()
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchInput = useDebouncedValue(searchInput, 300)

  useEffect(() => {
    setSearchTerm(normalizeSearchTerm(debouncedSearchInput))
  }, [debouncedSearchInput, setSearchTerm])

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        <div className="app-container app-container--header">
          <div className="app-header-inner">
            {/* Logo and Title */}
            <div className="app-brand">
              <img
                src="/favicon.ico"
                alt="Hearthstone"
                className="app-brand-logo"
              />
              <h1
                className="app-brand-title"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Hearthstone Cards
              </h1>
            </div>

            {/* Search Input */}
            <div className="app-search">
              <Input.Search
                placeholder="Search cards..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                allowClear
                size="middle"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main app-container">
        <Outlet />
      </main>
    </div>
  )
}
