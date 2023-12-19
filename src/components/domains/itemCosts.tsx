import React, {useState} from 'react';
import {CostsInterface} from "../contracts/userInterface";
import {Link, useLocation} from "react-router-dom";
import callApi from "../../helpers/callApi";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {deleteCost, setCosts} from "../../store/costs";
import {Button, Modal} from "react-bootstrap";

interface PropsInterface {
    data: {
        domain:string,
        id:number,
    },
    deleteHandler:( id:number)=>void ,
    index:number
}

const ItemCosts = ({data , deleteHandler,index}: PropsInterface) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr className="cost-row tr-border-color border">
                <td>{index}</td>
                <td>{data.domain}</td>
                <td className="text-center text-nowrap">
                    <Link to={`/domains/${data.id}`} className="btn btn-alt-warning ml-1">ویرایش</Link>
                    <button onClick={handleShow} className="btn btn-alt-danger cost-delete-btn">حذف</button>
                </td>
            </tr>

            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>آیا مطمئن هستید؟</Modal.Title>
                </Modal.Header>
                <Modal.Body>بعد از حذف هزینه دیگر قادر به بازیابی نخواهید بود!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        انصراف
                    </Button>
                    <Button variant="danger" onClick={()=>deleteHandler(data.id)}>
                        بله حذف شود
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ItemCosts;
