import { Avatar, Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { useUserQuery } from '../generated/graphql';

const MessageItem: React.FC<{
  message: string;
  userId: string;
  createdAt: number;
  right: boolean;
}> = ({ message, userId, right }) => {
  const [{ data, fetching }] = useUserQuery({ variables: { userId } });

  if (fetching) return null;

  const avatar = data?.user?.avatar;
  const name = data?.user?.name;

  return (
    <Stack
      w="full"
      align="start"
      justify={right ? 'end' : 'start'}
      direction={right ? 'row-reverse' : 'row'}
    >
      <Avatar name={name} src={avatar} />

      <VStack align={right ? 'end' : 'start'}>
        <Stack direction={right ? 'row-reverse' : 'row'} align="end">
          <Heading size="md">{name}</Heading>
          <Text fontSize="xs">TODO: day/month/year - hours:munites</Text>
        </Stack>

        <Box p={4} bg="whiteAlpha.50" borderRadius="xl">
          <Text>
            {message.split('\\n').map((x, index, data) => (
              <span key={index}>
                {x}
                {data.length > index + 1 && <br />}
              </span>
            ))}
          </Text>
        </Box>
      </VStack>
    </Stack>
  );
};

export default MessageItem;
