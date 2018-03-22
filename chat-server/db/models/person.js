'use strict';
module.exports = function (sequelize, DataTypes) {
    let person = sequelize.define('person', {
        contactList: {
            type: DataTypes.JSON
        }
    });

    person.associate = function (models) {
        person.belongsTo(models.client);
        person.belongsToMany(models.channel, {through: 'subscription'});
    };

    return person;
};