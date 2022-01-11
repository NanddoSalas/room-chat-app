import { Icon } from '@chakra-ui/icons';
import { Button, Heading, VStack } from '@chakra-ui/react';
import { useGoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { MdChat } from 'react-icons/md';
import { useGoogleAuthMutation } from '../generated/graphql';

const StartPage = () => {
  const [, googleAuth] = useGoogleAuthMutation();
  const { signIn, loaded } = useGoogleLogin({
    responseType: 'id_token',
    clientId:
      '1015273775735-3p5t6586cm93ck8lm4eue2m6e59c8lfd.apps.googleusercontent.com',
    onSuccess: async (res) => {
      const tokenId: string | null = (res as any).tokenId;

      if (tokenId) {
        googleAuth({ idToken: tokenId });
      }
    },
  });

  return (
    <VStack spacing={12} my={12}>
      <Icon as={MdChat} boxSize={{ base: 48, md: 64 }} />

      <Heading>Room Chat App</Heading>

      <Button
        w="sm"
        variant="outline"
        size="lg"
        leftIcon={<FcGoogle />}
        onClick={signIn}
        isDisabled={!loaded}
      >
        Continue with Google
      </Button>
    </VStack>
  );
};

export default StartPage;
