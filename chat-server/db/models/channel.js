'use strict';
module.exports = function (sequelize, DataTypes) {
    let channel = sequelize.define('channel', {
        type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    });

    channel.associate = function (models) {
        channel.belongsTo(models.client);
        channel.belongsToMany(models.person, {through: 'subscription'});
    };

    return channel;
};