export function rupiahFormat(number) {
    return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

export function numberFormat(value) {
    return value.toLocaleString('id-ID');
}