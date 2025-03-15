import { format } from 'date-fns';
import * as UiReact from 'tinybase/ui-react/with-schemas';

export const tablesSchema = {
  products: {
    name: { type: 'string' },
    price: { type: 'number' },
    image: { type: 'string' },
    tags: { type: 'string' },
    description: { type: 'string' },
  },
  cart: {
    name: { type: 'string' },
    price: { type: 'number' },
    totalPrice: { type: 'number' },
    image: { type: 'string' },
    amount: { type: 'number' },
  },
} as const;

export const valuesSchema = {
  version: { type: 'string', default: '0.0.0' },
  year: { type: 'string', default: format(new Date(), 'y') },
  open: { type: 'boolean', default: false },
} as const;


const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
  [typeof tablesSchema, typeof valuesSchema]
>;

export const {
  Provider,
  useCreateIndexes,
  useCreateRelationships,
  useCreatePersister,
  useCreateQueries,
  useCreateMetrics,
  useCreateStore,
  CellProps,
  useTable,
  useTablesListener,
  useTableListener,
  useResultTable,
  useResultRow,
  RowView,
  RowProps,
  useAddRowCallback,
  useCell,
  useValue,
  useHasValue,
  useHasRow,
  useDelRowCallback,
  useRowIds,
  useSetPartialRowCallback,
  useRowListener,
  useSetPartialValuesCallback,
  useRelationships,
  RemoteRowView,
  useQueries,
  useResultCell,
  useResultSortedRowIds,
  useResultRowIds,
  useResultTableCellIds,
  useSetCellCallback,
  useSliceIds,
  useIndexes,
  IndexView,
  useSliceRowIds,
  SliceProps,
  SliceView,
  useMetric,
  useStore,
  useLocalRowIds,
  CellView,
  ResultCellProps,
  ResultCellView,
  ResultRowView,
} = UiReactWithSchemas;
