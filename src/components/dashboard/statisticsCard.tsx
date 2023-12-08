import React from "react";

const StatisticsCard = () => {
  return(
      <div className="col-6 col-xl-3">
          <a className="block block-rounded block-bordered block-link-shadow">
              <div className="block-content block-content-full clearfix">
                  <div className="font-size-h3 font-w600 text-primary">2,401,000</div>
                  <div className="font-size-sm font-w600 text-uppercase text-muted">هزینه کل این ماه</div>
              </div>
          </a>
      </div>
  )
}

export default StatisticsCard;