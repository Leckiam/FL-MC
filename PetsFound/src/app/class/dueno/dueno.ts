import { User } from "../user/user";

export class Dueno {
    id!: number;
    correo!: string;
    nombre!: string;
    ap_paterno!: string;
    ap_materno!: string;
    edad!: number;
    celular!: number;
    user!:User;
}
