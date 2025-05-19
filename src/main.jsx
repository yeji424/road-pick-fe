import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/AppRouter'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './app'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store/store'
import { ModalProvider } from './hooks/useModal'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 1번만 재시도
      refetchOnWindowFocus: false, // 창 포커스시 자동 리페치 비활성화
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
