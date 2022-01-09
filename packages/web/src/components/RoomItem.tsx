import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useLeaveRoomMutation } from '../generated/graphql';

interface RoomItemProps {
  id: string;
  name: string;
  onConnect: () => void;
}

const RoomItem: React.FC<RoomItemProps> = ({ id, name, onConnect }) => {
  const [leaveRoom, { loading, client }] = useLeaveRoomMutation();

  const handleLeaveRoom = async () => {
    const { data } = await leaveRoom({ variables: { roomId: id } });

    if (data?.leavedRoomId) {
      client.cache.modify({
        fields: {
          rooms(roomRefs = [], { readField }) {
            return roomRefs.filter(
              (roomRef: any) => readField('id', roomRef) !== id,
            );
          },
        },
      });
    }
  };

  return (
    <Flex w="full" justify="space-between" align="center">
      <Text fontSize="3xl">{name}</Text>

      <HStack>
        <Button
          colorScheme="blue"
          variant="ghost"
          fontSize="lg"
          rightIcon={<ArrowForwardIcon />}
          isDisabled={loading}
          onClick={onConnect}
        >
          Connect
        </Button>

        <Button
          colorScheme="red"
          variant="ghost"
          fontSize="lg"
          isDisabled={loading}
          onClick={handleLeaveRoom}
        >
          Leave
        </Button>
      </HStack>
    </Flex>
  );
};

export default RoomItem;
