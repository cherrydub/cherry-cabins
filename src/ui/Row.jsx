import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
//can add default, no props need to be passed in this case
//usually would do {type = 'example'} with normal components
Row.defaultProps = {
  type: "vertical",
};

export default Row;
