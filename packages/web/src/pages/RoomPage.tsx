import { Container, Flex, useBreakpointValue, Wrap } from '@chakra-ui/react';
import ListMembers from '../components/ListMembers';
import ListMessages from '../components/ListMessages';
import MessageForm from '../components/MessageForm';
import RoomHeader from '../components/RoomHeader';
import {
  Room,
  useNewMessageSubscription,
  useUserJoinedRoomSubscription,
  useUserLeavedRoomSubscription,
} from '../generated/graphql';

interface RoomPageProps extends Room {
  disconnect: () => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ id, name, disconnect }) => {
  const showMembers = useBreakpointValue({ base: false, lg: true });
  useUserJoinedRoomSubscription({ variables: { roomId: id } });
  useUserLeavedRoomSubscription({ variables: { roomId: id } });
  useNewMessageSubscription({ variables: { roomId: id } });

  return (
    <Flex direction="column" minH="100vh">
      <RoomHeader roomName={name} roomId={id} onDisconnect={disconnect} />

      <Container maxW="container.xl" d="flex" flex={1}>
        <Flex flex={1}>
          {showMembers && (
            <Wrap
              minW="xs"
              maxW="xs"
              m={4}
              p={4}
              spacing={4}
              bg="whiteAlpha.50"
              borderRadius="lg"
            >
              <ListMembers roomId={id} />
            </Wrap>
          )}

          <Flex direction="column" flex="1">
            <ListMessages roomId={id} />

            <MessageForm roomId={id} />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default RoomPage;
