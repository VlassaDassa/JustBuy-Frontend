const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api/';


export const API_ROUTES = {
    general: {
        getMenu: API_BASE_URL + 'category/',
        getMenuSubcategories: API_BASE_URL + 'subcategory/',
        getAllProducts: API_BASE_URL + 'all_products/',
        getProducts: API_BASE_URL + 'products/',
    },

    auth: {
        registerUser: API_BASE_URL + 'register/',
        loginUser: API_BASE_URL + 'login/',
        logoutUser: API_BASE_URL + 'logout/',
        refreshToken: API_BASE_URL + 'token/refresh/',
    },

    index: {
        getSliderPhoto: API_BASE_URL + 'slider/',
    },

    addProduct: {
        getCatWithSubcat: API_BASE_URL + 'cat_with_sub/',
        getCharacteristicsFields: API_BASE_URL + 'get_characteristics_fields/',
        getColors: API_BASE_URL + 'get_colors/',
        getSizes: API_BASE_URL + 'get_sizes/',
        addProduct: API_BASE_URL + 'add_product/',
    },

    profile: {
        getAllDeliveryPoints: API_BASE_URL + 'all_delivery_points/',
        getUserBankCards: API_BASE_URL + 'get_user_bank_cards/',
        addBankCard: API_BASE_URL + 'add_bank_card/', 
        deleteBankCard: API_BASE_URL + 'delete_bank_card/', 
        updateStatusBankCard: API_BASE_URL + 'update_bank_card/', 
        getCurrentBankCard: API_BASE_URL + 'get_current_card/', 

        getUserInfo: API_BASE_URL + 'get_user_info/', 
        getUserPurchases: API_BASE_URL + 'get_user_purchases/',
        getUserOnRoad: API_BASE_URL + 'get_user_on_road/',

        getCoordinatesCity: API_BASE_URL + 'geocode_city/',
    },

    cart: {
        getCartProducts: API_BASE_URL + 'cart_products/',
        removeCartProduct: API_BASE_URL + 'delete_cart_product/',
        removeCartProductFromProdId: API_BASE_URL + 'delete_cart_product_from_prod_id/',
        addCartProduct: API_BASE_URL + 'add_cart_product/',
        sendPurchasedGoods: API_BASE_URL + 'add_to_on_road/',
        getSizesAndColors: API_BASE_URL + 'get_sizes_and_colors/',
        getSizes: API_BASE_URL + 'get_particular_sizes/',
        addCommentDeliveryPoint: API_BASE_URL + 'add_delivery_point_comment/',
    },
    
    deliveryPoint: {
        getDeliveryPoint: API_BASE_URL + 'get_delivery_point/',
        choiceDeliveryPoint: API_BASE_URL + 'choice_delivery_point/',
        getUserDeliveryPoint: API_BASE_URL + 'get_user_delivery_point/',
        getUserCommentExistPoint: API_BASE_URL + 'get_user_comment_exist_point/', 
    }
}