export const databaseQueryFactory = (pageNumber: string, pageCount: string, sortBy: string) => {
    return `?_page=${pageNumber}&_per_page=${pageCount}&${sortBy}`;
};
