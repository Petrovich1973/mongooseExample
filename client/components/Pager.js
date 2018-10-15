import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Pager extends React.Component {
	constructor(props) {
		super(props);
        this.handleClick = this.handleClick.bind(this);
	}

    handleClick(current) {
        this.props.onchangeCurrentPage(current);
    }

    range(start, end, currentPage) {

        let resultList = [];

        for (let i = start; i <= end; i++) {
            if(i === currentPage) {
                resultList.push({text: i, state: 'current'});
            } else if(i < 3 || i > end - 2 || i === currentPage - 1 || i === currentPage + 1) {
                resultList.push({text: i, state: 'link'});
            } else {
                resultList.push({text: '...', state: 'points'});
            }
        }

        let removeDouble = (array, name, sep) => {
            let rubicon = false;
            let double = false;
            let resultList = [];
            array.forEach(m => {
                if(m.state === name && !double && !rubicon) {
                    resultList.push(m);
                    double = true;
                } else if(m.state === sep) {
                    resultList.push(m);
                    double = false;
                    rubicon = true;
                } else if(m.state === name && !double) {
                    resultList.push(m);
                    double = true;
                } else  if(m.state !== name) {
                    resultList.push(m);
                }
            });
            return resultList;
        };

        return removeDouble(resultList, 'points', 'current');
    }

	render() {

		const { total, current, perPage, length } = this.props;

		const count = Math.ceil(total / perPage);
		
		return (
			<div className="pager">
				<span className="total">&nbsp;&nbsp;&nbsp;<em>{length} из {total}</em>&nbsp;&nbsp;&nbsp;<i className="fa fa-television" /></span>
                <ul>
                    { this.range(1, count, current).map((idx, i) => {
                        if ( idx.state === 'current' ) return <li 
                            className="current btn btn-sm" 
                            key={i}>
                                {idx.text}
                            </li>;
                        if ( idx.state === 'link' ) return <li 
                            className="link" 
                            key={i} 
                            onClick={() => this.handleClick(idx.text)}>
                                {idx.text}
                            </li>;
                        if ( idx.state === 'points' ) return <li 
                            className="points" 
                            key={i}>
                                <input 
                                type="text" 
                                onKeyPress={(e) => {
                                    if(e.charCode === 13 && Number(e.target.value) > 0) 
                                        this.handleClick(Number(e.target.value))
                                    }} 
                                onBlur={(e) => {e.target.value = ''}} 
                                placeholder={idx.text}/>
                            </li>;
                    }) }
                </ul>
			</div>
		)
	}
}

Pager.defaultProps = {
  total: 0, 
  current: 1, 
  perPage: 10,
  length: 0
};

Pager.displayName = 'Pager';

export default Pager;