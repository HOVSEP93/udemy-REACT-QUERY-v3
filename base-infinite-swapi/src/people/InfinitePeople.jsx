import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

import { v4 as uuidv4 } from "uuid";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const uiId = uuidv4();

  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetching,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div>there are {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.uiId}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
