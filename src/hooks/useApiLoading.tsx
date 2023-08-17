import { useState, useEffect } from 'react';
import { ApiError } from '../api/auth';


function useApiLoading<T>(apiCall: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<ApiError | null>(null);

  const execute = async () => {
    setIsLoading(true);
    try {
      const data = await apiCall();
      setData(data);
    } catch (error) {
      setError(error as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, execute };
}

export default useApiLoading;