import styled from "styled-components";

const StyledLogo = styled.div`
  position: relative;
  text-align: center;
  display: inline-block;
`;

const LogoText = styled.p`
  position: absolute;
  opacity: 75%;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  font-family: "Poppins";
  font-weight: bold;
  z-index: 100;
  font-size: 1.5rem;
  color: #fff;
  -webkit-text-stroke: 1px #000;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <LogoText>CHERRY CABINS</LogoText>
      <Img src="/cabin-logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
