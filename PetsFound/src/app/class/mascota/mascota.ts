import { Dueno } from '../dueno/dueno'
import { Raza } from '../raza/raza';

export class Mascota {
    id!: number;
    nombre!: string;
    tipo!: string;
    raza!: Raza;
    edad!: number;
    descripcion!: string;
    dueno!: Dueno;
}
