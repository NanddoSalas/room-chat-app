import { Avatar, Heading, HStack } from '@chakra-ui/react';

const MemberItem: React.FC<{ name: string; avatar: string }> = ({
  name,
  avatar,
}) => {
  return (
    <HStack>
      <Avatar name={name} src={avatar} />
      <Heading size="md">{name}</Heading>
    </HStack>
  );
};

export default MemberItem;
