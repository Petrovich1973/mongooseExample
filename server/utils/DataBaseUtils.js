import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/User';

const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers() {
    return User.find();
}

export function createUser(data) {
    const user = new User({
        id:     mongoose.Types.ObjectId(),
        name:   data.name,
        age:    data.age,
        gender: data.gender
    });
    return user.save();
}

export function editUser(id, data) {
    const userUpdate = {
        id:   data.id,
        name:   data.name,
        age:    data.age,
        gender: data.gender
    };    
    return User.update({id: id}, {$set: userUpdate});
}

export function deleteUser(id) {
    return User.findOne({id: id}).remove().exec();
}