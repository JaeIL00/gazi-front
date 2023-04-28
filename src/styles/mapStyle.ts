export default [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#333333',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f1f5',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
            {
                color: '#6d6971',
            },
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e8e7e8',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.business',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#d9e8e2',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified',
            },
            {
                lightness: '48',
            },
            {
                saturation: '-81',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
            {
                lightness: '0',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                lightness: 17,
            },
            {
                visibility: 'on',
            },
            {
                color: '#c8bed0',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#d7d1e1',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [
            {
                weight: '1.00',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                weight: '1.00',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'simplified',
            },
            {
                color: '#d7d1e1',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        elementType: 'all',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#6d6971',
            },
        ],
    },
    {
        featureType: 'transit.station.rail',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified',
            },
            {
                color: '#532ebf',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#bddff4',
            },
            {
                lightness: 17,
            },
        ],
    },
];
