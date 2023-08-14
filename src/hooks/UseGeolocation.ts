
function useGeolocation(options?: PositionOptions): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
        const isSupported = navigator && 'geolocation' in navigator;

        function successCb({ coords: { latitude, longitude } }: GeolocationPosition): void {
            resolve({ latitude, longitude });
        }

        function errorCb({ message }: GeolocationPositionError): void {
            reject(new Error(message));
        }

        if (isSupported) {
            navigator.geolocation.getCurrentPosition(successCb, errorCb, options);
        } else {
            reject(new Error('Your browser does not support Geolocation API'));
        }
    });
}

export default useGeolocation;