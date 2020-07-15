import React, {useState} from 'react';
import {NameEntry, Name} from "./name-entry";

export default () => {
	const [value, setValue] = useState<Name>({firstName: "John", lastName: "Doe"});
	return (
		<div>
			<NameEntry value={value} textColor="green" onChange={setValue}/>
		</div>
	);	
}