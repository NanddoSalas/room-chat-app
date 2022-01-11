import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useLeaveRoomMutation } from '../generated/graphql';

interface RoomItemProps {
  id: string;
  name: string;
  onConnect: () => void;
}

const RoomItem: React.FC<RoomItemProps> = ({ id, name, onConnect }) => {
  const [{ fetching }, leaveRoom] = useLeaveRoomMutation();

  const handleLeaveRoom = async () => {
    leaveRoom({ roomId: id });
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
          isDisabled={fetching}
          onClick={onConnect}
        >
          Connect
        </Button>

        <Button
          colorScheme="red"
          variant="ghost"
          fontSize="lg"
          isDisabled={fetching}
          onClick={handleLeaveRoom}
        >
          Leave
        </Button>
      </HStack>
    </Flex>
  );
};

export default RoomItem;
