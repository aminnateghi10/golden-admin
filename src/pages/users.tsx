import React, {useEffect, useState} from 'react';
import callApi from "../helpers/callApi";
import {UserInterface} from "../components/contracts/userInterface";
import moment from 'jalali-moment';
const Users = () => {
    useEffect(()=>{
        callApi().get('/users').then(res => setUsersList(res.data.result.data))
    },[])
    let time = new Date('2021-10-18T20:12:42.000000Z')
    let todayJalali = moment(time).locale('fa').format('YYYY/M/D');
    console.log(todayJalali)
    // let d = new Intl.DateTimeFormat('fa-IR').format(+'Sun Feb 12 2023 22:02:29 GMT+0330 (Iran Standard Time)');
    // console.log(d)
    const [usersList , setUsersList] = useState<UserInterface[]>()
    return (
        <div className="content">
            <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                <div className="col-md-12">
                    <div className="block block-rounded block-bordered">
                        <div className="block-header block-header-default border-b">
                            <h3 className="block-title">لیست کاربران</h3>
                        </div>
                        <div className="block-content">
                            <div className="table-responsive">
                                <table className="table table-borderless table-striped">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>نام</th>
                                        <th>نام کاربری</th>
                                        <th>تاریخ ثبت نام</th>
                                    </tr>
                                    </thead>
                                    <tbody>{
                                        usersList?.map(item =>(
                                            <tr key={item.id} className="text-nowrap">
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.username}</td>
                                                <td>{moment(new Date(item.created_at)).locale('fa').format('YYYY/M/D')}</td>
                                            </tr>
                                        ))
                                    }</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END Row #3 */}
            </div>
        </div>
    );
};

export default Users;