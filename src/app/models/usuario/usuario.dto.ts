
export class UsuarioDto {
    usu_id?: number
    usu_identifiacion: string
    usu_nombre: string
    usu_apellido: string
    usu_email: string
    usu_nombreUsuario: string
    resetPasswordToken: string
    usu_estado: string
    usu_imagen: string
    usu_creado: string
    roles: Rol;

    constructor(
        usu_identifiacion: string,
        usu_nombre: string,
        usu_apellido: string,
        usu_email: string,
        usu_nombreUsuario: string,
        resetPasswordToken: string,
        usu_estado: string,
        usu_imagen: string,
        usu_creado: string,
        roles: Rol
    ){
        this.usu_identifiacion = usu_identifiacion
        this.usu_nombre = usu_nombre
        this.usu_apellido = usu_apellido
        this.usu_email = usu_email
        this.usu_nombreUsuario = usu_nombreUsuario
        this.usu_estado = usu_estado
        this.usu_imagen = usu_imagen
        this.usu_creado = usu_creado
        this.resetPasswordToken = resetPasswordToken;
        this.roles = roles;
    }
}

// Definición de la interfaz Rol para representar la estructura de los objetos de rol
interface Rol {
    rol_id: number;
    rol_nombre: string;
}


