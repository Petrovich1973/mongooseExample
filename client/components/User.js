import React from 'react';
import { connect } from 'react-redux';

import FormEditUser from './FormEditUser';

import { deleteUser, editModeUser } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class User extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickRemoveUser = this.handleClickRemoveUser.bind(this);
		this.handleClickEditUser = this.handleClickEditUser.bind(this);
	}

	handleClickRemoveUser(user) {
		this.props.dispatch(deleteUser(user.id));
	}

	handleClickEditUser(user) {
		this.props.dispatch(editModeUser(user));
	}

	render() {
		const { user } = this.props;
		const { editMode } = this.props.users;

		if(editMode !== user.id) {
			return (
				<tr onDoubleClick={ () => this.handleClickEditUser(user) }>
					<td className="align-middle">{user.id}</td>
					<td className="align-middle">{user.name}</td>
					<td className="align-middle">{user.age}</td>
					<td className="align-middle">{user.gender}</td>
					<td className="align-middle text-right">
						<i 
						className="fa fa-trash remove"
						style={{fontSize: '110%'}}
						onClick={ () => this.handleClickRemoveUser(user) }/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i 
						className="fa fa-edit edit"
						onClick={ () => this.handleClickEditUser(user) }/>
					</td>
				</tr>			
			) 
		} else {
			return (
				<FormEditUser user={user} />		
			)
		}
	}
}

User.displayName = 'User';

export default User;