import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import placemark from './../../../assets/images/map/placemark.svg'
import Loader from './../../General/loader';
import SuccessMessage from './../../General/successMessage'

import { choiceDeliveryPoint } from '../../../api/deliveryPointAPI';

import { showError } from '../../../hooks/showError';
import mobileMap from '../../../store/mobileMap';
import overlay from '../../../store/overlay';
import { updateTokens } from '../../../services/services';

import './index.scss';





const CurrentMap = observer(({ owners, address, coordX, coordY, deliveryPointId }) => {
    const [statusDeliveryPoint, setStatusDeliveryPoint] = useState(false)
    const [loadingChoice, setLoadingChoice] = useState(false)
    const [isVisibleSuccess, setIsVisibleSuccess] = useState(false)


    useEffect(() => {
        if (owners) setStatusDeliveryPoint(owners.includes(parseInt(localStorage.getItem('user_id'))))
    }, [owners])
    

    function showMobileMap() {
        overlay.toggleShow(false)
        mobileMap.toggleShow(false)
    }


    // Choice delivery point
    function choicePoint() {
        setLoadingChoice(true)

        choiceDeliveryPoint(localStorage.getItem('user_id'), deliveryPointId)
        .then((response) => {

          if (response.status != 200) { showError('Ошибка при выборе пункта'); return }

          setIsVisibleSuccess(true)
          setStatusDeliveryPoint(true)

        })

        .catch((error) => { 
            // Обновление refresh Token при истечении годности AccessToken
            if (error?.response?.status == 401) updateTokens()

            showError('Ошибка при выборе пункта');
            console.error(error);
          })

        .finally(() => setLoadingChoice(false))
    }


  return (
    <div className={mobileMap.show ? 'mapWrapper' : 'mapWrapper mapWrapperHidden'}>
        <CSSTransition
          in={isVisibleSuccess}
          key={'transSuccessMessage'}
          timeout={4000}
          classNames="success"
        >
            <SuccessMessage message={'Пункт успешно выбран!'} setIsVisibleSuccess={setIsVisibleSuccess} />
        </CSSTransition>


        <div id="map">
            <Loader additionalClass='mapLoader' />
           <YMaps
                query={{
                    apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
                }}
            >
                <Map className="map" defaultState={{ center: [coordX, coordY], zoom: 15 }}>
                  <Placemark
                      key={'placemark'}
                      geometry={[coordX, coordY]}
                      options={{
                        iconLayout: 'default#image',
                        iconImageSize: [40, 40],
                        iconImageHref: placemark,
                      }}

                      properties={{
                        balloonContent: address
                      }}
                      modules={['geoObject.addon.balloon']}
                  />
                </Map>
            </YMaps>

            {
              mobileMap.show ?
                <button className="closeMobileMap" onClick={showMobileMap}>
                  закрыть
                </button>
              :
                null
            }
        </div>
        
        {localStorage.getItem('user_id') ? (
            statusDeliveryPoint ?
              <button className="map__button map__buttonDisabled" disabled>
                Текущий пункт выдачи
              </button>
            :
              
                (
                  loadingChoice ?
                    <button className="map__button btnIsLoading" onClick={choicePoint} disabled={loadingChoice}>
                      Выбрать пункт выдачи
                      <Loader additionalClass='btnLoader' />
                    </button>
                    
                  :
                    <button className="map__button" onClick={choicePoint} disabled={loadingChoice}>Выбрать пункт выдачи</button>
                )
          )

          : null
              
        }
        

     
        
    </div> 
  )
})

export default CurrentMap;
