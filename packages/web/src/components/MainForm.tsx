import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
  useCreateRoomMutation,
  useJoinRoomMutation,
} from '../generated/graphql';

const MainForm = () => {
  const [roomName, setRoomName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [, createRoom] = useCreateRoomMutation();
  const [, joinRoom] = useJoinRoomMutation();

  const handleCreateRoom = async () => {
    createRoom({ name: roomName });
  };

  const handleJoinRoom = async () => {
    joinRoom({ invitationCode });
  };

  return (
    <VStack>
      <HStack>
        <Input
          placeholder="Room Name"
          value={roomName}
          onChange={({ target }) => setRoomName(target.value)}
        />
        <Button colorScheme="blue" width="2xs" onClick={handleCreateRoom}>
          Create Room
        </Button>
      </HStack>

      <HStack>
        <Input
          placeholder="Invitation Code"
          value={invitationCode}
          onChange={({ target }) => setInvitationCode(target.value)}
        />
        <Button
          colorScheme="blue"
          variant="outline"
          width="2xs"
          onClick={handleJoinRoom}
        >
          Join Room
        </Button>
      </HStack>
    </VStack>
  );
};

export default MainForm;
