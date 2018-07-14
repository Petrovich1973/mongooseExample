import React from 'react';

import User from './User';

class Users extends React.Component {
	constructor(props) {
		super(props);
	}

	next() {
		this.reactSwipe.next();
	}

	prev() {
		this.reactSwipe.prev();
	}

	render() {

		const { users, msg } = this.props;

		return (
			<div className="table-responsive">

				{ users.length ?
					<table className="users table table-striped">
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>age</th>
								<th>gender</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ users.map(user => <User key={ user.id } user={ user }/>) }
						</tbody>
					</table> :
					<p className="text-center">Users not found</p> }
				
			</div>			
		)
	}
}

Users.displayName = 'Users';

export default Users;