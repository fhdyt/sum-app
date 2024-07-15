export function getStatusClass(status) {
    switch (status) {
        case 'Menunggu Pembayaran':
            return 'bg-gray-200';
        case 'Menunggu Konfirmasi':
            return 'bg-yellow-200';
        case 'Persiapan Pengantaran':
            return 'bg-orange-200';
        case 'Proses Antar':
            return 'bg-purple-200';
        case 'Diproses':
            return 'bg-green-200';
        case 'Selesai':
            return 'bg-blue-200';
        case 'Batal':
            return 'bg-red-200';
        default:
            return 'bg-gray-200';
    }
}