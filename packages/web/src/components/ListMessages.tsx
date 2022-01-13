import { Flex, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import MessageList from './MessageList';

interface ListMessagesInterface {
  roomId: string;
}

type PageVariables = Array<{
  roomId: string;
  cursor: null | string;
}>;

const ListMessages: React.FC<ListMessagesInterface> = ({ roomId }) => {
  const scrollbar = useRef<Scrollbars>(null);
  const [pageVariables, setPageVariables] = useState<PageVariables>([
    {
      roomId,
      cursor: null,
    },
  ]);

  return (
    <Flex py={4} flex="1 1 0" minH="0px">
      <Scrollbars ref={scrollbar}>
        <Stack flex="1" spacing={4} px={4} direction="column-reverse">
          {pageVariables.map((variables, index) => (
            <MessageList
              key={'' + variables.cursor}
              roomId={variables.roomId}
              cursor={variables.cursor}
              isLastPage={index === pageVariables.length - 1}
              isFirstPage={index === 0}
              onShouldScrollDown={(force) => {
                if (force) {
                  scrollbar.current?.scrollToBottom();
                } else {
                  const { scrollHeight, clientHeight, scrollTop } =
                    scrollbar.current!.getValues();
                  const margin = scrollHeight - (clientHeight + scrollTop);

                  if (margin < 200) scrollbar.current?.scrollToBottom();
                }
              }}
              onLoadMore={(cursor) =>
                setPageVariables((current) => [...current, { cursor, roomId }])
              }
            />
          ))}
        </Stack>
      </Scrollbars>
    </Flex>
  );
};

export default ListMessages;
