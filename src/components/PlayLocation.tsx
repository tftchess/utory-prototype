type LocationData = {
  name: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
}

function embedUrl({ latitude, longitude }: LocationData) {
  if (latitude === null || longitude === null ||
      !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      Math.abs(latitude) > 85.0511 || Math.abs(longitude) > 180) return null

  // OSM expects west,south,east,north for the bounds, but lat,lon for the pin.
  const span = 0.003
  const bbox = [longitude - span, latitude - span, longitude + span, latitude + span]
  const url = new URL('https://www.openstreetmap.org/export/embed.html')
  url.searchParams.set('bbox', bbox.join(','))
  url.searchParams.set('layer', 'mapnik')
  url.searchParams.set('marker', [latitude, longitude].join(','))
  return url.href
}

export function PlayLocation({ location }: { location: LocationData }) {
  const src = embedUrl(location)
  return (
    <section className="letter-location" aria-labelledby="letter-location-title">
      <h2 id="letter-location-title">플레이 장소</h2>
      {src ? (
        <iframe className="letter-map" src={src} title={`${location.name || '플레이 장소'} 위치 지도`}
          loading="lazy" allow="geolocation 'none'" />
      ) : (
        <div className="letter-map letter-map-empty">
          <svg width="32" height="36" viewBox="0 0 32 36" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
            <path d="M27 14c0 8-11 18-11 18S5 22 5 14a11 11 0 0 1 22 0Z"/>
            <circle cx="16" cy="14" r="3.7"/>
          </svg>
          <p>플레이 장소가 정해지면 지도가 표시돼요</p>
        </div>
      )}
      <strong>{location.name || '장소 미지정'}</strong>
      <p className="letter-location-address">{location.address || '주소 미지정'}</p>
    </section>
  )
}
