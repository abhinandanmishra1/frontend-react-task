import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import UserList from './UserList';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="w-full">
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
