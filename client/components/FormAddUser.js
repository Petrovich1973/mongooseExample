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
			},
			offsetHeight: 0
		};
		this.idForm = React.createRef();
	}

	componentDidMount() {
		this.setState({
			offsetHeight: this.idForm.current.scrollHeight
		});
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

	formReset() {
		this.setState({
			form: {
				...this.initialState.form			
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

		const { form, offsetHeight } = this.state;
		const { isOpen } = this.props;
		let validate = Object.keys(form).map(m => form[m].validate);

		const style = {
			overflow: 'hidden',
			height: isOpen ? offsetHeight + 15 : 0,
			padding: !isOpen ? '0 15px' : '15px',
			opacity: isOpen ? 1 : 0
		}

		return (
			<form 
			className={classNames("form", "form-horizontal", {"success": validate.indexOf(false) === -1 ? true : false})} 
			onSubmit={this.handleSubmit.bind(this)}
			ref={this.idForm}
			style={style}>

				<div className="row">
					<div className="col-md-6 offset-md-3">

						<div className="form-group">
							<div className="offset-md-3 col-sm-9">
								<h3>Form Add User</h3>
							</div>
						</div>						

						<div className={classNames("form-group row", "has-feedback", form.name.style)}>
							<label className="col-sm-3 col-form-label text-right my-auto" htmlFor="input1">Name user</label>
							<div className="col-sm-9">
								<input 
								name="name"
								type="text" 
								value={form.name.value}
								className="form-control form-control-sm" 
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

						<div className={classNames("form-group row", "has-feedback", form.age.style)}>
							<label className="col-sm-3 col-form-label text-right my-auto" htmlFor="input2">Age user</label>
							<div className="col-sm-9">
								<InputMask 
								name="age"
								type="text" 
								value={form.age.value}
								className="form-control form-control-sm" 
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

						<div className={classNames("form-group row", "has-feedback", form.gender.style)}>
							<label className="col-sm-3 col-form-label text-right my-auto" htmlFor="input2">Gender user</label>
							<div className="col-sm-9">
								<select 
								name="gender" 
								value={form.gender.value}
								className="form-control form-control-sm"
								onChange={this.handleFormElementInput.bind(this)}>
									<option value="male">male</option>
									<option value="female">female</option>
								</select>
							</div>
						</div>

						<div className="form-group row">
							<div className="offset-3 col-sm-9">
								<button 
								type="submit" 
								className={classNames("btn", {"btn-success": validate.indexOf(false) === -1 ? true : false})}
								disabled={ validate.indexOf(false) === -1 ? false : true }><i className="fa fa-save" /> Save user</button>
								<span className="btn btn-link text-muted btn-sm" onClick={this.formReset.bind(this)}>Reset</span>
							</div>
						</div>

					</div>
				</div>

			</form>
		)
	}
}

FormAddUser.defaultProps = {
	isOpen: false
};

FormAddUser.displayName = 'FormAddUser';

export default FormAddUser;