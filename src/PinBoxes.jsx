import React from 'react';

class PinBoxes extends React.Component {
	constructor(props) {
		super(props);
		this.values = new Array(this.props.length).fill('');
		this.elements = [];
	}

	componentDidMount() {
		this.elements[0].focus();
	}

	handleChange = (e, i) => {
		this.values[i] = e.target.value;
		if (
			i < this.props.length - 1 &&
			this.values[i].length &&
			this.values[i].length === this.props.digit / this.props.length
		) {
			this.elements[i + 1].focus();
		}
	};

	backSpace = (index, e) => {
		if (index > 0 && e.keyCode === 8 && !this.values[index]) {
			this.elements[index - 1].focus();
		}
		if (e.keyCode === 39 && index < this.props.length - 1) {
			this.elements[index + 1].focus();
		}
		if (e.keyCode === 37 && index > 0) {
			this.elements[index - 1].focus();
		}
	};

	handlePaste = e => {
		e.preventDefault();
		let val = e.clipboardData
			.getData('Text')
			.split('')
			.filter((_, i) => i <= this.props.digit);
		let arr = [];
		for (let i = 0; i < this.props.length; i++) {
			var tem = [];
			for (let j = 0; j < this.props.digit / this.props.length; j++) {
				tem.push(val.shift());
			}
			arr.push(tem.join(''));
		}

		arr.forEach((value, i) => {
			this.values[i] = value;
			this.elements[i].value = value;
			if (
				i < this.props.length - 1 &&
				this.elements[i].value.length === this.props.length
			) {
				this.elements[i + 1].focus();
			}
		});
	};

	render() {
		const valu = this.props.digit / this.props.length;
		return (
			<div onPaste={this.handlePaste}>
				{this.values.map((item, i) => {
					return (
						<input
							style={{ width: 50, padding: 10, margin: 10 }}
							onChange={e => this.handleChange(e, i)}
							key={i}
							ref={element => (this.elements[i] = element)}
							maxLength={valu}
							onKeyDown={e => this.backSpace(i, e)}
						/>
					);
				})}
			</div>
		);
	}
}

export default PinBoxes;
