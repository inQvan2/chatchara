'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('message', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            view: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
            },
            idGroup: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'group',
                    key: 'id'
                }
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('message');
    }
};