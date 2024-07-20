export class TipoDescuentoDto {
    tip_id?: number
    tip_nombre: string

    constructor(tip_nombre: string){
        this.tip_nombre = tip_nombre;
    }
}