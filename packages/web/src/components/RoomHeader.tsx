import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import ListMembers from './ListMembers';

interface RoomHeaderProps {
  roomName: string;
  roomId: string;
  onDisconnect: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  roomName,
  roomId,
  onDisconnect,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showMembers = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Box bg="gray.900">
        <Container maxW="container.xl" py="16px">
          <Flex justify="space-between">
            {showMembers ? (
              <Center w="xs" mx={4}>
                <Heading size="md">Members</Heading>
              </Center>
            ) : (
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="show members"
                onClick={onOpen}
              />
            )}

            <Heading size="lg">{roomName}</Heading>

            <IconButton
              icon={<MdLogout />}
              aria-label="disconnect from room"
              colorScheme="red"
              rounded="full"
              variant="ghost"
              onClick={onDisconnect}
            />
          </Flex>
        </Container>
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Members</DrawerHeader>

          <DrawerBody>
            <Wrap spacing={4}>
              <ListMembers roomId={roomId} />
            </Wrap>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RoomHeader;
