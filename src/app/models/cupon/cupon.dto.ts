export class CuponDto {
    cup_id?: number;
    cup_titulo: string;
    cup_codigo: string;
    cup_descripcion: string;
    cup_fecha_inicio: string;
    cup_fecha_final: string;
    cup_estado: string
    cup_cantidad_descuento: number;
    tipoDescuentoTipId: number;
    categoria: Categoria;

    constructor(
        cup_titulo: string,
        cup_codigo: string,
        cup_descripcion: string,
        cup_fecha_inicio: string,
        cup_fecha_final: string,
        cup_cantidad_descuento: number,
        tipoDescuentoTipId: number,
        categoria: Categoria,
        cup_id?: number
    ) {
        this.cup_id = cup_id;
        this.cup_titulo = cup_titulo;
        this.cup_codigo = cup_codigo;
        this.cup_descripcion = cup_descripcion;
        this.cup_fecha_inicio = cup_fecha_inicio;
        this.cup_fecha_final = cup_fecha_final;
        this.cup_cantidad_descuento = cup_cantidad_descuento;
        this.tipoDescuentoTipId = tipoDescuentoTipId;
        this.categoria = categoria;
    }
    
}

interface Categoria {
    cat_id: number;
    cat_nombre: string;
}