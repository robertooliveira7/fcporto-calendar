export const NAVIGATION = [
  {
    label: "Início",
    href: "/",
  },
  {
    label: "Jogos",
    href: "/fixtures",
  },
  {
    label: "Competições",
    href: "/competitions",
    children: [
      {
        label: "Liga",
        href: "/competitions/liga",
      },
      {
        label: "Taça de Portugal",
        href: "/competitions/taca-portugal",
      },
      {
        label: "Taça da Liga",
        href: "/competitions/taca-liga",
      },
      {
        label: "Liga dos Campeões",
        href: "/competitions/champions-league",
      },
    ],
  },
] as const;