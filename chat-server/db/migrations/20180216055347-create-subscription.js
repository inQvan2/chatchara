'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('subscription', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
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
            idPerson: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'person',
                    key: 'id'
                }
            },
            idChannel: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'channel',
                    key: 'id'
                }
            }
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('subscription');

    }
};
