'use strict';
module.exports = function (sequelize, DataTypes) {
    let client = sequelize.define('client', {
        registrationCode: {
            type: DataTypes.INTEGER
        },
        phoneNumber: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: /^(\+)?[0-9]+$/i,
                    msg: "El número de teléfono no es válido"
                }
            }
        },
        nickName: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    arg: /^([a-zA-Z]+)([0-9]+)$/i,
                    msg: "El nick no es válido"
                }
            }
        },
        status: {
            type: DataTypes.STRING
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dateBirth: {
            type: DataTypes.DATE,
            validate: {
                isDate: {
                    msg: "No es una fecha válida"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "Su dirección de correo no es válida"
                }
            }
        }
    });

    client.associate = function (models) {
        client.belongsToMany(models.group, {through: 'clientGroup'});
        client.hasMany(models.message);
        client.hasMany(models.device);
    };

    return client;
};