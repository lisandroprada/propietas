export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
}

const data: IMenuItem[] = [
  {
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.vien',
    to: '/app/vien',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: '/app/vien/start'
      }
    ]
  },
  {
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.second-menu',
    to: '/app/second-menu',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: '/app/second-menu/second'
      }
    ]
  },
  {
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: '/app/blank-page'
  },
  {
    icon: 'iconsminds-bucket',
    label: 'menu.clientes',
    to: '/app/clientes'
  },
  {
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://vien-docs.coloredstrategies.com/',
    newWindow: true
  }
];
export default data;
