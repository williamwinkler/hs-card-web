import { createContext, useContext, useState } from 'react'
import { StyleProvider, createCache } from '@ant-design/cssinjs'

const AntdStyleCacheContext = createContext<ReturnType<
  typeof createCache
> | null>(null)

export function AntdStyleCacheProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const providedCache = useContext(AntdStyleCacheContext)
  const [clientCache] = useState(() => providedCache ?? createCache())

  return (
    <StyleProvider cache={providedCache ?? clientCache} hashPriority="high">
      {children}
    </StyleProvider>
  )
}

export const AntdStyleCacheContextProvider = AntdStyleCacheContext.Provider
