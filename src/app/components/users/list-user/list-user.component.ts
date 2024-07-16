import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsuarioDto } from 'src/app/models/usuario/usuario.dto';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { TableService } from 'src/app/shared/service/table.service';
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
  //LISTA VACIA
  listaVacia: any = undefined


  public page = 1
  public pageSize = 10
  

  //RUTA IMG USUARIOS
  private usuarioIMG_URL = environment.usuarioIMG_URL

  public tableItem$: Observable<UserListDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private usuarioService: UsuariosService,
    private toastrService: ToastrService,
  ) { }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


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

  getUserImageUrl(imageName: string): string {
    return this.usuarioIMG_URL + imageName; // Construye la URL completa de la imagen
  }

}

