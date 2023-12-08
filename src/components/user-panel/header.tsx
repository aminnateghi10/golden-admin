import React, {Dispatch, SetStateAction , memo} from "react";
import UserDropdown from "./userDropdown";

interface PropsInterface {
    sidebarShow: Dispatch<SetStateAction<boolean>>,
    statusSidebarShow: boolean
}

const Header = ({sidebarShow, statusSidebarShow}: PropsInterface) => {
    const sidebarShowHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sidebarShow(!statusSidebarShow)
    }

    return (
        <header id="page-header">
            {/* Header Content */}
            <div className="content-header">
                {/* Right Section */}
                <div className="content-header-section">
                    {/* Toggle Sidebar */}
                    {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
                    <button type="button" className="btn btn-circle btn-dual-secondary" onClick={sidebarShowHandler}>
                        <i className="fa fa-navicon"/>
                    </button>
                    {/* END Toggle Sidebar */}
                </div>
                {/* END Right Section */}
                {/* Left Section */}
                <div className="content-header-section">
                    <UserDropdown/>
                </div>
                {/* END Left Section */}
            </div>
            {/* END Header Content */}
        </header>
    )
}
export default memo(Header);
