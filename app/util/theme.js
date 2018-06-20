
'use strict';

import { PixelRatio, Dimensions } from 'react-native';

module.exports = {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    bgColor: '#f2f2f2',
    color: '#FF6666',

    flexDrow: {
        flexDirection: 'row',
    },
    flexBtrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mt5: {
        marginTop: 5,
    },
    mt10: {
        marginTop: 10,
    },
    mt15: {
        marginTop: 15,
    },
    mt20: {
        marginTop: 20,
    },
    red: {
        color: '#E62344'
    },
    c666: {
        color: '#666',
    },

};