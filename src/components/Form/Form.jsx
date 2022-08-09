import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const FormWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  @media ${(props) => props.theme.media.tablet} {
    padding: 0 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  background: ${(props) => props.background};
  border-radius: 8px;
  outline: none;
  border: none;
  font-size: ${(props) => props.fontSize || '16px'};
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.marginBottom || '20px'};
`;
const CustomCheckbox = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  ${(props) =>
    props.checked &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        background: #4a67ff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`;
const Checkbox = styled.input`
  opacity: 0;
  margin-right: 17px;
`;
const ErorrServer = styled.div`
  background: #f5e9e9;
  border: 1px solid #e26f6f;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 27px;
`;
const ErrorInput = styled.div`
  font-size: 14px;
  color: #e26f6f;
  margin-top: 8px;
`;
const ErrorIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background: #ffc8c8;
  border-radius: 50%;
  font-size: 14px;
  color: #ee6565;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Form = ({ request, password }) => {
  const [error, setError] = useState(null);
  const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsBtnDisable(true);
    try {
      await request(data);
      navigate('/profile');
      if (data.rememberPassword) {
        localStorage.setItem('password', password);
      } else {
        localStorage.clear();
      }
    } catch (err) {
      setError(err.message);
    }
    setIsBtnDisable(false);
  };

  if (localStorage.getItem('password')) setValue('password', password);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <ErorrServer>
            <Flex>
              <ErrorIcon>!</ErrorIcon>
              {error}
            </Flex>
          </ErorrServer>
        )}
        <Label>
          Логин
          <Input background="#F5F5F5" {...register('login', { required: 'Обязательное поле' })} />
          {errors.login && <ErrorInput>{errors.login.message}</ErrorInput>}
        </Label>
        <Label>
          Пароль
          <Input
            background="#F5F5F5"
            {...register('password', { required: 'Обязательное поле' })}
          />
          {errors.password && <ErrorInput>{errors.password.message}</ErrorInput>}
        </Label>
        <Label marginBottom="30px">
          <CustomCheckbox checked={isChecked} />
          <Checkbox
            onClick={(e) => setIsChecked(e.target.checked)}
            type="checkbox"
            {...register('rememberPassword')}
          />
          Запомнить пароль
        </Label>
        <Input
          color="#fff"
          background={isBtnDisable ? '#99A9FF' : '#4A67FF'}
          fontSize="18px"
          disabled={isBtnDisable}
          type="submit"
          value="войти"
        />
      </form>
    </FormWrapper>
  );
};

export default Form;
