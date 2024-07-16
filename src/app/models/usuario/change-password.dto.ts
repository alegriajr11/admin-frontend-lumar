export class ChangePasswordDto {

    resetPasswordCode: string;
    usu_password: string

    constructor(resetPasswordCode: string, usu_password: string) {
        this.resetPasswordCode = resetPasswordCode;
        this.usu_password = usu_password;
    }

}