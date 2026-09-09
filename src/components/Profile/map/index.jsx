import { useState, useEffect, memo, useCallback } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { observer } from 'mobx-react-lite';

import Title from './../../General/title';
import DeliveryPoint from '../deliveryPoint';
import Loader from '../../General/loader';

import { getAllDeliveryPoints } from '../../../api/profileAPI';
import choiceCity from '../../../store/choiceCity';
import useRequest from '../../../hooks/useRequest';

import placemark from './../../../assets/images/map/placemark.svg';

import './index.scss';  



const YandexMap = observer(({ coord }) => {
  const [data, loading, error] = useRequest(() => getAllDeliveryPoints());
  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState({});
  const [currentCoord, setCurrentCoord] = useState([56, 36]) 

  useEffect(() => {
    if (data) {
      setPoints(prevPoints => [...prevPoints, ...data])
    }
  }, [data])

  // Изменение центра карты
  useEffect(() => {
      if (!choiceCity.cityCoord) { setCurrentCoord(coord); return; }

      setCurrentCoord(Array.from(choiceCity.cityCoord))
  }, [choiceCity.cityCoord, coord])



  return (
    <section className="delivery_point">
      <Title title="Выбрать пункт выдачи"/>
      <div id="map">
        <DeliveryPoint point={currentPoint} />
        
        <Loader additionalClass='mapLoader'/>

        <YMaps
            key={currentCoord.join(',')}
            query={{
                apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
            }}
        >
          <Map className="map" defaultState={{ center: currentCoord, zoom: 15 }}>
            {points &&
              points.map((point) => (
                <PlaceMarkMemo key={'placemarkMemo' + point.id} point={point} setCurrentPoint={setCurrentPoint} points={points} />
              ))
            }
          </Map>
        </YMaps>
      </div>
    </section>
  )
})

export default YandexMap;


export const PlaceMarkMemo = memo(({ point, setCurrentPoint, points }) => {
  const [hovered, setHovered] = useState(false);

  const choicePointMemo = useCallback(() => {
    setCurrentPoint(point);
  }, [point, setCurrentPoint]);

  return (
    <Placemark
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={choicePointMemo}
        key={'placemark' + point.id}
        geometry={[point.coord_x, point.coord_y]}
        options={{
          iconLayout: 'default#image',
          iconImageSize: [40, 40],
          iconImageHref: placemark,
          iconImageSize: hovered ? [50, 50] : [40, 40],
          iconImageOffset: hovered ? [-25, -50] : [-20, -40], 
          iconImageClipRect: hovered ? [[0, 0], [50, 50]] : undefined,
          iconImageHref: placemark,
        }}
      />
  );
});