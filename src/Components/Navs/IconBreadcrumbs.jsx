import React from 'react';
import { Link as LinkRouter } from "react-router-dom";


export default function IconBreadcrumbs({ links }) {


    return (
        <div role="presentation">
            <ul className="iconBreadLi">
                {links && links.map((lnk, index) => {
                    return (
                        <li key={index}>
                            <LinkRouter to={lnk.link}>
                                {lnk.icon}
                                {lnk.title}
                            </LinkRouter>
                        </li>

                    )
                })}
            </ul>
        </div >
    );
}
