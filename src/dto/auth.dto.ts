export interface AuthDto {
    nombre: string;
    id_rol: number;
    email: string;
    password: string;
}

export interface AuthResponseDto {
    userId: number;
    token: string;
    role: string;
}