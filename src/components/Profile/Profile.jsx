import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfileStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Greeting = styled.div`
  font-size: 40px;
  margin-bottom: 50px;
  @media ${(props) => props.theme.media.phone} {
    font-size: 25px;
  }
`;
const Bold = styled.span`
  font-weight: 700;
  font-size: 40px;
  @media ${(props) => props.theme.media.phone} {
    font-size: 25px;
  }
`;
const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  padding: 19px 71px;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Profile = ({ login }) => {
  return (
    <ProfileStyled>
      <Greeting>
        Здравствуйте, <Bold>{login}</Bold>
      </Greeting>
      <StyledLink to={'/'}>Выйти</StyledLink>
    </ProfileStyled>
  );
};

export default Profile;
