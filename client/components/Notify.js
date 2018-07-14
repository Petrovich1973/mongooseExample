import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import FormEditUser from './FormEditUser';

import { clearMsgUsers } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class NotifyUser extends React.Component {
	constructor(props) {
		super(props);
		this.clearMsg = this.clearMsg.bind(this);
	}

	componentDidMount() {
		this.timeoutId = setTimeout(this.clearMsg, 5000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}

	clearMsg() {
		this.props.dispatch(clearMsgUsers());
	}

	render() {
		const { msg, success } = this.props.users;
		
		return (
			<div className={classNames("text-center alert alert-dismissible show", success ? "alert-success" : "alert-danger")} role="alert">
				<i className={classNames("fa", success ? "fa-check" : "fa-exclamation-triangle")} />
				<strong> {success ? 'Успех.' : 'Внимание!'}</strong> {msg}
				<button type="button" className="close" onClick={this.clearMsg}>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		)
	}
}

NotifyUser.displayName = 'NotifyUser';

export default NotifyUser;
		
		// return (
		// 	<div className="modal show" role="dialog" onClick={this.clearMsg}>
		// 		<div className="modal-dialog" role="document">
		// 			<div className="modal-content">
		// 				<div className="modal-header">
		// 					<h5 className="modal-title">Modal title</h5>
		// 					<button type="button" className="close">
		// 						<span aria-hidden="true">&times;</span>
		// 					</button>
		// 				</div>
		// 				<div className="modal-body">
		// 					<p>{msg}</p>
		// 				</div>
		// 				<div className="modal-footer">
		// 					<button type="button" className="btn btn-primary">Save changes</button>
		// 					<button type="button" className="btn btn-secondary">Close</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>	
		// )