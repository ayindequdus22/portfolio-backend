import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LayoutDashboard, Image, BarChart2, Settings, Menu } from "lucide-react"



import { Link } from 'react-router-dom'

const Sidebar = (): React.JSX.Element => {
    const links: {
        title: string, icon: any, link: string
    }[] = [
            {
                title: "Views Projects", icon: LayoutDashboard, link: "/projects"
            }, {
                title: "Add Project", icon: Image, link: "/add-project"
            },

            {
                title: "Delete Projects", icon: BarChart2, link: "/delete-project"
            },
        ]
    return (
        <>
            <div className='border-r-2 border-black w-[30%] pl-2'>
                Portfolio Admin
                <div>
                        <div>
                            <Link to={"/"}></Link>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar