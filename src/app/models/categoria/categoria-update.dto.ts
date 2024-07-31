export class UpdateCategoriaDto {
    cat_id?: number;
    cat_nombre: string;
    seccion: Seccion;
    

    constructor(cat_nombre: string, seccion: Seccion, cat_id?: number) {
        this.cat_id = cat_id;
        this.cat_nombre = cat_nombre;
        this.seccion = seccion;
    }
}

interface Seccion {
    secc_id: number
    secc_nombre: string
}