'use strict';
module.exports = function (sequelize, DataTypes) {
    let device = sequelize.define('device', {
        imei: {
            type: DataTypes.STRING
        },
        brand: {
            type: DataTypes.STRING
        },
        model: {
            type: DataTypes.STRING
        },
        osName: {
            type: DataTypes.STRING
        },
        osVersion: {
            type: DataTypes.STRING
        },
        connection: {
            type: DataTypes.STRING
        }
    });

    device.associate = function (models) {
        device.belongsTo(models.client);
    };

    return device;
};