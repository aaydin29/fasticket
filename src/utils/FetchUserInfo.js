import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {addUserInfo} from '../redux/reducers';

const FetchUserInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const userId = auth().currentUser.uid;
      database()
        .ref(`users/${userId}/`)
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            dispatch(addUserInfo(data));
          }
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default FetchUserInfo;
