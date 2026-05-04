import {
  Anchor,
  Button,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import Logo from "../../components/Logo";
import Meta from "../../components/Meta";

const Intro = () => {
  return (
    <>
      <Meta title="Intro" />
      <Container size="xs">
        <Stack>
          <Center>
            <Logo height={80} width={80} />
          </Center>
          <Center>
            <Title order={2}>Welcome to nebulos.net Share</Title>
          </Center>
          <Text>
            This is a fork of{" "}
            <Anchor
              target="_blank"
              href="https://github.com/stonith404/pingvin-share"
              rel="noopener noreferrer"
            >
              pingvin-share
            </Anchor>
            , maintained at{" "}
            <Anchor
              target="_blank"
              href="https://github.com/nebulos/share"
              rel="noopener noreferrer"
            >
              nebulos/share
            </Anchor>
            . The upstream project is community-developed; if you find it
            useful, consider starring it.
          </Text>
          <Text mt="lg">How would you like to continue?</Text>
          <Stack>
            <Button href="/admin/config/general" component={Link}>
              Customize configuration
            </Button>
            <Button href="/" component={Link} variant="light">
              Explore the app
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Intro;
