import React, { useEffect, useRef, useState } from 'react';
// import { Text, View } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from '../components/Fab';

type TypeMarker = InstanceType<typeof Marker>;

interface Props {
    markers?: TypeMarker[];
}

export const Map = ({ markers }: Props) => {
    const [showPolyLine, setShowPolyLine] = useState(true);
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);
    const { hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        currentLocation,
        followUserLocation,
        stopFollowUserLocation
    } = useLocation();

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        if (!following.current) return;

        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude,
            },
        });
    }, [userLocation]);


    const centerPosition = async () => {
        const { latitude, longitude } = await currentLocation();

        following.current = true;
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude,
            },
        });
    }

    if (!hasLocation) return <LoadingScreen />;

    return (
        <>
            <MapView
                ref={elm => mapViewRef.current = elm!}
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={() => following.current = false}
                showsMyLocationButton={false}
                showsUserLocation
            >
                {
                    showPolyLine && (<Polyline
                        coordinates={routeLines}
                        strokeColor={'black'}
                        strokeWidth={3}
                    />)
                }

                {/* Agregar un marcador */}
                {/* Forma 1 */}
                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    description={'Esto es una descripcion'}
                    image={require('../assets/custom-marker.png')}
                    title={'Esto es un titulo'}
                /> */}
                {/* Forma 2 */}
                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    description={'Esto es una descripcion'}
                    title={'Esto es un titulo'}
                >
                    <View style={{ backgroundColor: "red", padding: 10 }}>
                        <Text>Esto es un titulo</Text>
                    </View>
                </Marker> */}
            </MapView>
            <Fab
                iconName='compass-outline'
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                }}
            />
            <Fab
                iconName='brush-outline'
                onPress={() => setShowPolyLine(!showPolyLine)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20,
                }}
            />
        </>
    )
}
