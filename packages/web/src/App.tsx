import { Flex, Spinner } from '@chakra-ui/react';
import { useMeQuery } from './generated/graphql';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

const App = () => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return (
      <Flex h="100vh" w="full" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (data?.me) {
    return <MainPage />;
  }

  return <AuthPage />;
};

export default App;
