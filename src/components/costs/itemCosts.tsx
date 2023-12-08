import React, {useState} from 'react';
import {CostsInterface} from "../contracts/userInterface";
import {Link, useLocation} from "react-router-dom";
import callApi from "../../helpers/callApi";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {deleteCost, setCosts} from "../../store/costs";
import {Button, Modal} from "react-bootstrap";

interface PropsInterface {
    data: CostsInterface
}

const ItemCosts = ({data}: PropsInterface) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let deleteHandler = async () => {
        let res = await callApi().delete(`/costs/${data.id}`);
        try {
            dispatch(deleteCost(data.id))
            callApi().get(`/costs${location.search}`).then(response => dispatch(setCosts(response.data.result)))
            toast.success(res.data.message.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <tr className="cost-row tr-border-color">
                <td>
                </td>
                <td>1</td>
                <td>{data.title}</td>
                <td className="text-center">{data.amount}</td>
                <td className="text-nowrap">{data.user.name}</td>
                <td className="text-nowrap">{data.created_at_jalali}</td>
                <td className="text-nowrap text-info font-size-lg text-center" title="49,575">50,000</td>
                <td className="text-center text-nowrap">
                    <Link to={`/costs/${data.id}`} className="btn btn-alt-warning">ویرایش</Link>
                    <a href="https://hesab.t-nateghi.ir/costs/1323/portions" className="btn btn-alt-info">ویرایش سهم
                        افراد</a>
                    <button onClick={handleShow} className="btn btn-alt-danger cost-delete-btn">حذف</button>
                </td>
            </tr>
            <tr className="cost-users-row tr-border-color ">
                <td/>
                <td colSpan={7}>{
                    data.users?.map(item =>
                        data.user.id == item.id
                            ? <span key={item.id} title={item.user_portion_amount.toString()}
                                    className="badge badge-custom text-primary">{item.name}</span>
                            : <span key={item.id} title={item.user_portion_amount.toString()}
                                    className="badge badge-custom ">{item.name}</span>)
                }</td>
            </tr>
            <tr className="spacer">
                <td className="p-0" colSpan={8}/>
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
                    <Button variant="danger" onClick={deleteHandler}>
                        بله حذف شود
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ItemCosts;