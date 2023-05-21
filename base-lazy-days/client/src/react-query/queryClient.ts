/**
 * The above code defines a function to handle errors in React Query and creates a QueryClient instance
 * with a QueryCache that uses the error handler.
 * @param {unknown} error - The `error` parameter is a variable of type `unknown` that represents any
 * error that may occur during the execution of a function or code block. It is used as a parameter in
 * the `queryErrorHandler` function to handle errors that may occur during the execution of a query.
 */
import { createStandaloneToast } from '@chakra-ui/react';
import { QueryCache, QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });
function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  /// ////////////////////////////
  // NOTE: no toast.closeAll() //
  /// ////////////////////////////

  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
});
