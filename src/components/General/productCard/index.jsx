import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { addCartProduct, removeCartProductFromProdId, getSizesAndColors } from './../../../api/cartAPI'

import { showError } from './../../../hooks/showError';
import sendToCart from '../../../store/sendToCart';
import overlay from '../../../store/overlay';
import authForm from '../../../store/authForm';
import noScroll from '../../../store/noScroll';
import { updateTokens } from '../../../services/services';

import heart from './../../../assets/images/product_card/heart.svg';
import heartFill from './../../../assets/images/product_card/heart-small-fill.svg';
import cartImg from './../../../assets/images/product_card/cart.svg';
import cartFill from './../../../assets/images/product_card/cart-fill.svg';

import './index.scss';





const ProductCard = observer(({
        name,
        photo,
        price,
        rating,
        countFeedback,
        product_id,
        inCart,
        setInCart,

        likeShow,
        cartShow,
        onRoad,
    }) => {
    

    const defaultLikeClass = 'products__icon products__icon-like'
    const activeLikeClass = 'products__icon products__icon-like active'

    const defaultCartClass = 'products__icon products__icon-cart'
    const activeCartClass = 'products__icon products__icon-cart active'

    const defaultMobileCart = 'products__icon products__add_to_cart'
    const activeMobileCart = 'products__icon products__add_to_cart products__add_to_cart--active'

    const defaultMobileLike = 'products__icon products__icon-small products__icon-like'
    const activeMobileLike = 'products__icon products__icon-small products__icon-like active'

    
    const getLikesStorageKey = () => {
        const userId = localStorage.getItem('user_id');
        return userId ? `justbuy_likes_${userId}` : null;
    };

    const readLikes = () => {
        const key = getLikesStorageKey();

        if (!key) {
            return [];
        }

        try {
            const value = JSON.parse(localStorage.getItem(key) || '[]');
            return Array.isArray(value) ? value : [];
        }
        catch {
            return [];
        }
    };

    const [like, setLike] = useState(readLikes);

    function toggleAuth() {
        authForm.toggleShow()
        overlay.toggleShow()
    }
   
    const addToCart = async (product_id) => {

        // Если пользователь не авторизован показывать форму авторизации
        if (!localStorage.getItem('user_id')) {
            toggleAuth();
            return;
        }

        // Получение связанных полей
        try {
            const response = await getSizesAndColors(product_id);
            
            if (response.status !== 200) {
                showError('Ошибка при добавлении товара');
                throw new Error('Ошибка при получении данных');
            }
            const colorsAndSizes = await response.data;


            // Просто добавление товара
            if (!colorsAndSizes['exists']) {
                const data = {
                    'count': colorsAndSizes.count,
                    'product_id': product_id,
                    'user_id': localStorage.getItem('user_id'),
                }

                addCartProduct(data)
                .then(response => {
                    if (response.status !== 200) {
                        showError('Ошибка при добавлении товара')
                    }
                    else {
                        setInCart([...inCart, product_id])
                    }
                    })
                .catch(error => {
                    // Обновление refresh Token при истечении годности AccessToken
                    if (error?.response?.status == 401) updateTokens()

                    console.error(error)
                    showError('Ошибка при добавлении товара')
                })
            }


            // Show popup for colors
            else if (colorsAndSizes['exists_colors']) {
                sendToCart.toggleShow(true)
                sendToCart.setProductId(product_id)
                sendToCart.setColors(colorsAndSizes.colors)

                overlay.toggleShow(true)
                noScroll.toggleScroll(false)
            }


            // Show popup for sizes
            else if (colorsAndSizes['exists_sizes']) {
                sendToCart.toggleShow(true)
                sendToCart.setProductId(product_id)
                sendToCart.setSizes(colorsAndSizes.sizes)

                overlay.toggleShow(true)
                noScroll.toggleScroll(false)
            }


            // Show popup "SendToCart", if product have sizes and colors
            else if (colorsAndSizes['exists_relateInputs']) {
                sendToCart.toggleShow(true)
                sendToCart.setProductId(product_id)
                sendToCart.setRelateInputs(colorsAndSizes.relateInputs)

                overlay.toggleShow(true)
                noScroll.toggleScroll(false)
            }


        } catch (error) {
            showError('Ошибка при добавлении товара');
            console.error(error);
        }
    }


    const removeInCart = (product_id) => {
        removeCartProductFromProdId(product_id)
        .then(response => {
            if (response.status !== 200) {
                showError('Ошибка при удалении товара')
            }
            else {
                setInCart(inCart.filter(item => item !== product_id))
            }
        })
        .catch(error => {
            showError('Ошибка при удалении товара')
        })
    }


    const addToLike = () => {
        const key = getLikesStorageKey();

        if (!key) {
            toggleAuth();
            return;
        }

        setLike(currentLikes => {
            const nextLikes = currentLikes.includes(product_id)
                ? currentLikes.filter(item => item !== product_id)
                : [...currentLikes, product_id];

            localStorage.setItem(key, JSON.stringify(nextLikes));

            return nextLikes;
        });
    };

    return (
        <div className={onRoad ? "products__item products__item--onRoad" : 'products__item'}>
            <div className={`products__photo_wrapper`}>
                <a href="product.html">
                    <img className="products__photo" src={photo} />
                </a>
            </div>

            <div className="products__description">
                <div className="products__icons">

                    {likeShow &&
                        <img 
                            src={like.includes(product_id) ? heartFill: heart} 
                            className={like.includes(product_id) ? defaultLikeClass: activeLikeClass}
                            onClick={addToLike}
                        />
                    }
                    
                    {cartShow &&
                        <img 
                            src={inCart?.includes(product_id) ? cartFill: cartImg} 
                            className={inCart?.includes(product_id) ? defaultCartClass: activeCartClass}
                            onClick={() => {
                                if (inCart?.includes(product_id)) {
                                    removeInCart(product_id)
                                }
                                else {
                                    addToCart(product_id)
                                }
                            }}
                        />
                    }
                </div>
                

                <p className={`products__price`}>
                    {price} ₽
                </p>

                <p className={`products__name`}>
                    <a href="product.html" title={name}>{name}</a>
                </p>
            
                <div className="products__rating">

                        <div className={`rating__item`}>
                            <div className="products__circle"></div>
                            <p className="products__number_rating">{rating}</p>
                        </div>
                
                    
                    <div className={`products__count_feedback`}>
                        <p className="count_feedback__number">{countFeedback}</p>
                        <p className="count_feedback__text">отзывов</p>
                    </div>
                </div>
                
                {cartShow && likeShow && 
                    <div className="products__mobile_btn">
                        <button 
                            className={inCart?.includes(product_id) ? activeMobileCart : defaultMobileCart}
                            onClick={() => {
                                if (inCart?.includes(product_id)) {
                                    removeInCart(product_id)
                                }
                                else {
                                    addToCart(product_id)
                                }
                            }}
                        >
                            В корзину
                        </button>
                        
                        <img 
                            className={like.includes(product_id) ? activeMobileLike : defaultMobileLike}
                            src={like.includes(product_id) ? heartFill: heart} 
                            onClick={addToLike}
                        />
                        
                    </div>
                }
                
            </div>

            
            
            {onRoad && <p className="products__awaiting_text">Ожидается 3 сентября</p>}
        </div>
    )
})

export default ProductCard;
