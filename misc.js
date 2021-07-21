function reverse(s){
    return s.split("").reverse().join("");
}

export function formatPrice(price) {
  let formatted = "";
  for (let i=price.toString().length-1, j = 0; i>=0; i--, j++) {
    if (j > 0 && j % 3 == 0) {
      formatted += '.'
    }
    formatted += price.toString()[i];
  }
  return reverse(formatted);
}
