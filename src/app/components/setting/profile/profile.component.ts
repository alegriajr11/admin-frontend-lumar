import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from 'src/app/models/usuario/usuario.dto';
import { TokenService } from 'src/app/shared/service/token.service';
import { UsuariosService } from 'src/app/shared/service/usuarios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public active = 1;

  //RUTA SOLICUTD IMG
  usuarioIMG_URL = environment.usuarioIMG_URL

  usu_id: number
  //DTO USUARIO
  usuarioDto: UsuarioDto
  //LISTA VACIA
  listaVacia: any = undefined

  constructor(
    private usuarioService: UsuariosService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getIdUser();
    this.getOneUser();
  }


  //OBTENER UN USUARIO
  getOneUser(): void{
    this.usuarioService.getOneUser(this.usu_id).subscribe(
      data => {
        this.usuarioDto = data
      },
      err =>{
        this.listaVacia = err.error.message
      }
    )
  }

  getIdUser(): void{
    this.usu_id =  this.tokenService.getUserId();
  }

  //OBTENER LA IMAGEN DEL USUARIO

  getUserImageUrl(imageName: string): string {
    return this.usuarioIMG_URL + imageName; // Construye la URL completa de la imagen
  }

}
