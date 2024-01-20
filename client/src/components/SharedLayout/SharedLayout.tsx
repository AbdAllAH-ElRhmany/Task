import { Outlet } from "react-router-dom"
import Header from "../Header/Header"


const SharedLayout: React.ElementType = () => {
    return (
        <>
            <div className="container">
                <section className="main">
                    <Header />
                    <div className="main_content">
                        <Outlet />
                    </div>
                </section>

            </div>
        </>
    )
}

export default SharedLayout