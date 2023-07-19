import {
  ActionIcon,
  Group,
  Header as MantineHeader,
  Image,
  useMantineColorScheme,
  Flex,
  Title,
  ThemeIcon,
  Box,
  Paper,
} from "@mantine/core";
import { IconBrandGithub, IconMoonStars, IconSun } from "@tabler/icons-react";

const metadata = {
  name: "skott",
  version: "0.28.0",
};

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Group sx={{ height: "100%" }}>
          <Image src={"./skott.svg"} width={125} fit="contain" radius="md" />
        </Group>

        <Paper withBorder p={5}>
          <Flex justify="space-between" align="center" direction="row">
            <Title size="sm" color="blue">
              {metadata.name}
            </Title>
            <Title size="sm" color="dimmed">
              @
            </Title>
            <Title size="sm" color="grape">
              {metadata.version}
            </Title>
          </Flex>
        </Paper>

        <Group position="apart">
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            <ThemeIcon color="dark">
              <IconBrandGithub />
            </ThemeIcon>
          </ActionIcon>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? (
              <IconSun size={16} />
            ) : (
              <IconMoonStars size={16} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </MantineHeader>
  );
}
