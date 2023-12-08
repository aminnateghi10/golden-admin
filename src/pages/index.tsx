import React, {useEffect, useState} from "react";
import StatisticsCard from "../components/dashboard/statisticsCard";
import UserStatisticsCard from "../components/dashboard/userStatisticsCard";
import callApi from "../helpers/callApi";
import {UsersInterface} from "../components/contracts/userInterface";

const Dashboard = () => {

    useEffect(() => {
        callApi().get('/users').then(res => setUserStatistics(res.data.result.data))
    }, [])
    const [userStatistics, setUserStatistics] = useState<UsersInterface[]>()
    return (
        <div className="content">
            <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                <StatisticsCard/>
                <StatisticsCard/>
                <StatisticsCard/>
            </div>

            <div className="row">
                {
                    userStatistics?.map(item => (
                        <UserStatisticsCard key={item.id} data={item}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard;
