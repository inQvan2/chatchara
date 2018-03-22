'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('device', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            imei: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            brand: {
                type: Sequelize.STRING
            },
            model: {
                type: Sequelize.STRING
            },
            osName: {
                type: Sequelize.STRING
            },
            osVersion: {
                type: Sequelize.STRING
            },
            connection: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            idClient: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'client',
                    key: 'id'
                }
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('device');
    }
};