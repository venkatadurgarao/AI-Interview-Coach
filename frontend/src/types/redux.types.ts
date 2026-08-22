export type snackbarType = {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
}

