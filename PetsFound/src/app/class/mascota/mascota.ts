import { Dueno } from '../dueno/dueno'

export class Mascota {
    id!: number;
    nombre!: string;
    raza!: string;
    edad!: number;
    descripcion!: string;
    dueno!: Dueno;
}