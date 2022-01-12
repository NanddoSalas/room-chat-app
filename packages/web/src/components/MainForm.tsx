import { Button, HStack, Input, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
  useCreateRoomMutation,
  useJoinRoomMutation,
} from '../generated/graphql';

const MainForm = () => {
  const [roomName, setRoomName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [{ fetching: loadingCreateRoom }, createRoom] = useCreateRoomMutation();
  const [{ fetching: loadingJoinRoom }, joinRoom] = useJoinRoomMutation();
  const toast = useToast();

  const handleCreateRoom = async () => {
    if (!roomName) return;

    setRoomName('');
    const { data } = await createRoom({ name: roomName });
    if (data?.newRoom) {
      toast({
        title: `The room ${data.newRoom.name} has been created.`,
        description: `The invitation code is ${data.newRoom.invitationCode}.`,
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Something went wrog.',
        description: `The room has not being created.`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleJoinRoom = async () => {
    if (!invitationCode) return;

    setInvitationCode('');
    const { data } = await joinRoom({ invitationCode });
    if (data?.room) {
      toast({
        title: `You've joined to ${data.room.name}.`,
        description: 'Connect to the room to start sending messages.',
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Invalid invitation code.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <VStack>
      <HStack>
        <Input
          placeholder="Room Name"
          value={roomName}
          onChange={({ target }) => setRoomName(target.value)}
          isDisabled={loadingCreateRoom}
          required
        />
        <Button
          colorScheme="blue"
          width="2xs"
          onClick={handleCreateRoom}
          isDisabled={loadingCreateRoom}
          isLoading={loadingCreateRoom}
        >
          Create Room
        </Button>
      </HStack>

      <HStack>
        <Input
          placeholder="Invitation Code"
          value={invitationCode}
          onChange={({ target }) => setInvitationCode(target.value)}
          isDisabled={loadingJoinRoom}
        />
        <Button
          colorScheme="blue"
          variant="outline"
          width="2xs"
          onClick={handleJoinRoom}
          isDisabled={loadingJoinRoom}
          isLoading={loadingJoinRoom}
        >
          Join Room
        </Button>
      </HStack>
    </VStack>
  );
};

export default MainForm;
