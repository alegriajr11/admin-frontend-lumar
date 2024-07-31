import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RolDto } from 'src/app/models/rol/rol.dto';
import { UsuarioDto } from 'src/app/models/usuario/usuario.dto';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { TableService } from 'src/app/shared/service/table.service';
import { RolService } from 'src/app/shared/service/usuarios/rol.service';
import { UsuariosService } from 'src/app/shared/service/usuarios/usuarios.service';
import { UserListDB, USERLISTDB } from 'src/app/shared/tables/list-users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListUserComponent implements OnInit {
  public user_list = []

  public closeResult: string;

  modalRef: NgbModalRef;

  //DTO USUARIO
  usuarioDto: UsuarioDto[];

  //ID DEL USUARIO
  usu_id: number

  //LISTA VACIA
  listaVacia: any = undefined

  upadteUserForm: FormGroup

  //DTO del Rol
  rolDto: RolDto[]

  public page = 1
  public pageSize = 10


  //RUTA IMG USUARIOS
  private usuarioIMG_URL = environment.usuarioIMG_URL

  public tableItem$: Observable<UserListDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private usuarioService: UsuariosService,
    private toastrService: ToastrService,
    private rolServices: RolService
  ) {
    this.upadteUserForm = this.fb.group({
      usu_nombre: ['', [Validators.required]],
      usu_apellido: ['', [Validators.required]],
      usu_nombreUsuario: ['', [Validators.required]],
      usu_estado: ['', [Validators.required]],
      usu_email: ['', [Validators.required, Validators.email]],
      rolId: ['', [Validators.required]],
    });
  }



  //Abrir Modal
  open(content) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  //CARGAR USUARIO AL FORMULARIO
  loadUserData(userId: number) {
    this.usu_id = userId
    //Consultar el usuario a actualizar
    this.usuarioService.getOneUser(this.usu_id).subscribe(data => {
      this.upadteUserForm.patchValue({
        usu_nombre: data.usu_nombre,
        usu_apellido: data.usu_apellido,
        usu_nombreUsuario: data.usu_nombreUsuario,
        usu_estado: data.usu_estado,
        usu_email: data.usu_email,
        rolId: data.roles.rol_id,
      });
    });
  }

  //LISTAR TODOS LOS USUARIOS
  getAllUsers() {
    this.usuarioService.getAllUsers().subscribe(
      data => {
        this.usuarioDto = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message
      }
    )
  }

  //Obtener los roles
  getAllRoles(): void {
    this.rolServices.getAllRoles().subscribe(
      data => {
        this.rolDto = data
      },
      err => {
        err.error.message
      }
    )
  }

  getUserImageUrl(imageName: string): string {
    return this.usuarioIMG_URL + imageName; // Construye la URL completa de la imagen
  }

  onSubmitUpdate() {
    if (this.upadteUserForm.valid) {
      const updateData = this.upadteUserForm.value;
      this.usuarioService.updateUser(this.usu_id, updateData).subscribe(
        response => {
          this.toastrService.success(response.message, 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.modalRef.close();
          this.getAllUsers();
        },
        error => {
          this.toastrService.error(error.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }
}

