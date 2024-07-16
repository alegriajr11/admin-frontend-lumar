import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioDto } from 'src/app/models/usuario/usuario.dto';
import { UsuariosService } from '../../service/usuarios/usuarios.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile: boolean;

  //RUTA IMG USUARIOS
  private usuarioIMG_URL = environment.usuarioIMG_URL

  usu_id: number
  //DTO USUARIO
  usuarioDto: UsuarioDto
  //LISTA VACIA
  listaVacia: any = undefined

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(
    public navServices: NavService,
    private tokenService: TokenService,
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

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

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/auth/login']);
  }

  getUserImageUrl(imageName: string): string {
    return this.usuarioIMG_URL + imageName; // Construye la URL completa de la imagen
  }
}
