import { Spinner } from '@chakra-ui/react';
import { useRoomMembersQuery } from '../generated/graphql';
import MemberItem from './MemberItem';

const ListMembers: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [{ data, fetching }] = useRoomMembersQuery({ variables: { roomId } });
  const members = data?.roomMembers;

  if (fetching) return <Spinner />;

  if (!members) return null;

  return (
    <>
      {members.map(({ id, name, avatar }) => (
        <MemberItem key={id} name={name} avatar={avatar} />
      ))}
    </>
  );
};

export default ListMembers;
