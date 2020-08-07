import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { AddNewProductModalComponent } from 'src/app/containers/pages/add-new-product-modal/add-new-product-modal.component';
import { Inmueble } from 'src/app/models/inmueble';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { HotkeysService } from 'angular2-hotkeys';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: [
  ]
})
export class InmueblesComponent implements OnInit {

  selected: Inmueble[] = [];
  data: Inmueble[] = [];
  inmueble: Inmueble[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  displayMode = 'list';
  displayModeThumb = false;
  displayModeImg = false;
  selectAllState = '';
  statusColor = 'secondary';
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  isLoading: boolean;
  itemOptionsOrders = [{ label: 'Apellido', value: 'customerLastName' }, { label: 'Documento', value: 'identityCard' }];
  itemOrderLabel = 'Apellido';
  itemOrderValue = 'customerLastName';

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;
  constructor(private inmuebleService: InmuebleService,
              private hotkeysService: HotkeysService) { }

  ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  loadData(pageSize: number = 3, currentPage: number = 1, search: string = '', orderBy: string = '') {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this.inmuebleService.getInmuebles(pageSize, currentPage, search, orderBy).subscribe(
      data => {
        if (data.status) {
          this.isLoading = false;
          this.data = data.inmuebles;
          this.inmueble = data.inmuebles;
          this.totalItem = data.totalItem;
          this.totalPage = data.totalPage;
          console.log(data.inmuebles);
          this.setSelectAllState();
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
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

  isSelected(p: Inmueble) {
    return this.selected.findIndex(x => x._id === p._id) > -1;
  }

  onSelect(item: Inmueble) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x._id !== item._id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
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

  onContextMenuClick(action: string, item: Inmueble) {
    console.log('onContextMenuClick -> action :  ', action, ', item._id :', item._id);
  }
}
