import styled from 'styled-components';

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0; /* Adding spacing as requested in Part 3 */
`;

function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
  return (
    <StyledInputGroup>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </StyledInputGroup>
  );
}

export default TextInputWithLabel;