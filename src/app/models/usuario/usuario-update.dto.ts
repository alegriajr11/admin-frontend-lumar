export class UpdaterUsuarioDto {
    usu_nombre?: string;
    usu_apellido?: string;
    usu_nombreUsuario?: string;
    usu_estado?: string;
    usu_email: string; // Campo requerido
    rolId?: number;
}