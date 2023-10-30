import useSWR from "swr";

export function useData(id: string) {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users`,
    {
      fetcher: (url: string) => fetch(url).then((res) => res.json()),
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
