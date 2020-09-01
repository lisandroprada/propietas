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
    icon: "iconsminds-air-balloon-1",
    label: "menu.vien",
    to: "/app/vien",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.start",
        to: "/app/vien/start",
      },
    ],
  },
  {
    icon: "iconsminds-three-arrow-fork",
    label: "menu.second-menu",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/second-menu/second",
      },
    ],
  },
  {
    icon: "iconsminds-three-arrow-fork",
    label: "menu.core",
    to: "/app/core",
    subs: [
      {
        icon: "iconsminds-male-female",
        label: "menu.clientes",
        to: "/app/core/clientes",
      },
      {
        icon: "iconsminds-home",
        label: "menu.inmuebles",
        to: "/app/core/inmuebles",
      },
      {
        icon: "iconsminds-diploma-2",
        label: "menu.contratos",
        to: "/app/core/contratos",
      },
      {
        icon: "iconsminds-diploma-2",
        label: "menu.contratos-sg",
        to: "/app/core/contratos-sg",
      },
    ],
  },
  {
    icon: "iconsminds-bucket",
    label: "menu.blank-page",
    to: "/app/blank-page",
  },
  {
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://vien-docs.coloredstrategies.com/",
    newWindow: true,
  },
];
export default data;
