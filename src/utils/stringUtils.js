export function shorten(address) {
  const beginning = address.substring(0, 6);
  const ending = address.substring(address.length - 4);
  return beginning.concat("...", ending);
}

export function badgeColorSwitcher(i) {
  switch (i % 7) {
    case 0:
      return "info";
    case 1:
      return "primary";
    case 2:
      return "dark";
    case 3:
      return "warning";
    case 4:
      return "danger";
    case 5:
      return "info";
    case 6:
      return "light";
    default:
      return "dark";
  }
}
