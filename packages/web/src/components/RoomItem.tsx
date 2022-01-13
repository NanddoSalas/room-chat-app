import { ArrowForwardIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { useLeaveRoomMutation } from '../generated/graphql';

interface RoomItemProps {
  id: string;
  name: string;
  invitationCode: string;
  onConnect: () => void;
}

const RoomItem: React.FC<RoomItemProps> = ({
  id,
  name,
  invitationCode,
  onConnect,
}) => {
  const { onCopy, hasCopied } = useClipboard(invitationCode);
  const [{ fetching }, leaveRoom] = useLeaveRoomMutation();

  const handleLeaveRoom = async () => {
    leaveRoom({ roomId: id });
  };

  return (
    <Flex w="full" justify="space-between" align="center">
      <Text fontSize="3xl">{name}</Text>

      <HStack>
        <Tooltip
          label={hasCopied ? 'Copied!' : 'Copy Invitation Code'}
          closeOnClick={false}
        >
          <IconButton
            icon={<CopyIcon />}
            aria-label="copy invitation code"
            variant="ghost"
            rounded="full"
            onClick={onCopy}
          />
        </Tooltip>

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
