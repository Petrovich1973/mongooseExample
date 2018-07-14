import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import FormAddUser from './FormAddUser';
import Users from './Users';
import Notify from './Notify';

import { fetchUsers, editUserCancel } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState = {}
	}

	componentWillMount() {
		!this.props.users.length ? this.props.dispatch(fetchUsers()) : null;
	}

	handleClickUpdateUsers() {
		this.props.dispatch(fetchUsers());
	}

	handleClickEditUserCancel() {
		this.props.dispatch(editUserCancel());
	}

	render() {

		const { users, editMode, waiting, msg } = this.props.users;

		return (
			<div>
				<div className={classNames({"blur": waiting || msg})}>
					{ editMode ? <div className="overlay" onClick={this.handleClickEditUserCancel.bind(this)} /> : null }
					<div className="container">

						<h1><img src="libs/img/logo-sb.svg" width="48"/> <span>Users screen</span></h1>					

						<FormAddUser className="blur" />

						<h3 className="flex-space-between" style={{flexWrap: 'wrap'}}>
							<span style={{flex: 1}}>
								Users list <button 
								type="button"
								className="btn btn-default btn-xs"
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									<i className={classNames("fa", "fa-refresh", {"fa-spin": waiting})} /> Update
								</button> <button 
								type="button"
								className="btn btn-default btn-xs"
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									<i className={classNames("fa", "fa-cog", {"fa-spin": waiting})} /> Settings
								</button>
							</span>
							<span className="pager">
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									1
								</button>
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									2
								</button>
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									3
								</button>
								{' ... '}
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									8
								</button>
								<button 
								type="button"
								className="btn btn-secondary btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									9
								</button>
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									10
								</button>
								{' ... '}
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									13
								</button>
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									14
								</button>
								<button 
								type="button"
								className="btn btn-default btn-xs"							
								disabled={ waiting ? true : false }
								onClick={ this.handleClickUpdateUsers.bind(this) }>
									15
								</button>
							</span>
						</h3>

						{ users.length ? 
							<Users users={ users } /> : null }

					</div>
				</div>	

				{ waiting ? 					
					<div className="modal show flex" role="dialog">
						<div className="modal-dialog" role="document">								
							<p className="text-center">
								<i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
							</p>
						</div>
					</div> : null }

				{msg && !waiting ? 
					<div className="modal show flex" role="dialog">
						<div className="modal-dialog" role="document">								
							<Notify />
						</div>
					</div> : null}

			</div>			
		)
	}
}

App.displayName = 'App';

export default App;