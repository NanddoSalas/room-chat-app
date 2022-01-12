import {
  Container,
  Flex,
  HStack,
  IconButton,
  Textarea,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { MdSend } from 'react-icons/md';
import ListMembers from '../components/ListMembers';
import MessageItem from '../components/MessageItem';
import RoomHeader from '../components/RoomHeader';
import {
  Room,
  useMeQuery,
  useMessagesQuery,
  useNewMessageSubscription,
  useSendMessageMutation,
  useUserJoinedRoomSubscription,
  useUserLeavedRoomSubscription,
} from '../generated/graphql';

interface RoomPageProps extends Room {
  disconnect: () => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ id, name, disconnect }) => {
  const [{ data }] = useMessagesQuery({ variables: { roomId: id } });
  const [{ data: meData }] = useMeQuery();
  const [, sendMessage] = useSendMessageMutation();
  const showMembers = useBreakpointValue({ base: false, lg: true });
  const scrollbars = useRef<Scrollbars>(null);
  const [value, setValue] = useState('');
  useUserJoinedRoomSubscription({ variables: { roomId: id } });
  useUserLeavedRoomSubscription({ variables: { roomId: id } });
  useNewMessageSubscription({ variables: { roomId: id } });

  const handleSendMessage = async () => {
    await sendMessage({ message: value, roomId: id });
  };

  useEffect(() => {
    scrollbars.current?.scrollToBottom();
  }, []);

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
            <Flex py={4} flex="1 1 0" minH="0px">
              <Scrollbars autoHide ref={scrollbars}>
                <Wrap flex="1" spacing={4} px={4}>
                  {/* TODO: fix messages layout */}
                  {data?.messages.messages.map(
                    ({ id, message, userId, createdAt }) => (
                      <MessageItem
                        key={id}
                        message={message}
                        userId={userId}
                        createdAt={createdAt}
                        right={userId === meData?.me?.id}
                      />
                    ),
                  )}
                </Wrap>
              </Scrollbars>
            </Flex>

            <HStack py="16px">
              <Textarea
                variant="filled"
                resize="none"
                placeholder="Type your Message"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setValue(inputValue);
                }}
                value={value}
              />

              <IconButton
                icon={<MdSend />}
                aria-label="send message"
                colorScheme="blue"
                rounded="full"
                onClick={handleSendMessage}
              />
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default RoomPage;
