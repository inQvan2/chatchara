'use strict';
module.exports = function (sequelize, DataTypes) {
    let message = sequelize.define('message', {
        content: {
            type: DataTypes.TEXT
        },
        view: {
            type: DataTypes.BOOLEAN
        }
    });

    message.associate = function (models) {
        message.belongsTo(models.client);
        message.belongsTo(models.group);
    };

    return message;
};