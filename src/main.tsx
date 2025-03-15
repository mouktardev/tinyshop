import { routeTree } from '@/routeTree.gen';
import {
  tablesSchema,
  Provider as TinyBaseProvider,
  useCreateIndexes,
  useCreateMetrics,
  useCreateQueries,
  useCreateStore,
  valuesSchema,
} from '@/schema/tinybase-schema';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createIndexes, createMetrics, createQueries, createStore } from 'tinybase/with-schemas';
import { ThemeProvider } from './components/theme-provider';
import { initialTables } from './constant/seed';
import './styles.css';
// Import the generated route tree

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    store: undefined!,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption {
    title?: string;
    description?: string;
  }
}

export function App() {
  const store = useCreateStore(() =>
    createStore().setSchema(tablesSchema, valuesSchema).setTables(initialTables)
  );
  const queries = useCreateQueries(store, createQueries, []);
  const indexes = useCreateIndexes(store, (store) =>
    createIndexes(store)
      .setIndexDefinition('by_tags', 'products', 'tags')
  );
  const metrics = useCreateMetrics(store, (store) =>
    createMetrics(store)
      .setMetricDefinition('total_products', 'cart', 'sum', 'amount')
      .setMetricDefinition('total_price', 'cart', 'sum', 'totalPrice')
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <TinyBaseProvider store={store} metrics={metrics} queries={queries} indexes={indexes}>
        <RouterProvider router={router} context={{ store }} />
      </TinyBaseProvider>
    </ThemeProvider>
  );
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
