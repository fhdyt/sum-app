import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

function SuccessAlert(title, text) {
    const MySwal = withReactContent(Swal);
    return MySwal.fire({
        title: title,
        text: text,
        icon: 'success',
    })
}
function ErrorAlert(title, text) {
    const MySwal = withReactContent(Swal);
    return MySwal.fire({
        title: title,
        text: text,
        icon: 'error',
    })
}

const ConfirmAlert = (title, text, confirmButtonText, showCancelButton) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton,
    });
};

export { SuccessAlert, ErrorAlert, ConfirmAlert }

