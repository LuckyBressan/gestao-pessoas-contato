export type ErrorMessage = {
    error: {
        title      : string;
        description: string;
        trace     ?: unknown;
    }
}