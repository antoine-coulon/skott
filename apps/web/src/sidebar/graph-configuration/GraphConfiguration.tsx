import {
  Box,
  Group,
  Navbar,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";

export function GraphConfiguration() {
  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Box p="md">Graph configuration</Box>

        <Group position="center">
          <Text>Graph layout</Text>
          <SegmentedControl
            radius="sm"
            size="sm"
            data={["Hierarchical", "Cluster"]}
          />
        </Group>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
