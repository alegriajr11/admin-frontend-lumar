export class SeccionDto {
    secc_id?: number;
    secc_nombre: string;

    constructor(secc_nombre: string, secc_id?: number){
        this.secc_id = secc_id;
        this.secc_nombre = secc_nombre;
    }
}