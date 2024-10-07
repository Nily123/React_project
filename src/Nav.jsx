import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSun, faNewspaper, faHouse, faCalendarDays, faGamepad, faCoins } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';

function Nav({changeact}) {
    const [activeNumber, setActiveNumber] = useState(3); // 預設為 3
    const arr = [
        { icon: faSun, text: 'Weather' },
        { icon: faNewspaper, text: 'News' },
        { icon: faCoins, text: 'Stock' },
        { icon: faHouse, text: 'Home' },
        { icon: faMusic, text: 'Music' },
        { icon: faCalendarDays, text: 'Calendar' },
        { icon: faGamepad, text: 'Game' }
    ];

    const handleIconClick = (index) => {
        setActiveNumber(index);
        changeact(index)
    };

    return (
        <div className="navbox">
            <div className="box">
                <ul>
                    {arr.map(({ icon, text }, index) => (
                        <li
                            className = {`list ${activeNumber === index ? 'active' : ''}`} 
                            key={index}
                            onClick={() => handleIconClick(index)}
                        >
                            <a href="#">
                                <span className="icon">
                                    <FontAwesomeIcon icon={icon} className="ic" />
                                </span>
                                <span className="text">{text}</span>
                            </a>
                        </li>
                    ))}
                    <div className="backcard" style={{ transform: `translateX(${activeNumber * 70}px)` }}></div>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
