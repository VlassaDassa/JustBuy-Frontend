import axios from 'axios';

import { API_ROUTES } from './apiConfig';



// Receiving all delivery points
export const getAllDeliveryPoints = () => {
    return axios.get(API_ROUTES.profile.getAllDeliveryPoints);
}; 


// Adding bank card
export async function addBankCard(data, user_id) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    };
  
    return axios.post(API_ROUTES.profile.addBankCard + user_id + '/', data, config);
}; 


// Deleting bank card
export function deleteBankCard(id)  {
    return axios.delete(API_ROUTES.profile.deleteBankCard + id + '/')
} 


// Updating bank card status
export function updateStatusBankCard(id, newValue) {
    const data = {
      id: id,
      newValue: newValue,
    };

    return axios.put(API_ROUTES.profile.updateStatusBankCard, data);
} 


// Получение основной банковской карты пользователя
export const getCurrentBankCard = (userId) => {
    return axios.get(API_ROUTES.profile.getCurrentBankCard + userId + '/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
} 


// Получение username, города, статуса продавца, наличие уведомлений
export const getUserInfo = (user_id) => {
    return axios.get(API_ROUTES.profile.getUserInfo + user_id + '/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        } 
    });
}


// Получение продуктов пользователя с пагинацией
export const getUserPurchases = (start_limit, count, user_id) => {
  return axios.get(API_ROUTES.profile.getUserPurchases + start_limit + '/' + count + '/' + user_id + '/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
  });
}


// Получение продуктов пользователя, которые находятся в пути
export const getUserOnRoad = (user_id) => {
  return axios.get(API_ROUTES.profile.getUserOnRoad + user_id + '/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
  });
}


// Получение банковских карт пользователя
export const getUserBankCards = (user_id) => {
  return axios.get(API_ROUTES.profile.getUserBankCards + user_id + '/', {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
  });
}; 


// Получение координат города по названию
export const getCoordinatesCity = (city) => {
    return axios.get(API_ROUTES.profile.getCoordinatesCity, {
        params: {
            city,
        },
    });
};

