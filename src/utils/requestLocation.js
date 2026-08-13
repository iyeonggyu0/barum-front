export const requestLocationPermission = () => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("이 브라우저에서는 위치 정보를 지원하지 않습니다."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        // 1. 기본 에러 메시지를 할당합니다.
        let errorMessage = "위치 정보를 가져오는데 실패했습니다.";

        // 2. 특정 에러 코드일 때만 메시지를 덮어씌웁니다. (default 케이스 제거)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "사용자가 위치 정보 제공 동의를 거부했습니다. 브라우저 설정에서 권한을 허용해주세요.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다.";
            break;
          case error.TIMEOUT:
            errorMessage = "위치 정보를 가져오는 데 시간이 초과되었습니다.";
            break;
        }

        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};
