export class LoginUsuarioDto {

    usu_nombreUsuario: string;

    usu_password: string;

    constructor(usu_nombreUsuario: string, usu_password: string) {
        this.usu_nombreUsuario = usu_nombreUsuario;
        this.usu_password = usu_password;
    }

}