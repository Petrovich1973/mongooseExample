import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import User from './User';
import Filter from './Filter';

import { filterReset } from '../actions/userActions';

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.filterClear = this.filterClear.bind(this);
	}

	filterClear() {		
		this.props.dispatch( filterReset() );
	}

	render() {

		const { users, msg, waiting } = this.props;

		return (
			<div className="table-responsive">

				<table className="users table table-sm table-striped">
					<thead>
						<tr>
							<th className="text-uppercase"><i className="fa fa-sort-amount-asc" /> id</th>
							<th className="text-uppercase">name</th>
							<th className="text-uppercase">age</th>
							<th className="text-uppercase">gender</th>
							<th className="text-uppercase"></th>
						</tr>
						<Filter title="Filter">
							<button 
							type="button"
							className="btn btn-info btn-sm"
							disabled={ waiting ? true : false }
							onClick={ this.props.fetchUsers }>
								<i className={classNames("fa", "fa-filter", {"fa-spin": waiting})} /> Apply
							</button>
							{' '}
							<span className="btn btn-link text-warning btn-sm" onClick={this.filterClear}>Clear</span>				
						</Filter>
					</thead>
					<tbody>
						{ users.map(user => <User key={ user.id } user={ user }/>) }
					</tbody>
				</table>
				
			</div>			
		)
	}
}

Users.defaultProps = {
  fetchUsers: () => {}
};

Users.displayName = 'Users';

export default connect()(Users);