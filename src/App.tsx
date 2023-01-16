import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;

  & > * {
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    max-width: 1000px;
  }
`;

const StyledTitle = styled.h2`
  color: white;
  font-size: 26px;
  font-weight: 600;
`;

const StyledMainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const StyledCard = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #222222;
  border-radius: 10px;

  &:nth-child(1) {
    flex: 0 0 auto;
  }
`;

function App() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const companyMapRef = React.useRef<HTMLDivElement>(null);
  const homeMapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<naver.maps.Map | null>(null);
  const [marker, setMarker] = React.useState<naver.maps.Marker | null>(null);
  const [curLocation, setCurLocation] =
    React.useState<naver.maps.LatLng | null>(null);

  const [companyMap, setCompanyMap] = React.useState<naver.maps.Map | null>(
    null
  );
  const [homeMap, setHomeyMap] = React.useState<naver.maps.Map | null>(null);

  const handleZoomUp = () => {
    setMap((prev) => {
      const newMap = prev;
      newMap?.setZoom(newMap.getZoom() + 1, false);
      return newMap;
    });
  };

  const handleZoomDown = () => {
    setMap((prev) => {
      const newMap = prev;
      newMap?.setZoom(newMap.getZoom() - 1, false);
      return newMap;
    });
  };

  const handleGoCompanyButton = () => {
    // homeMap?.clearListeners();
    setHomeyMap((prev) => {
      const newMap = prev;
      newMap?.destroy();

      return newMap;
    });

    const location = new naver.maps.LatLng(37.5434, 126.9526);
    const newMap = map;
    if (newMap) {
      setMap((prev) => {
        const newMap = prev;
        newMap?.updateBy(location, newMap.getZoom());
        return newMap;
      });
      const marker = new naver.maps.Marker({
        position: location,
        map: newMap,
      });
      setMarker(marker);
    }
  };

  const handleGoHomeButton = () => {
    const location = new naver.maps.LatLng(37.526, 127.0542);
    setMap((prev) => {
      const newMap = prev;
      newMap?.updateBy(location, newMap.getZoom());
      return newMap;
    });

    setMarker((prev) => {
      const newMarker = prev;
      newMarker?.setPosition(location);
      return newMarker;
    });

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 18,
      zoomControl: false,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    if (homeMapRef.current) {
      console.log("11111");
      const homeMap = new naver.maps.Map(homeMapRef.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map: homeMap,
      });

      setHomeyMap(homeMap);
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (mapRef.current) {
        const location = new naver.maps.LatLng(37.5434, 126.9526);
        const mapOptions: naver.maps.MapOptions = {
          center: location,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
          },
        };
        const map = new naver.maps.Map(mapRef.current, mapOptions);
        const marker = new naver.maps.Marker({
          position: location,
          map,
        });

        setMap(map);
        setMarker(marker);
      }
    };
    initMap();
  }, []);

  //지도 사이즈 관련 스타일
  const mapStyleBig = {
    width: "100%",
    height: "400px",
  };

  const mapStyle = {
    width: "100%",
    height: "200px",
  };

  useEffect(() => {
    console.log("=======업데이트", homeMap);
  }, [homeMap]);

  return (
    <div className="App">
      <StyledContainer>
        <header>
          <StyledTitle>Add Maps</StyledTitle>
        </header>
        <main>
          <StyledMainContainer>
            <StyledCard style={{ width: "100%" }}>
              <button type="button" onClick={handleZoomUp}>
                Zoom up
              </button>
              <button type="button" onClick={handleZoomDown}>
                Zoom Down
              </button>
              <button type="button" onClick={handleGoCompanyButton}>
                출근 할래요
              </button>
              <button type="button" onClick={handleGoHomeButton}>
                퇴근 할래요
              </button>
              <div ref={mapRef} style={mapStyleBig} />
            </StyledCard>
            <StyledCard>
              <StyledTitle>출근 맵</StyledTitle>
              {companyMap ? (
                <div ref={companyMapRef} style={mapStyle} />
              ) : (
                <div>퇴근 !</div>
              )}
            </StyledCard>
            <StyledCard>
              <StyledTitle>퇴근 맵</StyledTitle>
              <div ref={homeMapRef} style={mapStyle}>
                출근 했어요!
              </div>
            </StyledCard>
          </StyledMainContainer>
        </main>
      </StyledContainer>
    </div>
  );
}

export default App;
