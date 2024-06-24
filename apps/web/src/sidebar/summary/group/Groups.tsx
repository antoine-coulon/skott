import { useStoreSelect } from "@/store/react-bindings";
import {
  Badge,
  Box,
  Flex,
  List,
  Navbar,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import * as Option from "@effect/data/Option";
import { IconChevronDownLeft, IconHexagons } from "@tabler/icons-react";

export function Groups() {
  const maybeGraph = useStoreSelect("data", "graph");

  if (Option.isNone(maybeGraph)) {
    return null;
  }

  const graph = maybeGraph.value;

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section p="sm">
        <Paper withBorder py={5} my={10}>
          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Text>Groups</Text>
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              {Object.keys(graph).length}
            </Badge>
          </Flex>
        </Paper>

        <Flex p="sm" justify="start" align="center" direction="row">
          <Box p={10}>
            <List
              spacing="xs"
              size="sm"
              icon={
                <IconHexagons
                  size={15}
                  style={{
                    marginTop: "0.2rem",
                  }}
                />
              }
            >
              {Object.values(graph).map(({ id, adjacentTo }) => {
                return (
                  <List.Item key={id} mb="md">
                    <Text weight="bold">{id}</Text>

                    {adjacentTo.map((adjacentId) => {
                      return (
                        <Flex>
                          <IconChevronDownLeft color="orange" />
                          <Text
                            style={{
                              marginTop: "0.2rem",
                            }}
                          >
                            {adjacentId}
                          </Text>
                        </Flex>
                      );
                    })}
                  </List.Item>
                );
              })}
            </List>
          </Box>
        </Flex>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
