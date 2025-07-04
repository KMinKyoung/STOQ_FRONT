'use client';
import { useEffect } from 'react';

export default function StudyMap({ latitude, longitude }) {
  useEffect(() => {
    if (!latitude || !longitude) return;

    const mapId = `map-${latitude}-${longitude}`;

    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=1759f167e503f1af263689a62095342a&autoload=false';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("카카오 지도 API 로딩 실패");
        return;
      }

      window.kakao.maps.load(() => {
        const container = document.getElementById(mapId);
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(latitude, longitude),
        });
      });
    };
  }, [latitude, longitude]);

  const mapId = latitude && longitude ? `map-${latitude}-${longitude}` : 'map-loading';

  return (
    <div
      id={mapId}
      style={{ width: '100%', height: '400px', borderRadius: '1rem', marginTop: '1rem' }}
    ></div>
  );
}
