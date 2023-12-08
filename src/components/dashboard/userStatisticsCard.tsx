import React from "react";
import {UsersInterface} from "../contracts/userInterface";
import {moneyFormat} from "../shared/moneyFormat";

interface PropsInterface {
    data:UsersInterface
}

const UserStatisticsCard = ({data}:PropsInterface) => {
    console.log(data)
    let status;
    if (data.debt < '0'){
        status = <span className="text-success">بستانکار</span>
    }else{
        status = <span className="text-danger">بدهکار</span>
    }
  return(
      <div className="col-md-4">
          <a className="block block-link-pop text-center">
              <div className="block-content">
                  <p className="font-w600 font-size-h5">{data.name} <small>({data.username})</small></p>
                  <p title={moneyFormat(data.debt)} className="font-size-h1 text-muted">
                      <strong className="text-right">{moneyFormat(data.debt)}</strong>
                      <small className="font-size-h5 text-left font-weight-bold">{status}</small>
                  </p>
              </div>
          </a>
      </div>
  )
}

export default UserStatisticsCard;