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
  Box,
  MediaQuery,
} from "@mantine/core";
import { IconBrandGithub, IconMoonStars, IconSun } from "@tabler/icons-react";
import GitHubButton from "react-github-btn";
import { useAppStore } from "@/store/react-bindings";

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
        <Group sx={{ height: "100%", marginTop: "5px" }}>
          <Image
            src={"./skott-logo-circle.png"}
            ml={-12}
            width={50}
            style={{ marginBottom: "8px" }}
            fit="contain"
            radius="md"
          />
        </Group>

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Group position="apart">
            <Button
              variant="gradient"
              ml={25}
              radius="lg"
              onClick={openGlobalSearch}
            >
              <Group position="apart">
                <Text>Browse elements</Text>
                <Code>CMD + K</Code>
              </Group>
            </Button>

            <Button
              variant="subtle"
              color={isDarkMode ? "blue" : "dark"}
              onClick={() => {
                window.open(
                  "https://github.com/antoine-coulon/skott/issues",
                  "_blank"
                );
              }}
            >
              <Group position="apart">
                <Text>Report issues</Text>
                <ThemeIcon radius="lg" color="dark">
                  <IconBrandGithub />
                </ThemeIcon>
              </Group>
            </Button>

            <Box mt={5} mr={10}>
              <GitHubButton
                href="https://github.com/antoine-coulon/skott"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star antoine-coulon/skott on GitHub"
              >
                Star
              </GitHubButton>
            </Box>

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
        </MediaQuery>
      </Group>
    </MantineHeader>
  );
}
