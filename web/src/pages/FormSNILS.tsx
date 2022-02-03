import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {};

const FormSNILS: React.FC<Props> = () => {
  const { search } = useLocation();
  const [userID, setUserID] = useState('');
  const [userFIO, setUserFIO] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const uid = searchParams.get('uid');
        const res = await fetch(`https://медовиков.рф:8443/users/${uid}`);
        const { user_id: id, first_name: firstName, second_name: secondName } = await res.json();
		console.log(id);	

        setUserID(id);
        setUserFIO(name);
      } catch (err) {
        setUserID('0');
        setUserFIO('Аноним');
      }
    };

    getData();
  }, []);

  return userFIO === '' ? (
    <h1>Loading...</h1>
  ) : (
    <h1>
      Привет, {userFIO}! Ваш ID: {userID}
    </h1>
  );
};

export { FormSNILS };
