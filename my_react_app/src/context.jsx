import React, { createContext, useState } from 'react';

// Step 1: Create a context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Step 3: Create a state to store the received data within the context provider
  const [responseData, setResponseData] = useState(null);

  return (
    // Step 4: Wrap your component with the context provider and pass the state and setter function to the provider value
    <DataContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </DataContext.Provider>
  );
};
