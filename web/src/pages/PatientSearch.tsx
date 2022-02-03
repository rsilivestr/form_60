import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

import { useUser } from '@hooks/useUser';

type Props = {};

const StyledForm = styled.form`
  display: flex;
  gap: 4px;
`;

const PatientSearch: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid') || '';
  const user = useUser(uid);
  const [userID, setUserID] = useState('');
  const [userFIO, setUserFIO] = useState('');
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const onSnilsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = e.target.value
      .replace(/\D/g, '')
      .replace(/^(\d{3})-?(\d{1,3})$/, '$1-$2')
      .replace(/^(\d{3})-?(\d{3})-?(\d{1,3})$/, '$1-$2-$3')
      .replace(/^(\d{3})-?(\d{3})-?(\d{3})\s?(\d{1,2})(\d+)?$/, '$1-$2-$3 $4');

    setValue('snils', masked);
  };

  useEffect(() => {
    setValue('identificator', user.id);
    setUserID(user.id);
    setUserFIO(user.fio);
  }, [user]);

  return (
    <>
      {userFIO === '' ? (
        <h1>Loading...</h1>
      ) : (
        <h1>
          Привет, {userFIO}! Ваш ID: {userID}
        </h1>
      )}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="search"
          variant="outlined"
          label="СНИЛС"
          {...register('snils', { required: true, onChange: onSnilsChange })}
        />
        <Input type="hidden" {...register('identificator', { required: true })} />
        <Button type="submit" variant="contained">
          Искать
        </Button>
      </StyledForm>
    </>
  );
};

export { PatientSearch };
