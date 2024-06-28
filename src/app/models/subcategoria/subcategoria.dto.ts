export class SubcategoriaDto {
    sub_id?: number;
    sub_nombre: string;
    categoria: Categoria[];

    constructor(sub_id: number, sub_nombre: string, categoria: Categoria[]) {
        this.sub_id = sub_id;
        this.sub_nombre = sub_nombre;
        this.categoria = categoria;
    }
}

// Definición de la interfaz Categoria para representar la estructura de los objetos de las categorias
interface Categoria {
    cat_id: number;
    cat_nombre: string;
}

