export function dateFormat(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
}

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}