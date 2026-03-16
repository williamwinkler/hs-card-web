import ReactDOMServer from 'react-dom/server'
import { extractStyle, createCache } from '@ant-design/cssinjs'
import {
  StartServer,
  createStartHandler,
  defineHandlerCallback,
  type RequestHandler,
} from '@tanstack/react-start/server'

import { AntdStyleCacheContextProvider } from '~/lib/antd-style-cache'

const fetch = createStartHandler(
  defineHandlerCallback(({ router, responseHeaders }) => {
    const styleCache = createCache()
    let html = ReactDOMServer.renderToString(
      <AntdStyleCacheContextProvider value={styleCache}>
        <StartServer router={router} />
      </AntdStyleCacheContextProvider>,
    )

    const antdStyles = extractStyle(styleCache)
    if (antdStyles) {
      html = html.replace('</head>', `${antdStyles}</head>`)
    }

    router.serverSsr!.setRenderFinished()

    const injectedHtml = router.serverSsr!.takeBufferedHtml()
    if (injectedHtml) {
      html = html.replace('</body>', `${injectedHtml}</body>`)
    }

    return new Response(`<!DOCTYPE html>${html}`, {
      status: router.state.statusCode,
      headers: responseHeaders,
    })
  }),
)

export type ServerEntry = { fetch: RequestHandler<any> }

export default {
  async fetch(...args) {
    return await fetch(...args)
  },
} satisfies ServerEntry
