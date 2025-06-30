export type SuccessResponse = {
    message: string;
}

export type ErrorResponse = {
    error: {
        title       : string;
        description?: string;
        trace      ?: string;
    }
}