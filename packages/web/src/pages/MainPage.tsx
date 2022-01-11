import {
  Center,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import MainForm from '../components/MainForm';
import MainHeader from '../components/MainHeader';
import RoomItem from '../components/RoomItem';
import { Room, useRoomsQuery } from '../generated/graphql';
import RoomPage from './RoomPage';

const MainPage = () => {
  const [connectedRoom, setConnectedRoom] = useState<Room | null>(null);
  const [{ data, fetching }] = useRoomsQuery({
    requestPolicy: 'network-only',
  });

  if (connectedRoom) {
    return (
      <RoomPage {...connectedRoom} disconnect={() => setConnectedRoom(null)} />
    );
  }

  return (
    <Container maxW="container.md">
      <VStack spacing={12} my={12}>
        <MainHeader />

        <MainForm />

        <Heading>My Rooms</Heading>

        {fetching ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <VStack spacing={8} w="full">
            {data?.rooms.length === 0 ? (
              <Center>
                <Text>You are not part of any room</Text>
              </Center>
            ) : (
              data?.rooms.map(({ id, name }, index) => (
                <RoomItem
                  key={id}
                  id={id}
                  name={name}
                  onConnect={() => setConnectedRoom(data.rooms[index])}
                />
              ))
            )}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default MainPage;
