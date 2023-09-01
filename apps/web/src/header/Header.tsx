import {
  Group,
  Header as MantineHeader,
  Image,
  useMantineColorScheme,
  ThemeIcon,
  Text,
  Button,
  Switch,
  useMantineTheme,
  Code,
} from "@mantine/core";
import { IconBrandGithub, IconMoonStars, IconSun } from "@tabler/icons-react";
import { useAppStore } from "../store/store";

export default function Header() {
  const { events$ } = useAppStore();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  function openGlobalSearch() {
    events$.next({ action: "open_search" });
  }

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Group sx={{ height: "100%" }}>
          <Image src={"./skott.svg"} width={125} fit="contain" radius="md" />
        </Group>

        <Group position="apart">
          <Button variant="gradient" radius="lg" onClick={openGlobalSearch}>
            <Group position="apart">
              <Text>Browse files</Text>
              <Code>CMD + K</Code>
            </Group>
          </Button>

          <Button
            variant="subtle"
            color={isDarkMode ? "blue" : "dark"}
            onClick={() => {
              window.open("https://github.com/antoine-coulon/skott", "_blank");
            }}
          >
            <Group position="apart">
              <Text>Source</Text>
              <ThemeIcon radius="lg" color="dark">
                <IconBrandGithub />
              </ThemeIcon>
            </Group>
          </Button>

          <Switch
            checked={isDarkMode}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={
              <IconSun color={theme.white} size="1.25rem" stroke={1.5} />
            }
            offLabel={
              <IconMoonStars
                color={theme.colors.gray[6]}
                size="1.25rem"
                stroke={1.5}
              />
            }
          />
        </Group>
      </Group>
    </MantineHeader>
  );
}
