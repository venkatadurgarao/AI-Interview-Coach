export type LoginCredentialType = {
    user_email: string;
    user_pass: string;
}
export type LoginResponse = {
    login: string
}
export type LoginCredentialErrorType = {
    user_email?: string | null;
    user_pass?: string | null;
    login_error?: string | null;
}

export type RegisterUserType = {
    user_email: string;
    user_fname: string;
    user_lname: string;
    user_pass: string;
    confirm_pass: string;
}


