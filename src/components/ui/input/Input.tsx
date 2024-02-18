import styled from "styled-components";

interface InputProps {
	type: string;
	setData: (data: string) => void;
	value: string;
}

const StyledInput = styled.input`
	width: 200px;
	height: 20px;
`;

const Input: React.FC<InputProps> = ({ type, setData, value }) => {
	return (
		<StyledInput
			type={type}
			value={value}
			onChange={(e) => {
				setData(e.target.value);
			}}
		/>
	);
};

export default Input;
