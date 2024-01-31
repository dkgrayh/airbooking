import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({
        message: ' Signed Out!' as 'string',
        type: 'SUCCESS',
      });
    },
    onError: (error: Error) => {
      showToast({ message: error.message as 'string', type: 'ERROR' });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="text-gray-600 px-2 bg-white font-bold hover:bg-blue-100"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
