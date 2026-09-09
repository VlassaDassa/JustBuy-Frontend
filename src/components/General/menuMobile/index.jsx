import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { getMenu, getMenuSubcategories } from '../../../api/generalAPI';
import { logoutUser } from '../../../api/auth';
import useRequest from '../../../hooks/useRequest';
import auth from '../../../store/authForm';
import overlay from '../../../store/overlay';
import mobileMenu from '../../../store/mobileMenu';
import noScroll from '../../../store/noScroll';

import arrow_left from './../../../assets/images/mobile_menu/arrow_left.svg';
import profile from './../../../assets/images/header/profile.svg';
import cart from './../../../assets/images/header/cart.svg';

import logoutIco from './../../../assets/images/header/logout.svg'

import './index.scss';






const MenuMobile = observer(() => {
    const [selectedCategory, setSelectedCategory] = useState({category_id: 1, category_name: 'Книги'});
    const [categories, loading, error] = useRequest(getMenu, [])
    const [subCategories, setSubcategories] = useState([])
    const [hideMobileCategory, setHideMobileCategory] = useState(false)
    const [data, loadingSub, errorSub] = useRequest(() => getMenuSubcategories(selectedCategory.category_id), [selectedCategory.category_id])


    useEffect(() => {
        if (data && setSubcategories.length > 0 && !loadingSub) {
            setSubcategories(data) 
        }
    }, [data, loadingSub])


    const select_category = (category) => {
        setSelectedCategory(category)
        setTimeout(() => {
            setHideMobileCategory(true)
        }, 10)
    };

    function toggleAuth() {
        auth.toggleShow()
        overlay.toggleShow()
        noScroll.toggleScroll(false)
    }

    function close() {
        mobileMenu.toggleShow()
        noScroll.toggleScroll(true)
    }

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        try {
            if (refreshToken) {
                await logoutUser(refreshToken);
            }
        }
        finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user_id');

            window.location.href = '/';
        }
    };



    return (
        <div className={`mobile_menu ${mobileMenu.show ? "mobile_menu-hidden" : ""}`}>
            <div className="container">
                <div className="mobile_searchbar__wrapper">
                    <form action="." className="mobile_searchbar__form"></form>
                        <input type="text" className="mobile_searchbar__input"/>
                    <button 
                        className="mobile__btn"
                        onClick={close}
                    >
                        Отмена
                    </button>
                </div>
                <nav className="mobile_menu__icons">
                    <ul>
                        <li 
                            className="mobile_menu-item mobile_menu-profile"
                            onClick={localStorage.getItem('user_id') ? null : () => {toggleAuth(); mobileMenu.toggleShow()}}
                        >
                            {
                                localStorage.getItem('user_id') ?
                                    <Link onClick={close} to="/profile"><img src={profile} /></Link>      
                                :
                                    <img src={profile} />
                            }
                        </li>
                        <li className="mobile_menu-item mobile_menu-cart"><Link to="/cart" onClick={close}><img src={cart} /></Link></li>

                        {
                            localStorage.getItem('user_id') ?
                                <li className="mobile_menu-item mobile_menu-logout"><img src={logoutIco} className='logoutIcoMobile' onClick={handleLogout} /></li>
                            :
                                null
                        }
                    </ul>
                </nav>

                <ul className="mobile_menu__list">
                    {!hideMobileCategory ? 
                        (categories && categories.map((category) => (
                            <li 
                                key={category.id + 'cat'}
                                data-menu-id={category.id} className="mobile_menu__item"
                                onClick={() => select_category({
                                    category_id: category.id,
                                    category_name: category.category_name
                                })}
                            >

                                <span>{category.category_name}</span>
                            </li>
                        ))
                    )
                    : 
                    (
                    <>
                        <div className="mobile_menu__title">
                            <img className="mobile_menu__img"
                                src={arrow_left} 
                                onClick={() => {setHideMobileCategory(false)}}
                            />
                            <h1>{selectedCategory.category_name}</h1>
                        </div>
                        
                        {subCategories.length > 0 ?

                            subCategories.map((subcategory) => (
                                <li 
                                    key={subcategory.id + 'subcat'}
                                    data-subcategory-id={subcategory.id}
                                    className="mobile_menu__item"
                                >
                                    <span>{subcategory.subcategory_name}</span>
                                </li>
                            ))
                        : (!loading ? null : 
                            <div className="subcategory_none">Подкатегорий пока нет...</div>)
                        }
                    </>
                    )}
                   
                </ul>
            </div>
        </div>
    )
})

export default MenuMobile
