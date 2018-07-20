import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import FormSettingsTable from './FormSettingsTable';
import FormAddUser from './FormAddUser';
import Users from './Users';
import Pager from './Pager';
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
		this.state = this.initialState = {
			formEnabled: false,
			settingsEnabled: false
		}
		this.fetchUsers = this.fetchUsers.bind(this);
		this.onchangeCurrentPage = this.onchangeCurrentPage.bind(this);
		this.handleClickBtnAddUser = this.handleClickBtnAddUser.bind(this);
		this.handleClickBtnViewSettings = this.handleClickBtnViewSettings.bind(this);
	}

	componentWillMount() {
		// !this.props.users.length ? this.fetchUsers() : null;
		this.fetchUsers(1);
	}

	handleClickBtnAddUser() {
		this.setState({
			formEnabled: !this.state.formEnabled
		})
	}

	handleClickBtnViewSettings() {
		this.setState({
			settingsEnabled: !this.state.settingsEnabled
		})
	}

	fetchUsers(p) {
		// !this.props.users.length ? this.fetchUsers() : null;
		const { perPage } = this.props.users;
		this.props.dispatch(fetchUsers( {params: {page: p, perPage: perPage}} ));
	}

	handleClickEditUserCancel() {
		this.props.dispatch(editUserCancel());
	}

	onchangeCurrentPage(current) {
		const { perPage } = this.props.users;
		this.props.dispatch(fetchUsers( {params: {page: current, perPage: perPage}} ));
	}

	render() {

		const { filter, total, page, perPage, users, editMode, waiting, msg, invert } = this.props.users;
		const { formEnabled, settingsEnabled } = this.state;

		return (
			<div className={classNames({"invert": invert})}>
				<div className={classNames("box-transition", {"blur" : waiting || msg})}>
					{ editMode ? <div className="overlay" onClick={this.handleClickEditUserCancel.bind(this)} /> : null }
					<div className="container">

						<h1 className="screenTitle"><img src="libs/img/logo-sb.svg" width="48"/> <span>Users screen</span></h1>					

						<FormAddUser isOpen={formEnabled} />

						<h3 className="flex-space-between titleListUser" style={{flexWrap: 'wrap'}}>

							<span style={{flex: 1}} className="text-nowrap">
								Users list
								{' '}
								<button 
								type="button"
								className="btn btn-info btn-sm"
								disabled={ waiting ? true : false }
								onClick={ () => this.fetchUsers(page) }>
									<i className={classNames("fa", "fa-refresh", {"fa-spin": waiting})} /> Update
								</button>
								{' '}
								<button 
								type="button"
								className="btn btn-success btn-sm"
								onClick={ this.handleClickBtnAddUser }>
									<i className={classNames("fa", { "fa-compress": formEnabled }, { "fa-plus": !formEnabled })} /> Add User
								</button>
							</span>

							<div className="d-flex">
								{' '}
								<button 
								type="button"
								className="btn btn-default btn-sm"
								disabled={ waiting ? true : false }
								onClick={ this.handleClickBtnViewSettings }>
									<i className={classNames("fa", "fa-cogs")} /> Settings
								</button>

								{ users.length ? 
									<Pager 
									onchangeCurrentPage={this.onchangeCurrentPage}
									total={total}
									current={page}
									perPage={perPage}
									length={users.length} /> : null }
							</div>

						</h3>

						<FormSettingsTable isOpen={settingsEnabled} />

						<Users users={ users } fetchUsers={() => this.fetchUsers(1)} />

						{ !users.length && !waiting && Object.keys(filter).map(m => filter[m]).indexOf(true) ? 
							<p className="text-center"><i className="fa fa-angle-up fa-4x" /><br/>Попробуйте изменить фильтр</p> : null }

					</div>
				</div>	

				{ waiting ? 					
					<div className="modal show flex" role="dialog">
						<div className="modal-dialog" role="document">								
							<p className="text-center">
								<i className="fa fa-spinner text-warning fa-pulse fa-5x fa-fw" />
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