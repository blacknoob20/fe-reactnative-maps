import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);
    const [initialPosition, setInitialPosition] = useState<Location>();
    const [userLocation, setUserLocation] = useState<Location>({
        longitude: 0,
        latitude: 0,
    });
    const wachId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        currentLocation().then(location => {
            if (!isMounted.current) return;

            setInitialPosition(location);
            setUserLocation(location);
            setRouteLines(routes => [...routes, location]);
            setHasLocation(true);
        });
    }, []);

    const currentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });
                },
                err => reject(err),
                {
                    enableHighAccuracy: true
                }
            );
        });
    }

    const followUserLocation = () => {
        wachId.current = Geolocation.watchPosition(
            ({ coords }) => {
                if (!isMounted.current) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }

                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);
            },
            (err) => console.log(err),
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
            }
        );
    }

    const stopFollowUserLocation = () => {
        if (wachId.current) Geolocation.clearWatch(wachId.current);
    }

    return {
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        currentLocation,
        followUserLocation,
        stopFollowUserLocation
    }
}
