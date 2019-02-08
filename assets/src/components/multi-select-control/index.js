import wp from 'wp';
import React from 'react';
import Select from 'react-select';

const {
	BaseControl,
} = wp.components;

class MultiSelectControl extends React.Component {
	render() {
		const { help, label, options, value, onChange, placeholder } = this.props;
		let selectValue = []; // eslint-disable-line
		if ( value ) {
			value.map( ( value ) => {
				selectValue.push( {
					value,
					label: options.find( ( o ) => o.value === value ).label,
				} );
			} );
		}

		return (
			<BaseControl
				help={ help }
				label={ label }
				className="gumponents-multi-select-control"
			>
				<Select
					isMulti={ true }
					options={ options }
					value={ selectValue }
					onChange={ ( values ) => {
						if ( onChange ) {
							onChange( values.map( ( val ) => val.value ) );
						}
					} }
					menuPosition={ 'fixed' }
					placeholder={ placeholder }
				/>
			</BaseControl>
		);
	}
}

export default MultiSelectControl;

