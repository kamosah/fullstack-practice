import { useInfiniteQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import type { ListDocumentsQuery, DocumentFilter } from "../types/graphql";

const LIST_DOCUMENTS = gql`
  query ListDocuments($filter: DocumentFilter, $limit: Int!, $offset: Int!) {
    listDocuments(filter: $filter, limit: $limit, offset: $offset) {
      id
      title
      content
      category
      createdAt
    }
  }
`;

const useDocuments = (filter: DocumentFilter = {}, limit = 10) => {
  return useInfiniteQuery<ListDocumentsQuery>({
    queryKey: ["documents", filter, limit],
    queryFn: async ({ pageParam = 0 }) => {
      return request("http://localhost:8000/graphql", LIST_DOCUMENTS, {
        filter,
        limit,
        offset: pageParam as number,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than the limit, we've reached the end
      if (lastPage.listDocuments.length < limit) {
        return undefined;
      }
      // Calculate the next offset based on all pages loaded so far
      return allPages.length * limit;
    },
    initialPageParam: 0,
  });
};

export default useDocuments;
