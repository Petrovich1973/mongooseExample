import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { changeFieldFormSettingsTable, changeField, fetchUsers } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class FormSettingsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialize = {
			offsetHeight: 0
		};
		this.idForm = React.createRef();
		this.handleChangeField = this.handleChangeField.bind(this);
		this.changeFieldFormSettingsTable = this.changeFieldFormSettingsTable.bind(this);
	}

	componentDidMount() {
		this.setState({
			offsetHeight: this.idForm.current.scrollHeight
		});
	}

	changeFieldFormSettingsTable(e) {
		let name = e.target.name;
		let value = '';
		if(e.target.type === 'text') value = e.target.value;
		if(e.target.type === 'checkbox') value = e.target.checked;
		this.props.dispatch(changeFieldFormSettingsTable( {[name]: value} ));
	}

	handleChangeField(e) {
		let name = e.target.name;
		let value = '';
		if(e.target.type === 'select-one') value = Number(e.target.value);
		if(e.target.type === 'checkbox') value = e.target.checked;
		this.props.dispatch(changeField( {[name]: value} ));
		if(e.target.name === 'perPage') {
			const { page } = this.props.users;
			this.props.dispatch(fetchUsers( {params: {page: page, perPage: value}} ));
		}
	}

	render() {

		const { offsetHeight } = this.state;
		const { isOpen } = this.props;
		const { usersColumns, perPage, invert } = this.props.users;

		const style = {
			overflow: 'hidden',
			height: isOpen ? offsetHeight + 15 : 0,
			padding: !isOpen ? '0 15px' : '15px',
			opacity: isOpen ? 1 : 0
		}
		return (
			<div
			className="form"
			ref={this.idForm}
			style={style}>

				<div className="row">

					<div className="col-sm-4 groupField">

						<h5>Видимость колонок</h5>

						<ul className="list-group">

							{Object.keys(usersColumns).map((item, i) => {
								return (
									<li key={i} className="form-check form-inline">
										<label className="form-check-label">
											<input
											className="form-check-input"
											type="checkbox"
											name={item}
											checked={usersColumns[item]}
											onChange={this.changeFieldFormSettingsTable} /> {item}</label>
									</li>
								);
							})}

						</ul>

					</div>

					<div className="col-sm-4 groupField">

						<h5>Pagination</h5>

						<div className="form-inline">
							<label className="mr-sm-2" htmlFor="perPage">Строк на странице</label>
							<select 
							className="custom-select mb-2 mr-sm-2 mb-sm-0 form-control-sm" 
							id="perPage" 
							name="perPage"
							value={perPage}
							onChange={this.handleChangeField}>
								<option value="10">10</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						</div>

					</div>

					<div className="col-sm-4 groupField">

						<h5>Visualization</h5>

						<div className="form-check form-inline">
							<label className="form-check-label">
								<input
								className="form-check-input"
								type="checkbox"
								name="invert"
								checked={invert}
								onChange={this.handleChangeField} /> invert effect</label>
						</div>

					</div>

				</div>

			</div>
		);
	}
}

FormSettingsTable.defaultProps = {
	isOpen: true
};

FormSettingsTable.displayName = 'FormSettingsTable';

export default FormSettingsTable;