export class CategoriaDto {
    cat_id?: number;
    cat_nombre: string;
    seccionId: number;

    constructor(cat_nombre: string, seccionId: number, cat_id?: number) {
        this.cat_id = cat_id;
        this.cat_nombre = cat_nombre;
        this.seccionId = seccionId;
    }
}