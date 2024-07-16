export class RolDto {
    rol_id?: number;
    rol_nombre: string;

    constructor(rol_nombre: string, rol_id?: number) {
        this.rol_id = rol_id;
        this.rol_nombre = rol_nombre;
    }
}