import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


type Props = {
    toast_status: string,
    toast_msg: string
}

const Toaster = ({ toast_status, toast_msg }: Props) => {

    const [show, setShowToaster] = useState(true);

    return (
        <Toast onClose={() => setShowToaster(false)} show={show} delay={5000} autohide >
            <Toast.Header>
                <span>{
                    toast_status === 'Success' ? <FontAwesomeIcon style={{ color: "green", fontSize: "1.5rem" }} icon={faCircleCheck} /> :
                        <FontAwesomeIcon style={{ color: "red", fontSize: "1.5rem" }} icon={faCircleXmark} />
                }</span>
                <strong className="me-auto px-3" style={{ fontSize: "1rem" }}>{toast_status}</strong>
            </Toast.Header>
            <Toast.Body className="px-5" style={{ fontSize: "1rem" }}>{toast_msg}</Toast.Body>
        </Toast>
    )

}

export default Toaster;