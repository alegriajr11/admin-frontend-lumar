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

// Definición de la interfaz Seccion para representar la estructura de los objetos de las secciones
interface Seccion {
    secc_id: number;
    secc_nombre: string;
}

