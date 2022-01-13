import { Avatar, Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { useUserQuery } from '../generated/graphql';

const MessageItem: React.FC<{
  message: string;
  userId: string;
  createdAt: number;
  right: boolean;
}> = ({ message, userId, createdAt, right }) => {
  const [{ data, fetching }] = useUserQuery({ variables: { userId } });

  if (fetching) return null;

  const avatar = data?.user?.avatar;
  const name = data?.user?.name;
  const date = new Date(createdAt);

  const __html = message.replace(/(\n+)+$/g, '').replaceAll('\n', '</br>');

  return (
    <Stack
      w="full"
      align="start"
      justify={right ? 'end' : 'start'}
      direction={right ? 'row-reverse' : 'row'}
    >
      <Avatar name={name} src={avatar} loading="eager" ignoreFallback />

      <VStack align={right ? 'end' : 'start'}>
        <Stack direction={right ? 'row-reverse' : 'row'} align="end">
          <Heading size="md">{name}</Heading>
          <Text fontSize="xs">
            {`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}
          </Text>
        </Stack>

        <Box p={4} bg="whiteAlpha.50" borderRadius="xl">
          <Text
            dangerouslySetInnerHTML={{
              __html,
            }}
          />
        </Box>
      </VStack>
    </Stack>
  );
};

export default MessageItem;
