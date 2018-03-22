'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('client', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            registrationCode: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            nickName: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true
            },
            isOnline: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            dateBirth: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
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
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('client');
    }
};