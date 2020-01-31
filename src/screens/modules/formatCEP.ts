function formatCEP(value: string) {
  let onlyNumber = value.replace(/\D/g, '');
  let unformatArr = onlyNumber.split('');
  if (unformatArr.length >= 3 && unformatArr.length <= 5) {
    unformatArr.splice(2, 0, '.');
  } else if (unformatArr.length > 5) {
    unformatArr.splice(2, 0, '.');
    unformatArr.splice(6, 0, '-');
  }
  return unformatArr.join('');
}
export default formatCEP;