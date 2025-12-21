declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare class ProductQueryDto {
    search?: string;
    page: number;
    limit: number;
    sort?: SortOrder;
}
export {};
