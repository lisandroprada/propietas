import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ApiService } from 'src/app/data/api.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html'
})
export class SecondComponent implements OnInit {
  displayMode = 'list';
  selectAllState = '';
  selected: Cliente[] = [];
  data: Cliente[] = [];
  cliente: Cliente[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(private apiService: ApiService,
              private hotkeysService: HotkeysService) {
      this.hotkeysService.add(new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
        this.selected = [...this.data];
        return false;
      }));
      this.hotkeysService.add(new Hotkey('ctrl+d', (event: KeyboardEvent): boolean => {
        this.selected = [];
        return false;
      }));
      }

  ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  loadData(pageSize: number = 3, currentPage: number = 1, search: string = '', orderBy: string = '') {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this.apiService.getProducts(pageSize, currentPage, search, orderBy).subscribe(
      data => {
        if (data.status) {
          this.isLoading = false;
          this.data = data.clientes;
          this.cliente = data.clientes;
          this.totalItem = data.totalItem;
          this.totalPage = data.totalPage;
          this.setSelectAllState();
          console.log(data);
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
  }


  setSelectAllState() {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }

  }
}
