import { HStack, IconButton, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useSendMessageMutation } from '../generated/graphql';

const MessageForm: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [value, setValue] = useState('');
  const [, sendMessage] = useSendMessageMutation();
  const handleSendMessage = async () => {
    sendMessage({ message: value, roomId });
    setValue('');
  };

  return (
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
  );
};

export default MessageForm;
