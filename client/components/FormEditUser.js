import React from 'react';
import { connect } from 'react-redux';

import InputMask from 'react-input-mask';
import classNames from 'classnames';

import { editUserSend, editUserCancel } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class FormEditUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState = {
			form: {
				id: {value: '', validate: true},
				name: {value: '', style: 'has-success', validate: true},
				age: {value: '', style: 'has-success', validate: true},
				gender: {value: 'male', style: 'has-success', validate: true}
			}
		};
	}

	componentWillMount() {
		this.setState({
			form: {
				...this.state.form,
				id: {...this.state.form.id, value: this.props.user.id},
				name: {...this.state.form.name, value: this.props.user.name},
				age: {...this.state.form.age, value: this.props.user.age},
				gender: {...this.state.form.gender, value: this.props.user.gender}
			}
		});
	}

	componentWillUnmount() {
		this.setState({
			form: this.initialState.form
		});
	}

	handleClickEditUserSend() {

		const { form } = this.state;
		const { users } = this.props.users;

		const newUser = {
			id: form.id.value, 
			name: form.name.value, 
			age: form.age.value, 
			gender: form.gender.value
		};

		this.props.dispatch(editUserSend(newUser));
	}

	handleClickEditUserCancel() {
		this.props.dispatch(editUserCancel());
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
				return true;
		}
	}

	render() {

		const { form } = this.state;
		let validate = Object.keys(form).map(m => form[m].validate);

		return (
			<tr className="edit-row">
				<td className="align-middle">
					{form.id.value}
				</td>
				<td className={classNames("align-middle", form.name.style)}>
					<input 
					name="name"
					type="text" 
					className="form-control input-sm" 
					autoComplete="off"
					value={form.name.value}
					onChange={this.handleFormElementInput.bind(this)} />
				</td>
				<td className={classNames("align-middle", form.age.style)}>
					<InputMask 
					name="age"
					type="text" 
					className="form-control input-sm" 
					autoComplete="off"
					value={form.age.value}
					mask="99"
					maskChar=""
					onChange={this.handleFormElementInput.bind(this)} />
				</td>
				<td className={classNames("align-middle", form.gender.style)}>
					<select 
					name="gender"
					className="form-control input-sm" 
					value={form.gender.value}
					onChange={this.handleFormElementInput.bind(this)}>
						<option value="male">male</option>
						<option value="female">female</option>
					</select>
				</td>
				<td className="align-middle text-right">
					<i 
					className="fa fa-floppy-o save"
					onClick={validate.indexOf(false) === -1 ? this.handleClickEditUserSend.bind(this) : null}/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<i 
					className="fa fa-undo cancel"
					onClick={this.handleClickEditUserCancel.bind(this)}/>
				</td>
			</tr>
		)
	}
}

FormEditUser.displayName = 'FormEditUser';

export default FormEditUser;