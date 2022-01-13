import { Button, Center, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMeQuery, useMessagesQuery } from '../generated/graphql';
import MessageItem from './MessageItem';

interface MessageListProps {
  roomId: string;
  cursor: string | null;
  isLastPage: boolean;
  isFirstPage: boolean;
  onShouldScrollDown: (force: boolean) => void;
  onLoadMore: (cursor: string | null) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  roomId,
  cursor,
  isLastPage,
  isFirstPage,
  onShouldScrollDown,
  onLoadMore,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [{ fetching, data }] = useMessagesQuery({
    variables: { roomId, cursor },
    requestPolicy: 'network-only',
  });

  const canLoadMore =
    isLastPage &&
    !!data?.messages.cursor &&
    data.messages.messages.length === 20;

  useEffect(() => {
    if (isFirstPage && !fetching && data) {
      if (data.messages?.messages[0]?.userId === meData?.me?.id) {
        onShouldScrollDown(true);
      } else {
        onShouldScrollDown(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (fetching) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      {data?.messages.messages.map(({ id, message, userId, createdAt }) => (
        <MessageItem
          key={id}
          message={message}
          userId={userId}
          createdAt={createdAt}
          right={userId === meData?.me?.id}
        />
      ))}

      {canLoadMore && (
        <Button onClick={() => onLoadMore(data?.messages?.cursor || '')}>
          Load More
        </Button>
      )}
    </>
  );
};

export default MessageList;
