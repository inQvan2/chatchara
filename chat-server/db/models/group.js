'use strict';
module.exports = function (sequelize, DataTypes) {
    let group = sequelize.define('group', {
        name: {
            type: DataTypes.STRING
        },
        isPrivate: {
            type: DataTypes.BOOLEAN
        }
    });

    group.associate = function (models) {
        group.belongsToMany(models.client, {through: 'clientGroup'});
        group.hasMany(models.message);
    };

    return group;
};