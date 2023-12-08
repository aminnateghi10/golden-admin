import React, {useState} from 'react';
import {PaymentsDataInterface} from "../contracts/userInterface";
import {moneyFormat} from "../shared/moneyFormat";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

interface PropsInterface {
    data: PaymentsDataInterface,
    deleteData: (id: number) => void
}

const ItemPayments = ({data, deleteData}: PropsInterface) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteHandler = () => {
        deleteData(data.id);
        setShow(false)
    }

    return (
        <>
            <tr className="text-nowrap">
                <td>1</td>
                <td>{data.payer.name}</td>
                <td>{data.paid.name}</td>
                <td className="text-center">{moneyFormat(data.amount)}</td>
                <td>{data.created_at_jalali}</td>
                <td className="text-center">
                    <Link to={{
                        pathname:'/edit-payment',
                        search:data.id.toString()
                    }} className="btn btn-alt-warning">ویرایش</Link>
                    <button onClick={handleShow} className="btn btn-alt-danger payment-delete-btn">حذف</button>
                </td>
            </tr>

            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>آیا مطمئن هستید؟</Modal.Title>
                </Modal.Header>
                <Modal.Body>بعد از حذف هزینه دیگر قادر به بازیابی نخواهید بود!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>انصراف</Button>
                    <Button variant="danger" onClick={deleteHandler}>بله حذف شود</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ItemPayments;