import React from 'react';
import { connect } from 'react-redux';

import InputMask from 'react-input-mask';
import classNames from 'classnames';

import { addUser } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class FormAddUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState = {
			form: {
				name: {value: '', style: '', validate: false},
				age: {value: '', style: '', validate: false},
				gender: {value: 'male', style: 'has-success', validate: true}
			}
		};
	}

	handleSubmit(e) {
		e.preventDefault();

		const { form } = this.state;
		const { users } = this.props.users;

		const newUser = {
			name: form.name.value, 
			age: form.age.value, 
			gender: form.gender.value
		};

		this.setState({
			form: this.initialState.form
		});

		this.props.dispatch(addUser(newUser));

		return false;
	}

	handleFormElementInput(e) {
		const { name, value } = e.target;
		const { form } = this.state;

		let newElementState = this.validate(name, value);

		this.setState({
			form: {
				...form,
				...newElementState				
			}
		});
	}

	validate(name, value) {

		switch(name) {

			case 'name':
				if(value === '') {
					return {[name]: {...this.state.form[name], value: value, style: '', validate: false}};
				} else if(value.length > 3) {
					return {[name]: {...this.state.form[name], value: value, style: 'has-success', validate: true}};
				} else {
					return {[name]: {...this.state.form[name], value: value, style: 'has-error', validate: false}};
				}

			case 'age':
				if(value === '') {
					return {[name]: {...this.state.form[name], value: value, style: '', validate: false}};
				} else if(value < 80 && value > 18) {
					return {[name]: {...this.state.form[name], value: value, style: 'has-success', validate: true}};
				} else {
					return {[name]: {...this.state.form[name], value: value, style: 'has-error', validate: false}};
				}

			case 'gender':
				return {[name]: {...this.state.form[name], value: value, style: 'has-success', validate: true}};
				
			default:
				return false;
		}
	}

	render() {

		const { form } = this.state;
		let validate = Object.keys(form).map(m => form[m].validate);

		return (
			<form 
			className={classNames("form", "form-horizontal", {"success": validate.indexOf(false) === -1 ? true : false})} 
			onSubmit={this.handleSubmit.bind(this)}>

				<div className="row">
					<div className="col-md-8 col-md-offset-2">

						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-10">
								<h3>Form Add User</h3>
							</div>
						</div>						

						<div className={classNames("form-group", "has-feedback", form.name.style)}>
							<label className="control-label col-sm-2" htmlFor="input1">Name user</label>
							<div className="col-sm-10">
								<input 
								name="name"
								type="text" 
								value={form.name.value}
								className="form-control" 
								id="input1"
								autoComplete="off"
								onChange={this.handleFormElementInput.bind(this)}/>
								{ form.name.style === 'has-error' ? 
									<span className="glyphicon glyphicon-remove form-control-feedback"/> :
									form.name.style === 'has-success' ?  
									<span className="glyphicon glyphicon-ok form-control-feedback"/> :
									null }
							</div>
						</div>

						<div className={classNames("form-group", "has-feedback", form.age.style)}>
							<label className="control-label col-sm-2" htmlFor="input2">Age user</label>
							<div className="col-sm-10">
								<InputMask 
								name="age"
								type="text" 
								value={form.age.value}
								className="form-control" 
								id="input2"
								autoComplete="off"
								onChange={this.handleFormElementInput.bind(this)}
								mask="99"
								maskChar=""/>
								{ form.age.style === 'has-error' ? 
									<span className="glyphicon glyphicon-remove form-control-feedback"/> :
									form.age.style === 'has-success' ?  
									<span className="glyphicon glyphicon-ok form-control-feedback"/> :
									null }
							</div>
						</div>

						<div className={classNames("form-group", "has-feedback", form.gender.style)}>
							<label className="control-label col-sm-2" htmlFor="input2">Gender user</label>
							<div className="col-sm-10">
								<select 
								name="gender" 
								value={form.gender.value}
								className="form-control"
								onChange={this.handleFormElementInput.bind(this)}>
									<option value="male">male</option>
									<option value="female">female</option>
								</select>
							</div>
						</div>

						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-10">
								<button 
								type="submit" 
								className={classNames("btn", {"btn-success": validate.indexOf(false) === -1 ? true : false})}
								disabled={ validate.indexOf(false) === -1 ? false : true }><i className="fa fa-plus" /> Add user</button>
							</div>
						</div>

					</div>
				</div>

			</form>
		)
	}
}

FormAddUser.displayName = 'FormAddUser';

export default FormAddUser;