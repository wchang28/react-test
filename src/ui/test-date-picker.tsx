import * as React from 'react';
import * as DatePicker from 'react-datepicker';

interface State {
	date?: Date;
}

export class Test extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date()
		};
	}
	onChange(date: Date) {
		this.setState({date});
	}
	render() {
		const CustomInput = (({value, onClick}) => (
			<input className="w3-input" type="text" value={value} onClick={onClick}/>
		)) as any;
		return (
		<div>
            <p>
                <label>Select a date</label>
				<DatePicker.default
					selected={this.state.date}
					onChange={(date) => this.onChange(date)}
					customInput={<CustomInput />}
					showYearDropdown
					dateFormatCalendar="MMMM"
					yearDropdownItemNumber={15}
				/>
			</p>
		</div>
		);
	}
}