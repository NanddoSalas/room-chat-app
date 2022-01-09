import { Avatar, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { MdLogout } from 'react-icons/md';
import { useMeQuery } from '../generated/graphql';

const MainHeader = () => {
  const { data, client } = useMeQuery();

  const handleLogout = async () => {
    Cookies.remove('accessToken');

    await client.clearStore();
    client.refetchQueries({ include: ['Me'] });
  };

  return (
    <Flex w="full" justify="space-around" align="center">
      <HStack>
        <Avatar name={data?.me?.name} src={data?.me?.avatar} size="xl" />
        <Text fontSize="2xl">{data?.me?.name}</Text>
      </HStack>

      <IconButton
        variant="ghost"
        colorScheme="red"
        fontSize="xl"
        icon={<MdLogout />}
        aria-label="log out"
        rounded="full"
        onClick={handleLogout}
      />
    </Flex>
  );
};

export default MainHeader;
