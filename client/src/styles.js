import styled from 'styled-components';

export const TitleStyled = styled.h1`
  font-size: 1.5em;
  margin: 0.5em 0;
  text-align: center;
  text-transform: uppercase;
`;

export const SubtitleStyled = styled.h2`
  font-size: 1.3em;
  margin: 0.5em 0;
  text-align: center;
`;

export const Separator = styled.hr`
  display: block;
  width: 100%;
`;

export const WrapperStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
`;

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  width: 75%;
`;

export const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  width: 25%;
`;

export const IconButtonContainer = styled.div`
  button, a {
    font-size: 22px;
    line-height: 11px;
    background-color: white;
    color: #de3d8d;
    border-color: white;
    box-shadow: none;
  }

  a:hover {
    border-color: #bb2972;
    color: white !important;
    height: 32px;
    display: block;
    line-height: 11px;

    i {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #bb2972;
      padding-top: 5px;
    }
  }
`;
