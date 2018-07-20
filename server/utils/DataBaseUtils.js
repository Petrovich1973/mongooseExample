import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/User';

const User = mongoose.model('User');


export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,  { useNewUrlParser: true });
}

export async function listUsers(page, params) {

    var page = Number(page) || 1,
        perPage = Number(params.perPage) || 5;

    const filter = {...JSON.parse(params.filter)};

    await Object.keys(filter).forEach(item => {
        if(!filter[item])
            delete filter[item];
        if(item === 'name') {
            let regex = new RegExp(filter[item], "i");
            filter[item] = { $regex: regex };
        }
        // if(item === 'age')
        //     filter[item] = { $gt: 0, $lt: filter[item] }
    });

    const countFilter = await User.count({...filter});

    const count = countFilter === 0 ? 1 : countFilter;

    const lastPage = Math.ceil(count / perPage);

    return User
        .paginate({...filter}, { sort: { age: 1, name: 1 }, page: page > lastPage ? lastPage : page, limit: perPage })
        .then(result => {
            return {
                users: result.docs,
                total: result.total,
                page: result.page
            }
        })
        .catch(err => err);

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
    return User.deleteOne({id: id});
}