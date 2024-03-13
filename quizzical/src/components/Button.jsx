/* eslint-disable react/prop-types */

const Button = ({value, onSelect, isDisabled, buttonStyles}) => {
  const handleClick = () => {
      if (!isDisabled) {
          onSelect(value);
      }
  };

  return (
      <button
          className="answer"
          onClick={handleClick}
          style={buttonStyles}
          disabled={isDisabled}
      >
          {value}
      </button>
  );
};

export default Button;