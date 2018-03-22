'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('clientGroup', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            idClient: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'client',
                    key: 'id'
                }
            },
            idGroup: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'group',
                    key: 'id'
                }
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
            }
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('clientGroup');
    }
};
