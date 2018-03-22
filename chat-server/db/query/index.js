const models = require('../models');

const Client = models.client;
const Device = models.device;
const Person = models.person;
const Channel = models.channel;
const Group = models.group;
const Message = models.message;

/**
 * Busca de la lista de contactos cuales son clientes del sistema y actualiza el atributo isClient de contactList.
 * Retorna esta lista actualizada.
 *
 * @param contactList
 * @return Array
 **/
let updateContactList = function (contactList) {
    for (let i in contactList) {
        let contact = contactList[i];
        Client.findOne({
            where: {phoneNumber: contact['phone']}
        }).then(function (result) {
            contact['isClient'] = (result !== null);
        });
    }
    return contactList;
};

module.exports = {
    /**
     * Registra un cliente
     * */
    registerClient: function (data) {
        let response = {};
        /**
         * Se usa la transacción ya que no es seguro de si el usuario ya está presente en la base de datos o no
         * (y podría terminar creando una operación de escritura en el DB).
         */
        models.sequelize.transaction(function (transaction) {
            return Client.findOrCreate({
                where: {phoneNumber: data.client.phoneNumber},
                defaults: data.client, // datos del cliente
                transaction: transaction
            }).spread(function (client, created) {
                if (created) {
                    console.log(client.get({plain: true}));
                    if (data.is.person) {
                        Person.create({
                            id: client.id,
                            contactList: data.is.person.contactList,
                        }).then(function (person) {
                            data.is.person = person;
                        });
                    } else if (data.is.channel) {
                        Channel.create({
                            id: client.id,
                            type: data.is.channel.type,
                            description: data.is.channel.description
                        }).then(function (channel) {
                            data.is.channel = channel;
                        });
                    }
                    data.device['idClient'] = client.id;
                    Device.findOrCreate({
                        where: {imei: data.device.imei},
                        defaults: data.device
                    }).then(function (device) {
                        data.device = device
                    });
                    data.client = client;
                    response = {
                        status: 0,
                        data: {
                            msg: "El cliente se ha añadido satisfactoriamente",
                            object: data
                        }
                    }
                } else {
                    response = {
                        status: 1,
                        data: {
                            msg: "El cliente ya existe en el servidor",
                            object: data
                        }
                    };
                }
            });  // end spread
        }).then(function (result) {
            console.log(result);
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(function (err) {
            console.log(err);
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        });
        return response;
    },

    /**
     * Autentica al cliente basado en el registerCode que le fue otorgado en el momento del registro
     * */
    loginClient: function (data) {
        let response = {};
        Client.findOne({
            where: {
                phoneNumber: data.client.phoneNumber,
                registrationCode: data.client.registrationCode
            }
        }).then(function (client) {
            if (client) {
                client.updateAttributes({
                    isOnline: true
                });
                response = {
                    status: 0,
                    data: {
                        msg: "Cliente autenticado",
                        object: client
                    }
                }
            } else {
                response = {
                    status: 1,
                    data: {
                        msg: "Credenciales incorrectas",
                    }
                }
            }
        });
        return response;
    },

    /**
     * Desautentica al cliente
     * */
    logoutClient: function (data) {
        Client.findOne({
            where: {
                phoneNumber: data.client.phoneNumber
            }
        }).then(function (client) {
            if (client) {
                client.updateAttributes({
                    isOnline: false
                });
            }
        })
    },

    /**
     * Devuelve la lista de contactos de un cliente actualizada con los contactos que estan registrados en el sistema
     *
     * @param clientID
     * @return Array
     **/
    getContactsAreClients: function (clientID) {
        let contactList = [];
        Person.findOne(
            {where: {id: clientID}}
        ).then(function (person) {
            if (person) {
                contactList = updateContactList(person.contactList);
                person.updateAttributes({
                    contactList: contactList
                });
            }
        });
        return contactList;
    },

    /**
     * Devuelve un listado con los clientes online
     *
     * @return Array
     **/
    getOnlineClients: function () {
        let onlineClients = [];
        Client.findAll({
            where: {
                isOnline: true
            }
        }).then(function (clients) {
            if (clients) {
                onlineClients = clients;
            }
        });
        return onlineClients;
    }
};