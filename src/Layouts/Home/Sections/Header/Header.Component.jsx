import React, {useState} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './Header.Style.scss';

export const HeaderComponent = () => {
    const [breadcrumbsItems] = useState(() => [
        {
            key: 1,
            label: "Home",
            href: "/",
            color: ""
        },
        {
            key: 2,
            label: "Administration",
            href: "/",
            color: ""
        },
        {
            key: 3,
            label: "Logger search",
            href: "/",
            color: "text.primary"
        }
    ]);

    const handleBreadcrumbClick = (event) => {
        event.preventDefault();
    };

    return (
        <div className="header-wrapper">
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small"/>}
            >
                {breadcrumbsItems && breadcrumbsItems.map((item, index) => (
                    <div key={`${index + 1}-${item.key}-breadcrumb`}>
                        <Link underline="hover" key={item.key} href={item.href} onClick={handleBreadcrumbClick}>
                            <Typography color={item.color}>
                                {item.label}
                            </Typography>
                        </Link>
                    </div>
                ))}
            </Breadcrumbs>
            <hr/>
        </div>
    );
};
