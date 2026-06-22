export type LoginCredentialType = {
    user_email: string;
    user_pass: string;
}
export type LoginCredentialErrorType = {
    user_email?: string | null;
    user_pass?: string | null;
    login_error?: string | null;
}