import {
  ActionIcon,
  Group,
  Header as MantineHeader,
  Image,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Group sx={{ height: "100%" }}>
          <Image src={"./skott.svg"} width={125} fit="contain" radius="md" />
        </Group>

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
    </MantineHeader>
  );
}
