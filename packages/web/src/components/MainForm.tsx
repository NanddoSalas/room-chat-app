import { useApolloClient } from '@apollo/client';
import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
  useCreateRoomMutation,
  useJoinRoomMutation,
} from '../generated/graphql';

const MainForm = () => {
  const [roomName, setRoomName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [createRoom] = useCreateRoomMutation();
  const [joinRoom] = useJoinRoomMutation();
  const client = useApolloClient();

  const handleCreateRoom = async () => {
    const { data } = await createRoom({ variables: { name: roomName } });

    if (data?.newRoom) {
      client.cache.modify({
        fields: {
          rooms(currentRooms = []) {
            return [...currentRooms, data.newRoom];
          },
        },
      });
    }
  };

  const handleJoinRoom = async () => {
    const { data } = await joinRoom({ variables: { invitationCode } });

    if (data?.room) {
      client.cache.modify({
        fields: {
          rooms(currentRooms = []) {
            return [...currentRooms, data.room];
          },
        },
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
