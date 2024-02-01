import React, {useState} from 'react';
import {CostsInterface} from "../contracts/userInterface";
import {Link, useLocation} from "react-router-dom";
import callApi from "../../helpers/callApi";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {deleteCost, setCosts} from "../../store/costs";
import {Button, Modal} from "react-bootstrap";

import jalaliMoment from 'jalali-moment'
import {RootState} from "../../store";

interface PropsInterface {
    data: CostsInterface
}

const ItemCosts = ({data}: PropsInterface) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const user = useSelector((store: RootState) => store.user.user);

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let deleteHandler = async () => {
        let res = await callApi().delete(`/configs/${data.id}`);

        try {
            dispatch(deleteCost(data.id))
            callApi().get(`/configs${location?.search}`).then(response => dispatch(setCosts(response.data.result)))
            toast.success("حذف با موفقیت انجام شد", {
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

    const copyHandler = () => {
        // @ts-ignore
        navigator.clipboard.writeText(data.url);
        toast.success("کپی با موفقیت انجام شد.", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
            <tr className="cost-row tr-border-color border">
                <td>
                </td>
                <td>{data.id}</td>
                {/*@ts-ignore*/}
                <td>{data.name}</td>
                {user?.is_admin && <td className="text-nowrap">{data.user.name}</td>}

                <td className="text-nowrap">{jalaliMoment(data.created_at).format('jYYYY/jM/jD')}</td>
                {/*@ts-ignore*/}
                <td className="text-nowrap">{data.token}</td>
                <td className="text-center text-nowrap">
                    <button onClick={copyHandler} className="btn btn-alt-success cost-delete-btn ml-1">کپی آدرس کانفیگ
                    </button>
                    {
                        // @ts-ignore
                        user?.is_admin &&
                        <>
                            <Link to={`/costs/${data.id}`} className="btn btn-alt-warning ml-1">ویرایش</Link>
                            <button onClick={handleShow} className="btn btn-alt-danger cost-delete-btn">حذف</button>
                        </>
                    }
                </td>
            </tr>

            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>آیا مطمئن هستید؟</Modal.Title>
                </Modal.Header>
                <Modal.Body>بعد از حذف کاربر دیگر قادر به بازیابی نخواهید بود!</Modal.Body>
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
