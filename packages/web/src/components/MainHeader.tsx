import { Avatar, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

const MainHeader = () => {
  const [{ data }] = useMeQuery();
  const [, logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Flex w="full" justify="space-around" align="center">
      <HStack>
        <Avatar
          name={data?.me?.name}
          src={data?.me?.avatar}
          size="xl"
          loading="eager"
          ignoreFallback
        />
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
