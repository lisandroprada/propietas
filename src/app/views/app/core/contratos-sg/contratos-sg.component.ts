import { Component, OnInit, ViewChild } from "@angular/core";
import { ContratosService } from "src/app/services/contratos.service";
import { HotkeysService, Hotkey } from "angular2-hotkeys";
import { Contrato } from "src/app/models/contrato";
import { ContextMenuComponent } from "ngx-contextmenu";
import { ContratoModalComponent } from "src/app/containers/pages/core/modal/contrato-modal/contrato-modal.component";

@Component({
  selector: "app-contratos-sg",
  templateUrl: "./contratos-sg.component.html",
  styles: [],
})
export class ContratosSgComponent implements OnInit {
  displayMode = "list";
  displayModeThumb = false;
  displayModeImg = false;
  selectAllState = "";
  statusColor = "secondary";
  selected: Contrato[] = [];
  data: any;
  cliente: Contrato[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = "";
  orderBy = "";
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOptionsOrders = [
    { label: "Apellido", value: "customerLastName" },
    { label: "Documento", value: "identityCard" },
  ];
  itemOrderLabel = "Apellido";
  itemOrderValue = "customerLastName";

  @ViewChild("basicMenu") public basicMenu: ContextMenuComponent;
  @ViewChild("addNewModalRef", { static: true })
  addNewModalRef: ContratoModalComponent;

  constructor(
    private _contratoService: ContratosService,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeysService.add(
      new Hotkey("ctrl+a", (event: KeyboardEvent): boolean => {
        this.selected = [...this.data];
        return false;
      })
    );
    this.hotkeysService.add(
      new Hotkey("ctrl+d", (event: KeyboardEvent): boolean => {
        this.selected = [];
        return false;
      })
    );
  }

  ngOnInit(): void {
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy
    );
  }

  loadData(
    pageSize: number = 3,
    currentPage: number = 1,
    search: string = "",
    orderBy: string = ""
  ) {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this._contratoService
      .getContratosSG(pageSize, currentPage, search, orderBy)
      .subscribe(
        (data: any) => {
          if (data.status) {
            console.log(data);
            this.isLoading = false;
            this.data = data.contratos;
            this.cliente = data.contratos;
            this.totalItem = data.totalItem;
            this.totalPage = data.totalPage;
            this.setSelectAllState();
          } else {
            this.endOfTheList = true;
          }
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }
  changeDisplayMode(mode) {
    this.displayMode = mode;
  }

  showAddNewModal() {
    this.addNewModalRef.show();
  }

  isSelected(p: Contrato) {
    return this.selected.findIndex((x) => x._id === p._id) > -1;
  }
  onSelect(item: Contrato) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter((x) => x._id !== item._id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.data.length) {
      this.selectAllState = "checked";
    } else if (this.selected.length !== 0) {
      this.selectAllState = "indeterminate";
    } else {
      this.selectAllState = "";
    }
  }
  selectAllChange($event) {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number) {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any) {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event) {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }

  onContextMenuClick(action: string, item: Contrato) {
    console.log(
      "onContextMenuClick -> action :  ",
      action,
      ", item.identityCard :",
      item._id
    );
  }

  onSubmit() {}
}
