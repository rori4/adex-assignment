export function shorten(address) {
  const beginning = address.substring(0, 6);
  const ending = address.substring(address.length - 4);
  return beginning.concat("...", ending);
}
