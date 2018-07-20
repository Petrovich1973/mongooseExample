import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

import { fetchUsers, filterChangeElement } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeElement = this.handleChangeElement.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChangeElement(e) {
		this.props.dispatch(filterChangeElement({[e.target.name]: e.target.value.trim()}));
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			const { perPage } = this.props.users;
			this.props.dispatch(fetchUsers( {params: {page: 1, perPage: perPage}} ));
		}
	}

	render() {

		const { filter } = this.props.users;
		const { title, children, icon } = this.props;

		return (
			<tr className="filterUsers">
				<th className="text-uppercase font-weight-normal">{title} {icon}</th>
				{Object.keys(filter).map((item, i) => {
					return (
						<th key={i} className="align-text-right">


							<AutosizeInput
								type="text" 
								name={item} 
								value={filter[item]}
								className={classNames("form-control", "form-control-sm", {"inputNoempty": filter[item]})}
								onKeyPress={this.handleKeyPress}
								onChange={this.handleChangeElement} />
						</th>
					);
				})}
				<th>
					{children}
				</th>
			</tr>		
		) 
	}
}

Filter.defaultProps = {
	title: null,
	icon: null
};

Filter.displayName = 'Filter';

export default Filter;