export class CategoriaDto {
    cat_id?: number;
    cat_nombre: string;
    seccion: Seccion[];

    constructor(cat_id: number, cat_nombre: string, seccion: Seccion[]) {
        this.cat_id = cat_id;
        this.cat_nombre = cat_nombre;
        this.seccion = seccion;
    }
}

// Definición de la interfaz Seccion para representar la estructura de los objetos de las secciones
interface Seccion {
    secc_id: number;
    secc_nombre: string;
}

