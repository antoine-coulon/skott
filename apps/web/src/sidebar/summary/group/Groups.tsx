import { useStoreSelect } from "@/store/react-bindings";
import { Badge, Flex, Navbar, Paper, ScrollArea, Text } from "@mantine/core";
import * as Option from "@effect/data/Option";

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
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
