import {
  Box,
  List,
  Group,
  ThemeIcon,
  Text,
  Badge,
  Image,
  Paper,
} from "@mantine/core";
import { IconBrandNodejs, IconExclamationMark } from "@tabler/icons-react";

import { formatOccurrences } from "./formatters";

/**
 * TODO: Dependencies should be sorted from the most used to the least used.
 */
export function Dependencies({
  registries,
}: {
  registries: {
    npm: Map<string, number>;
    builtin: Map<string, number>;
  };
}) {
  return (
    <>
      <Paper withBorder py={5} my={10}>
        <Group position="apart" px={10}>
          <Image src={"./npm.svg"} width={40} fit="contain" />
          <Badge size="lg">{registries.npm.size}</Badge>
        </Group>

        <Box p={10}>
          <List spacing="xs" size="sm" center>
            {[...registries.npm].map(([dep, occurrences]) => {
              if (occurrences === 0) {
                return (
                  <List.Item
                    key={dep}
                    icon={
                      <ThemeIcon color="orange" size={25} radius="xl">
                        <IconExclamationMark size="1rem" />
                      </ThemeIcon>
                    }
                  >
                    {dep}
                  </List.Item>
                );
              }

              return (
                <List.Item
                  key={dep}
                  icon={
                    <ThemeIcon color="indigo" size={25} p={5} radius="xl">
                      <Text>{formatOccurrences(occurrences)}</Text>
                    </ThemeIcon>
                  }
                >
                  {dep}
                </List.Item>
              );
            })}
          </List>
        </Box>
      </Paper>

      <Paper withBorder py={5} my={10}>
        <Group position="apart" px={10}>
          <IconBrandNodejs size={25} color="green" />
          <Badge size="lg">{registries.builtin.size}</Badge>
        </Group>

        <Box p={10}>
          <List spacing="xs" size="sm" center>
            {[...registries.builtin].map(([dep, occurrences]) => {
              return (
                <List.Item
                  key={dep}
                  icon={
                    <ThemeIcon color="indigo" size={25} p={5} radius="xl">
                      <Text>{formatOccurrences(occurrences)}</Text>
                    </ThemeIcon>
                  }
                >
                  {dep}
                </List.Item>
              );
            })}
          </List>
        </Box>
      </Paper>
    </>
  );
}
