import { Dueno } from '../dueno/dueno';

export class Mascota {
    id!: string;
    nombre!: string;
    tipo!: string;
    raza!: string;
    edad!: number;
    descripcion!: string;
    dueno!: Dueno;
}
